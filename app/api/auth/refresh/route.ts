import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// TODO - integrate reauthorization flow
export async function GET() {
    try {
        // read refresh_token from cookies
        const cookieStore = await cookies()
        const refreshToken = cookieStore.get("spotify_refresh_token")?.value
        if (!refreshToken) {
            return NextResponse.json(
                { error: "No refresh token in cookies. Re-auth required." },
                { status: 401 }
            )
        }

        // build request to the Spotify /api/token endpoint
        const tokenUrl = "https://accounts.spotify.com/api/token"
        const bodyParams = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        })

        const clientId = process.env.SPOTIFY_CLIENT_ID ?? ""
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? ""
        const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
            "base64"
        )

        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${authHeader}`,
            },
            body: bodyParams.toString(),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(errorData, { status: response.status })
        }

        // parse new tokens & update cookies
        const tokenData = await response.json()
        const accessToken = tokenData.access_token
        const newRefreshToken = tokenData.refresh_token
        const cookieResponse = NextResponse.json({ success: true, accessToken })

        cookieResponse.cookies.set("spotify_access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: tokenData.expires_in,
            sameSite: "lax",
        })
        if (newRefreshToken) {
            cookieResponse.cookies.set(
                "spotify_refresh_token",
                newRefreshToken,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    maxAge: tokenData.expires_in,
                    sameSite: "lax",
                }
            )
        }

        return cookieResponse
    } catch (error) {
        console.error("Error refreshing Spotify token:", error)
        return NextResponse.json(
            { error: "Refresh token flow failed." },
            { status: 500 }
        )
    }
}

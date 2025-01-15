import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
        return NextResponse.json(
            { error: "Missing 'code' parameter." },
            { status: 400 }
        )
    }

    // build request to exchange code for an access token
    const tokenUrl = "https://accounts.spotify.com/api/token"
    const bodyParams = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? "",
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

    // if response status is not OK, parse the error body and return
    if (!response.ok) {
        const errorData = await response.json()
        return NextResponse.json(errorData, { status: response.status })
    }

    // otherwise, parse response & store tokens in cookies
    const tokenData = await response.json()
    const nextCookies = await cookies()
    nextCookies.set("spotify_access_token", tokenData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: tokenData.expires_in,
    })
    if (tokenData.refresh_token) {
        nextCookies.set("spotify_refresh_token", tokenData.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: tokenData.expires_in,
        })
    }

    // redirect user to home on success
    return NextResponse.redirect(new URL("/", request.url))
}

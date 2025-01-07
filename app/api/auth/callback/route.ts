import { NextResponse } from "next/server"

// interface ITokenData {
//     access_token: string
//     token_type: string
//     expires_in: number
// }

// interface IErrorData {
//     error: string
//     status: number
// }

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

    try {
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

        const tokenData = await response.json()

        // TODO: update below to Store tokens in cookies or session for user to use the Spotify API
        return NextResponse.json({ tokenData })
    } catch (error) {
        console.error("Error exchanging code for token:", error)
        return NextResponse.json(
            { error: "Token exchange failed" },
            { status: 500 }
        )
    }
}

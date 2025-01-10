import { NextResponse } from "next/server"

export async function GET() {
    // list of available scopes: http://developer.spotify.com/documentation/web-api/concepts/scopes
    const scopes = [
        "user-read-email",
        "user-read-private",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-follow-read",
        "user-read-recently-played",
        "playlist-read-private",
    ]

    // Spotify auth URL
    const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
        scope: scopes.join(" "),
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? "",
    })

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`

    // redirect user to Spotify's auth page
    return NextResponse.redirect(spotifyAuthUrl)
}

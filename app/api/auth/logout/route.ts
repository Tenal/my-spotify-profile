import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
    const nextCookies = await cookies()

    // clear access and refresh tokens
    nextCookies.set("spotify_access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
    })

    nextCookies.set("spotify_refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
    })

    // redirect user to the homepage after logging out
    return NextResponse.redirect(new URL("/", request.url))
}

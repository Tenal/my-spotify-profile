import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
    const nextCookies = await cookies()
    nextCookies.delete("spotify_access_token")
    nextCookies.delete("spotify_refresh_token")

    return new NextResponse(null, {
        status: 303,
        headers: {
            Location: "/",
            "Cache-Control": "no-store, max-age=0",
            "Clear-Site-Data": '"cookies"',
        },
    })
}

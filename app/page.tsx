import { cookies } from "next/headers"
import { spotifyFetch } from "@/lib/spotify"
import { LoginPage } from "@/components/LoginPage"
import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileCards } from "./components/ProfileCards"
import { ProfileTracks } from "./components/ProfileTracks"

export default async function Home() {
    const cookieStore = await cookies() // note: dynamic APIs are async in Next.js v15+
    const accessToken = cookieStore.get("spotify_access_token")?.value

    // TODO - add reauth flow
    if (!accessToken) {
        return <LoginPage />
    }

    const user = await spotifyFetch(`me`, accessToken)
    const userFollowing = await spotifyFetch(
        `me/following?type=artist`,
        accessToken
    )
    const artists = await spotifyFetch(
        `me/top/artists?time_range=long_term&limit=10`,
        accessToken
    )
    const playlists = await spotifyFetch(`me/playlists?limit=10`, accessToken)
    const tracks = await spotifyFetch(
        `me/top/tracks?time_range=long_term&limit=4`,
        accessToken
    )

    return (
        <div className="view-spacing gradient-bg">
            <div className="pb-4">
                <ProfileHeader
                    user={user}
                    following={userFollowing.artists.total}
                    playlists={playlists.total}
                />
                <ProfileCards
                    title="Top artists of all time"
                    link="/artists"
                    data={artists.items}
                />
                <ProfileTracks
                    title="Top tracks of all time"
                    link="/tracks"
                    data={tracks.items}
                />
                <ProfileCards
                    title="Public playlists"
                    link="/playlists"
                    data={playlists.items}
                />
            </div>
        </div>
    )
}

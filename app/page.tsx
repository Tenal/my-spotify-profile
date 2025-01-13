import { cookies } from "next/headers"
import { spotifyFetch } from "@/lib/spotify"

import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileCards } from "./components/ProfileCards"
import { ProfileTracks } from "./components/ProfileTracks"
import { ErrorMessage } from "./components/ErrorMessage"

export default async function Home() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    // TODO - add reauth flow /or/ full error page
    if (!accessToken) {
        return (
            <div className="p-8">
                <ErrorMessage message="No access token found. Please log in." />
            </div>
        )
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
    )
}

import { cookies } from "next/headers"
import { Suspense, use } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader } from "@/components/Loader"
import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileCards } from "./components/ProfileCards"
import { ProfileTracks } from "./components/ProfileTracks"
import { getHomeProfileData } from "@/lib/spotify"
import { IArtist, IPlaylist, ITrack, IUser } from "./lib/typescript"

export default async function HomePage() {
    const cookieStore = await cookies() // note: dynamic APIs are async in Next.js v15+
    const accessToken = cookieStore.get("spotify_access_token")?.value
    const dataPromise = getHomeProfileData(accessToken!)

    return (
        <div className="view-spacing gradient-bg">
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <HomeSection dataPromise={dataPromise} />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

const HomeSection = ({
    dataPromise,
}: {
    dataPromise: Promise<{
        user: IUser
        userFollowing: { artists: { total: number } }
        artists: { items: IArtist[]; total: number }
        playlists: { items: IPlaylist[]; total: number }
        tracks: { items: ITrack[] }
    }>
}) => {
    const { user, userFollowing, artists, playlists, tracks } = use(dataPromise)

    return (
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
    )
}

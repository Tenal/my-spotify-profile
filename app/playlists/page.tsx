import { Suspense, use } from "react"
import { IPlaylist } from "@/lib/typescript"
import {
    getSpotifyAuthToken,
    getTopPlaylists,
    getPlaylist,
} from "@/lib/spotify"
import { Loader } from "@/components/Loader"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { MediaCard } from "@/components/MediaCard"
import { PlaylistInfo } from "@/components/PlaylistInfo"

export default async function PlaylistsPage({
    searchParams,
}: {
    searchParams: { playlist?: string }
}) {
    const accessToken = await getSpotifyAuthToken()
    if (!accessToken) return null

    const sp = await searchParams // note: dynamic APIs are async in Next.js v15+
    const playlistId = sp.playlist

    if (playlistId) {
        const playlistPromise = getPlaylist(playlistId, accessToken!)

        return (
            <div>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <PlaylistInfoSection dataPromise={playlistPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        )
    }

    const dataPromise = getTopPlaylists(accessToken!)

    return (
        <div className="view-spacing">
            <div className="px-1 py-2 sm:p-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                    <h1 className="mb-4 sm:mb-2">Public Playlists</h1>
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <PlaylistsSection dataPromise={dataPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    )
}

const PlaylistInfoSection = ({
    dataPromise,
}: {
    dataPromise: Promise<IPlaylist>
}) => {
    const playlist = use(dataPromise)

    return <PlaylistInfo playlist={playlist} />
}

const PlaylistsSection = ({
    dataPromise,
}: {
    dataPromise: Promise<{ items: IPlaylist[] }>
}) => {
    const data = use(dataPromise)
    const items: IPlaylist[] = data?.items || []

    return (
        <div className="fluid-grid mt-4">
            {items.map((playlist: IPlaylist) => (
                <MediaCard
                    key={playlist.id}
                    name={playlist.name}
                    mediaType={`by ${playlist.owner.display_name}`}
                    link={playlist.id}
                    spotifyLink={playlist.uri}
                    imageSrc={playlist.images?.[0]?.url}
                    squareAvatar
                />
            ))}
        </div>
    )
}

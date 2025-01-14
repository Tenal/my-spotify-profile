import { cookies } from "next/headers"
import { Suspense, use } from "react"
import { IPlaylist } from "@/lib/typescript"
import { getTopPlaylists } from "@/lib/spotify"
import { Loader } from "@/components/Loader"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { MediaCard } from "@/components/MediaCard"

export default async function PlaylistsPage() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value
    const dataPromise = getTopPlaylists(accessToken!)

    return (
        <div className="view-spacing">
            <div className="p-4">
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
                    link="/"
                    spotifyLink={playlist.uri}
                    imageSrc={playlist.images?.[0]?.url}
                    squareAvatar
                />
            ))}
        </div>
    )
}

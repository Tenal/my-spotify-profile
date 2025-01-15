import { Suspense, use } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader } from "@/components/Loader"
import { SongRow } from "@/components/SongRow"
import { SongRowHeader } from "@/components/SongRowHeader"
import { IRecentTrack } from "@/lib/typescript"
import { getSpotifyAuthToken, getRecentTracks } from "@/lib/spotify"

export default async function RecentTracksPage() {
    const accessToken = await getSpotifyAuthToken()
    if (!accessToken) return null

    const dataPromise = getRecentTracks(accessToken!)

    return (
        <div className="view-spacing">
            <div className="px-1 py-2 sm:p-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                    <h1 className="mb-4 sm:mb-2 text-center">
                        Recently Played Tracks
                    </h1>
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <RecentTracksSection dataPromise={dataPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    )
}

function RecentTracksSection({
    dataPromise,
}: {
    dataPromise: Promise<{ items: IRecentTrack[] }>
}) {
    const data = use(dataPromise)
    const { items } = data

    // remove duplicates (spotify's recently-played endpoint returns duplicate tracks)
    const uniqueTracks = [
        ...new Map(
            items.map((item: IRecentTrack) => [item.track.id, item])
        ).values(),
    ] as IRecentTrack[]

    return (
        <>
            <SongRowHeader />
            <div className="mt-4 w-full">
                {uniqueTracks.map((item: IRecentTrack, index: number) => {
                    const { track } = item
                    const { name, artists, album, duration_ms, explicit, uri } =
                        track

                    return (
                        <SongRow
                            key={track.id}
                            name={name}
                            artist={artists[0]?.name || "Unknown Artist"}
                            album={album?.name || "Unknown Album"}
                            songLength={duration_ms}
                            explicit={explicit}
                            artistLink={track.artists[0].id}
                            songLink={track.id}
                            spotifyLink={uri}
                            imageSrc={album?.images?.[0]?.url}
                            index={index}
                        />
                    )
                })}
            </div>
        </>
    )
}

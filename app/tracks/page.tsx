import { Suspense, use } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader } from "@/components/Loader"
import { TimeRangeSelect } from "@/components/TimeRangeSelect"
import { getSpotifyAuthToken, getTopTracks, getTrack } from "@/lib/spotify"
import { SongRow } from "@/components/SongRow"
import { SongRowHeader } from "@/components/SongRowHeader"
import { ITrack } from "@/lib/typescript"
import { TrackInfo } from "@/components/TrackInfo"

export default async function TopTracksPage({
    searchParams,
}: {
    searchParams: Promise<{ range?: string; track?: string }>
}) {
    const accessToken = await getSpotifyAuthToken()
    if (!accessToken) return null

    const sp = await searchParams // note: dynamic APIs are async in Next.js v15+
    const userRange = sp.range || "all-time"
    const trackId = sp.track

    if (trackId) {
        const tracksPromise = getTrack(trackId, accessToken!)

        return (
            <div>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <TrackInfoSection dataPromise={tracksPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        )
    }

    const dataPromise = getTopTracks(userRange, accessToken!)

    return (
        <div className="view-spacing">
            <div className="px-1 py-2 sm:p-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                    <h1 className="mb-4 sm:mb-2">Top Tracks</h1>
                    <TimeRangeSelect currentRange={userRange} />
                </div>

                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <TopTracksSection dataPromise={dataPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    )
}

const TrackInfoSection = ({
    dataPromise,
}: {
    dataPromise: Promise<ITrack>
}) => {
    const track = use(dataPromise)

    return <TrackInfo track={track} />
}

const TopTracksSection = ({
    dataPromise,
}: {
    dataPromise: Promise<{ items: ITrack[] }>
}) => {
    const data = use(dataPromise)
    const { items } = data

    return (
        <>
            <SongRowHeader />
            <div className="mt-4 w-full">
                {items.map((track: ITrack, index: number) => {
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
                            artistLink={artists[0]?.id}
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

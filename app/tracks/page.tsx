import { cookies } from "next/headers"
import { Suspense, use } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader } from "@/components/Loader"
import { TimeRangeSelect } from "@/components/TimeRangeSelect"
import { getTopTracks } from "@/lib/spotify"
import { SongRow } from "@/components/SongRow"
import { SongRowHeader } from "@/components/SongRowHeader"
import { ITrack } from "@/lib/typescript"

export default async function TopTracksPage({
    searchParams,
}: {
    searchParams: { range?: string }
}) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value
    const userRange = searchParams.range || "all-time"
    const dataPromise = getTopTracks(userRange, accessToken!)

    return (
        <div className="view-spacing">
            <div className="p-4">
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

function TopTracksSection({
    dataPromise,
}: {
    dataPromise: Promise<{ items: ITrack[] }>
}) {
    const data = use(dataPromise)
    const { items } = data

    return (
        <>
            <SongRowHeader />
            <div className="mt-4 w-full">
                {items.map((track: ITrack, index: number) => {
                    const { name, artists, album, duration_ms, explicit, uri } =
                        track
                    const artistName = artists[0]?.name || "Unknown Artist"
                    const albumName = album?.name || "Unknown Album"

                    return (
                        <SongRow
                            key={track.id}
                            name={name}
                            artist={artistName}
                            album={albumName}
                            songLength={duration_ms}
                            explicit={explicit}
                            artistLink="/"
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

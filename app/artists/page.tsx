import { cookies } from "next/headers"
import { Suspense, use } from "react"
import { IArtist } from "@/lib/typescript"
import { getTopArtists } from "@/lib/spotify"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader } from "@/components/Loader"
import { MediaCard } from "@/components/MediaCard"
import { TimeRangeSelect } from "@/components/TimeRangeSelect"

export default async function ArtistsPage({
    searchParams,
}: {
    searchParams: { range?: string }
}) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value
    const userRange = searchParams.range || "all-time"
    const dataPromise = getTopArtists(userRange, accessToken!)

    return (
        <div className="view-spacing">
            <div className="p-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                    <h1 className="mb-4 sm:mb-2">Top Artists</h1>
                    <TimeRangeSelect currentRange={userRange} />
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <ArtistsSection dataPromise={dataPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    )
}

const ArtistsSection = ({
    dataPromise,
}: {
    dataPromise: Promise<{ items: IArtist[] }>
}) => {
    const data = use(dataPromise)
    const items: IArtist[] = data?.items || []

    return (
        <div className="fluid-grid mt-4">
            {items.map((artist: IArtist) => (
                <MediaCard
                    key={artist.id}
                    name={artist.name}
                    mediaType={artist.type}
                    link="/"
                    spotifyLink={artist.uri}
                    imageSrc={artist.images?.[0]?.url}
                />
            ))}
        </div>
    )
}

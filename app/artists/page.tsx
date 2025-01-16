import { Suspense, use } from "react"
import { IArtist } from "@/lib/typescript"
import { getSpotifyAuthToken, getTopArtists, getArtist } from "@/lib/spotify"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader } from "@/components/Loader"
import { MediaCard } from "@/components/MediaCard"
import { TimeRangeSelect } from "@/components/TimeRangeSelect"
import { ArtistInfo } from "@/components/ArtistInfo"

export default async function ArtistsPage({
    searchParams,
}: {
    searchParams: Promise<{ range?: string; artist?: string }>
}) {
    const accessToken = await getSpotifyAuthToken()
    if (!accessToken) return null

    const sp = await searchParams // note: dynamic APIs are async in Next.js v15+
    const userRange = sp.range || "all-time"
    const artistId = sp.artist

    if (artistId) {
        const artistPromise = getArtist(artistId, accessToken!)

        return (
            <div>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <ArtistInfoSection dataPromise={artistPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        )
    }

    const dataPromise = getTopArtists(userRange, accessToken!)

    return (
        <div className="view-spacing">
            <div className="px-1 py-2 sm:p-4">
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

const ArtistInfoSection = ({
    dataPromise,
}: {
    dataPromise: Promise<IArtist>
}) => {
    const artist = use(dataPromise)

    return <ArtistInfo artist={artist} />
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
                    link={artist.id}
                    spotifyLink={artist.uri}
                    imageSrc={artist.images?.[0]?.url}
                />
            ))}
        </div>
    )
}

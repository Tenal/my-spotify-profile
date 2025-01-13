import { cookies } from "next/headers"
import { spotifyFetch } from "@/lib/spotify"
import { getSpotifyTimeRange } from "@/lib/generalFunctions"
import { IArtist } from "@/lib/typescript"
import { LoginPage } from "@/components/LoginPage"
import { TimeRangeSelect } from "@/components/TimeRangeSelect"
import { MediaCard } from "@/components/MediaCard"

export default async function TopArtistsPage({
    searchParams,
}: {
    searchParams: { range?: string }
}) {
    const { range } = await searchParams
    const userRange = range || "all-time"
    const spotifyRange = getSpotifyTimeRange(userRange)

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    // TODO - add reauth flow
    if (!accessToken) {
        return <LoginPage />
    }

    const artists = await spotifyFetch(
        `me/top/artists?time_range=${spotifyRange}&limit=50`,
        accessToken
    )

    return (
        <div className="view-spacing">
            <div className="p-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                    <h1 className="mb-4 sm:mb-2">Top Artists</h1>
                    <TimeRangeSelect currentRange={userRange} />
                </div>

                <div className="fluid-grid mt-4">
                    {artists.items?.length ? (
                        artists.items.map((artist: IArtist) => (
                            <MediaCard
                                key={artist.id}
                                name={artist.name}
                                mediaType={artist.type}
                                link="/"
                                spotifyLink={artist.uri}
                                imageSrc={artist.images?.[0]?.url}
                            />
                        ))
                    ) : (
                        <p>No artists found for specified time range.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

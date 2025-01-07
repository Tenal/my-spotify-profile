import { cookies } from "next/headers"
import { spotifyFetch } from "@/lib/spotify"
import { TimeRangeLinks } from "@/components/TimeRangeLinks"
import { MediaCard } from "@/components/MediaCard"

function getSpotifyTimeRange(
    range: string
): "long_term" | "medium_term" | "short_term" {
    switch (range) {
        case "all-time":
            return "long_term"
        case "4-weeks":
            return "short_term"
        case "6-months":
        default:
            return "long_term"
    }
}

interface IArtist {
    id: string
    name: string
    images: { url: string }[]
    type: "artist"
    [key: string]: unknown
}

export default async function TopArtistsPage({
    searchParams,
}: {
    searchParams: { range?: string }
}) {
    const userRange = searchParams.range || "all-time"
    const spotifyRange = getSpotifyTimeRange(userRange)

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    // TODO - add reauth flow /or/ full error page
    if (!accessToken) {
        return (
            <div className="p-8">
                <p>No access token found. Please log in.</p>
            </div>
        )
    }

    const artists = await spotifyFetch(
        `me/top/artists?time_range=${spotifyRange}&limit=50`,
        accessToken
    )

    return (
        <div className="p-4">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                <h2 className="mb-4 sm:mb-0">Top Artists</h2>
                <TimeRangeLinks currentRange={userRange} />
            </div>

            <div className="fluid-grid mt-4">
                {artists.items?.length ? (
                    artists.items.map((artist: IArtist) => (
                        <MediaCard
                            key={artist.id}
                            name={artist.name}
                            mediaType={artist.type}
                            link="/"
                            spotifyLink="/"
                            imageSrc={artist.images?.[0]?.url}
                        />
                    ))
                ) : (
                    <p>No artists found for specified time range.</p>
                )}
            </div>
        </div>
    )
}

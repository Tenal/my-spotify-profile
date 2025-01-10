import { cookies } from "next/headers"
import { spotifyFetch } from "@/lib/spotify"
import { getSpotifyTimeRange } from "@/lib/generalFunctions"
import { ITrack } from "@/lib/typescript"
import { TimeRangeLinks } from "@/components/TimeRangeLinks"
import { SongRow } from "@/components/SongRow"
import { SongRowHeader } from "@/components/SongRowHeader"

export default async function TopTracksPage({
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

    const tracks = await spotifyFetch(
        `me/top/tracks?time_range=${spotifyRange}&limit=50`,
        accessToken
    )

    return (
        <div className="p-4">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                <h2 className="mb-4 sm:mb-0">Top Tracks</h2>
                <TimeRangeLinks currentRange={userRange} currentPage="tracks" />
            </div>

            <SongRowHeader />
            <div className="mt-4 w-full">
                {tracks.items?.length ? (
                    tracks.items.map((track: ITrack, index: number) => (
                        <SongRow
                            key={track.id}
                            name={track.name}
                            artist={track.artists[0].name}
                            album={track.album.name}
                            songLength={track.duration_ms}
                            explicit={track.explicit}
                            artistLink="/"
                            spotifyLink={track.uri ?? "/"}
                            imageSrc={track.album.images?.[0]?.url}
                            index={index}
                        />
                    ))
                ) : (
                    <p>No tracks found for specified time range.</p>
                )}
            </div>
        </div>
    )
}

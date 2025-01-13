import { cookies } from "next/headers"
import { spotifyFetch } from "@/lib/spotify"
import { IRecentTrack } from "@/lib/typescript"
import { SongRow } from "@/components/SongRow"
import { SongRowHeader } from "@/components/SongRowHeader"

export default async function RecentTracksPage() {
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
        `me/player/recently-played?limit=50`,
        accessToken
    )

    const uniqueTracks = [
        ...new Map(
            tracks.items.map((item: IRecentTrack) => [item.track.id, item])
        ).values(),
    ] as IRecentTrack[] // spotify's recently-played endpoint returns duplicate tracks

    return (
        <div className="view-spacing">
            <div className="p-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                    <h1 className="mb-4 sm:mb-2 text-center">
                        Recently Played Tracks
                    </h1>
                </div>

                <SongRowHeader />
                <div className="mt-4 w-full">
                    {uniqueTracks.length ? (
                        uniqueTracks.map(
                            (item: IRecentTrack, index: number) => {
                                const { track } = item
                                const {
                                    name,
                                    artists,
                                    album,
                                    duration_ms,
                                    explicit,
                                    uri,
                                } = track

                                const artistName =
                                    artists[0]?.name || "Unknown Artist"
                                const albumName = album?.name || "Unknown Album"
                                const albumImage = album?.images?.[0]?.url || ""
                                const spotifyLink = uri || "/"

                                return (
                                    <SongRow
                                        key={track.id}
                                        name={name}
                                        artist={artistName}
                                        album={albumName}
                                        songLength={duration_ms}
                                        explicit={explicit}
                                        artistLink="/"
                                        spotifyLink={spotifyLink}
                                        imageSrc={albumImage}
                                        index={index}
                                    />
                                )
                            }
                        )
                    ) : (
                        <p>No recently played tracks found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

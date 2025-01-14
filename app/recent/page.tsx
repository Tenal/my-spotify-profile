import { cookies } from "next/headers"
import { Suspense, use } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader } from "@/components/Loader"
import { SongRow } from "@/components/SongRow"
import { SongRowHeader } from "@/components/SongRowHeader"
import { IRecentTrack } from "@/lib/typescript"
import { getRecentTracks } from "@/lib/spotify"

export default async function RecentTracksPage() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value
    const dataPromise = getRecentTracks(accessToken!)

    return (
        <div className="view-spacing">
            <div className="p-4">
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

// import { cookies } from "next/headers"
// import { spotifyFetch } from "@/lib/spotify"
// import { IRecentTrack } from "@/lib/typescript"
// import { SongRow } from "@/components/SongRow"
// import { SongRowHeader } from "@/components/SongRowHeader"

// export default async function RecentTracksPage() {
//     const cookieStore = await cookies()
//     const accessToken = cookieStore.get("spotify_access_token")?.value

//     const tracks = await spotifyFetch(
//         `me/player/recently-played?limit=50`,
//         accessToken!
//     )

//     const uniqueTracks = [
//         ...new Map(
//             tracks.items.map((item: IRecentTrack) => [item.track.id, item])
//         ).values(),
//     ] as IRecentTrack[] // spotify's recently-played endpoint returns duplicate tracks

//     return (
//         <div className="view-spacing">
//             <div className="p-4">
//                 <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
//                     <h1 className="mb-4 sm:mb-2 text-center">
//                         Recently Played Tracks
//                     </h1>
//                 </div>

//                 <SongRowHeader />
//                 <div className="mt-4 w-full">
//                     {uniqueTracks.length ? (
//                         uniqueTracks.map(
//                             (item: IRecentTrack, index: number) => {
//                                 const { track } = item
//                                 const {
//                                     name,
//                                     artists,
//                                     album,
//                                     duration_ms,
//                                     explicit,
//                                     uri,
//                                 } = track

//                                 const artistName =
//                                     artists[0]?.name || "Unknown Artist"
//                                 const albumName = album?.name || "Unknown Album"
//                                 const albumImage = album?.images?.[0]?.url || ""
//                                 const spotifyLink = uri || "/"

//                                 return (
//                                     <SongRow
//                                         key={track.id}
//                                         name={name}
//                                         artist={artistName}
//                                         album={albumName}
//                                         songLength={duration_ms}
//                                         explicit={explicit}
//                                         artistLink="/"
//                                         spotifyLink={spotifyLink}
//                                         imageSrc={albumImage}
//                                         index={index}
//                                     />
//                                 )
//                             }
//                         )
//                     ) : (
//                         <p>No recently played tracks found.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

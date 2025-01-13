import { cookies } from "next/headers"
import { spotifyFetch } from "@/lib/spotify"
import { IPlaylist } from "@/lib/typescript"
import { LoginPage } from "@/components/LoginPage"
import { MediaCard } from "@/components/MediaCard"

export default async function PlaylistsPage() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    // TODO - add reauth flow
    if (!accessToken) {
        return <LoginPage />
    }

    const playlists = await spotifyFetch(`me/playlists?limit=50`, accessToken)

    return (
        <div className="view-spacing">
            <div className="p-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                    <h1 className="mb-4 sm:mb-2">Public Playlists</h1>
                </div>

                <div className="fluid-grid mt-4">
                    {playlists.items?.length ? (
                        playlists.items.map((playlist: IPlaylist) => (
                            <MediaCard
                                key={playlist.id}
                                name={playlist.name}
                                mediaType={`by ${playlist.owner.display_name}`}
                                link="/"
                                spotifyLink={playlist.uri}
                                imageSrc={playlist.images?.[0]?.url}
                                squareAvatar
                            />
                        ))
                    ) : (
                        <p>No playlists found for specified time range.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
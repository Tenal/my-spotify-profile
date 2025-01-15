"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IPlaylist, ITrack } from "@/lib/typescript"
import { getFallbackInitials } from "@/lib/utils"
import { SongRowHeader } from "./SongRowHeader"
import { SongRow } from "./SongRow"

interface IPlaylistInfoProps {
    playlist: IPlaylist
}

export function PlaylistInfo({ playlist }: IPlaylistInfoProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const formattedFollowers = playlist.followers?.total.toLocaleString() || 0

    const getPlaylistsUrl = () => {
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.delete("playlist")
        return `${pathname}?${currentParams.toString()}`
    }

    return (
        <div className="p-0 sm:p-4">
            <div className="flex justify-center mt-10 sm:mt-5 ml-0 sm:ml-[95px] sm:justify-start">
                <Link
                    href={getPlaylistsUrl()}
                    className="flex items-center text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] hover:underline transition-all duration-200"
                >
                    Show all playlists
                </Link>
            </div>

            <div className="ml-0 sm:ml-[70px] mb-[70px] sm:mb-0 gap-4 p-6 bg-[hsl(var(--background))]">
                <div className="flex flex-col sm:flex-row justify-start items-center gap-4 mt-2 mb-10">
                    <Avatar className="w-[120px] h-[120px] rounded-md">
                        <AvatarImage
                            src={playlist.images?.[0]?.url}
                            alt={playlist.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))] text-4xl font-bold">
                            {getFallbackInitials(playlist.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-between items-center sm:items-start gap-2 h-full">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] text-center sm:text-left mt-1 whitespace-pre-wrap truncate">
                            {playlist.name}
                        </h1>
                        <p className="text-sm text-[hsl(var(--secondary))] text-center sm:text-left mt-3">
                            {formattedFollowers} Followers · By{" "}
                            {playlist.owner.display_name}
                        </p>
                    </div>
                </div>

                <div className="mt-4 w-full">
                    <SongRowHeader />
                    {playlist.tracks?.items?.length ? (
                        playlist.tracks.items.map(
                            (track: { track: ITrack }, index: number) => (
                                <SongRow
                                    key={track.track.id}
                                    name={track.track.name}
                                    artist={track.track.artists[0].name}
                                    album={track.track.album.name}
                                    songLength={track.track.duration_ms}
                                    explicit={track.track.explicit}
                                    artistLink={track.track.artists[0].id}
                                    songLink={track.track.id}
                                    spotifyLink={track.track.uri ?? "/"}
                                    imageSrc={
                                        track.track.album.images?.[0]?.url
                                    }
                                    index={index}
                                />
                            )
                        )
                    ) : (
                        <p className="text-[hsl(var(--secondary))] mt-5">
                            Oops, this playlist does not have any tracks yet!
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

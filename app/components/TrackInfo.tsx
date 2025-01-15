"use client"

import React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ITrack } from "@/lib/typescript"

interface ITrackInfoProps {
    track: ITrack
}

export function TrackInfo({ track }: ITrackInfoProps) {
    const fallbackInitials = track.name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .splice(0, 2)
        .join("")

    const getTrackUrl = () => {
        const currentParams = new URLSearchParams(window.location.search)
        currentParams.delete("track")
        return `${window.location.pathname}?${currentParams.toString()}`
    }

    return (
        <>
            <div className="flex justify-center mt-10 sm:mt-0 sm:fixed sm:top-10 sm:left-28">
                <Link
                    href={getTrackUrl()}
                    className="flex items-center text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] hover:underline transition-all duration-200"
                >
                    Show all tracks
                </Link>
            </div>

            <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--background))] ml-0 sm:ml-[70px] mb-[70px] sm:mb-0">
                <div className="flex flex-col items-center justify-center gap-4 p-6 bg-[hsl(var(--background))] rounded-lg">
                    <Avatar className="w-[200px] h-[200px]">
                        <AvatarImage
                            src={track.album?.images?.[0]?.url}
                            alt={track.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))] text-4xl font-bold">
                            {fallbackInitials}
                        </AvatarFallback>
                    </Avatar>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[hsl(var(--foreground))] text-center mt-1 whitespace-pre-wrap truncate">
                        {track.name}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center w-full mt-3">
                        <div>
                            <p className="text-xs uppercase text-[hsl(var(--secondary))]">
                                Album
                            </p>
                            <p className="text-xl font-bold text-[hsl(var(--accent))]">
                                {track.album.name || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-[hsl(var(--secondary))]">
                                Artists
                            </p>
                            <div className="text-[hsl(var(--accent))] truncate">
                                {track.artists?.length
                                    ? track.artists?.map((artist) => (
                                          <p
                                              key={artist.id}
                                              className="text-xl font-bold"
                                          >
                                              {artist.name}
                                          </p>
                                      ))
                                    : "N/A"}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-[hsl(var(--secondary))]">
                                Popularity
                            </p>
                            <p className="text-xl font-bold text-[hsl(var(--accent))]">
                                {`${track.popularity}%` || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

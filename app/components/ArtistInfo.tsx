"use client"

import React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IArtist } from "@/lib/typescript"

interface IArtistInfoProps {
    artist: IArtist
}

export function ArtistInfo({ artist }: IArtistInfoProps) {
    const formattedFollowers = artist.followers?.total.toLocaleString() || 0
    const fallbackInitials = artist.name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .splice(0, 2)
        .join("")

    const getArtistsUrl = () => {
        const currentParams = new URLSearchParams(window.location.search)
        currentParams.delete("artist")
        return `${window.location.pathname}?${currentParams.toString()}`
    }

    return (
        <>
            <div className="flex justify-center mt-10 sm:mt-0 sm:fixed sm:top-10 sm:left-28">
                <Link
                    href={getArtistsUrl()}
                    className="flex items-center text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] hover:underline transition-all duration-200"
                >
                    Show all artists
                </Link>
            </div>

            <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--background))] ml-0 sm:ml-[70px] mb-[70px] sm:mb-0">
                <div className="flex flex-col items-center justify-center gap-4 p-6 bg-[hsl(var(--background))] rounded-lg">
                    <Avatar className="w-[200px] h-[200px]">
                        <AvatarImage
                            src={artist.images?.[0]?.url}
                            alt={artist.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))] text-4xl font-bold">
                            {fallbackInitials}
                        </AvatarFallback>
                    </Avatar>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[hsl(var(--foreground))] text-center mt-1 whitespace-pre-wrap truncate">
                        {artist.name}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center w-full mt-3">
                        <div>
                            <p className="text-xs uppercase text-[hsl(var(--secondary))]">
                                Followers
                            </p>
                            <p className="text-xl font-bold text-[hsl(var(--accent))]">
                                {formattedFollowers || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-[hsl(var(--secondary))]">
                                Genres
                            </p>
                            <div className="text-[hsl(var(--accent))] truncate">
                                {artist.genres?.length
                                    ? artist.genres?.map((genre) => (
                                          <p
                                              key={genre}
                                              className="text-xl font-bold"
                                          >
                                              {genre}
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
                                {`${artist.popularity}%` || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

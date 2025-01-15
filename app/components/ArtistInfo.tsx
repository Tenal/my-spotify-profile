"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"
import { getFallbackInitials } from "@/lib/utils"
import { IArtist } from "@/lib/typescript"
import { Mic2 } from "lucide-react"

interface IArtistInfoProps {
    artist: IArtist
}

export function ArtistInfo({ artist }: IArtistInfoProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const formattedFollowers = artist.followers?.total.toLocaleString() || 0

    const getArtistsUrl = () => {
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.delete("artist")
        return `${pathname}?${currentParams.toString()}`
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

            <div className="flex items-center justify-center min-h-[80vh] sm:min-h-screen bg-[hsl(var(--background))] ml-0 sm:ml-[70px] mb-[70px] sm:mb-0">
                <div className="flex flex-col items-center justify-center gap-4 p-6 bg-[hsl(var(--background))] rounded-lg">
                    <div className="relative">
                        <Avatar className="w-[200px] h-[200px]">
                            <AvatarImage
                                src={artist.images?.[0]?.url}
                                alt={artist.name}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))] text-4xl font-bold">
                                {getFallbackInitials(artist.name)}
                            </AvatarFallback>
                        </Avatar>
                        <TooltipProvider>
                            <div>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-2 w-10 h-10 absolute top-[150px] left-[150px] bg-[hsl(var(--accent))] rounded-full">
                                            <Mic2 className="w-6 h-6 text-black" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        className="
                                            data-[state=closed]:fade-out
                                            data-[state=closed]:duration-300
                                            data-[state=open]:fade-in
                                            data-[state=open]:duration-300
                                            bg-[hsl(var(--popover))]
                                            text-[hsl(var(--popover-foreground))]
                                            border-0
                                        "
                                    >
                                        Artist
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[hsl(var(--foreground))] text-center mt-1 whitespace-pre-wrap truncate">
                        {artist.name}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center w-full mt-3">
                        <div className="max-w-[300px] m-auto">
                            <p className="text-xs uppercase text-[hsl(var(--secondary))]">
                                Followers
                            </p>
                            <p className="text-xl font-bold text-[hsl(var(--accent))]">
                                {formattedFollowers || "N/A"}
                            </p>
                        </div>

                        <div className="max-w-[300px] m-auto">
                            <p className="text-xs uppercase text-[hsl(var(--secondary))]">
                                Genres
                            </p>
                            <div className="text-xl font-bold text-[hsl(var(--accent))] truncate">
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

                        <div className="max-w-[300px] m-auto">
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

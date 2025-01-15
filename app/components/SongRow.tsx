"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { cn, getFallbackInitials } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"

interface ISongRowProps {
    imageSrc?: string
    name: string
    artist: string
    album: string
    songLength: number
    explicit: boolean
    artistLink: string
    songLink: string
    spotifyLink: string
    index: number
}

export function SongRow({
    imageSrc,
    name,
    artist,
    album,
    songLength,
    explicit,
    artistLink,
    songLink,
    spotifyLink,
    index,
}: ISongRowProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleRowClick = () => {
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.set("track", songLink)
        const newUrl = `tracks?${currentParams.toString()}`
        router.push(newUrl)
    }

    return (
        <TooltipProvider>
            <div
                onClick={handleRowClick}
                className={cn(
                    "group flex items-center w-full gap-4 px-3 py-2 rounded-sm",
                    "hover:bg-[hsl(var(--background-hover))]",
                    "transition-colors duration-100 cursor-pointer"
                )}
                style={{ height: "65px" }}
            >
                {/* number or play button */}
                <div className="relative w-4 h-4 flex items-center justify-center text-[hsl(var(--secondary))]">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href={spotifyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                    "absolute inset-0flex items-center justify-center",
                                    "opacity-0 group-hover:opacity-100",
                                    "transition-opacity duration-200",
                                    "pointer-events-auto"
                                )}
                                aria-label={`Play ${name} on Spotify`}
                            >
                                <svg
                                    className="w-full h-full text-[hsl(var(--foreground))] pointer-events-none"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M4 3v18l17-9-17-9z" />
                                </svg>
                                <div
                                    className="absolute inset-0 pointer-events-auto"
                                    aria-hidden="true"
                                />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent className="z-50 bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] border-none">
                            Play {name} on Spotify
                        </TooltipContent>
                    </Tooltip>
                    <span
                        className={cn(
                            "opacity-100 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none"
                        )}
                    >
                        {index + 1}
                    </span>
                </div>
                {/* album image */}
                <div className="w-12 h-12">
                    <Avatar className="w-full h-full rounded-md">
                        <AvatarImage
                            src={imageSrc}
                            alt={name}
                            className="object-cover w-full h-full"
                        />
                        <AvatarFallback className="flex items-center justify-center w-full h-full text-xl font-bold bg-[hsl(var(--background))] text-[hsl(var(--secondary))]">
                            {getFallbackInitials(name)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* song & artist names */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col">
                        <p className="leading-tight text-[hsl(var(--foreground))] truncate">
                            {name.length > 40
                                ? `${name.slice(0, 40)}...`
                                : name}
                        </p>
                        <p className="text-sm text-[hsl(var(--secondary))] flex items-center gap-1 truncate">
                            {explicit && (
                                <span className="mt-1 px-1.5 pb-0.6 pt-0.5 text-xs font-semibold rounded-sm bg-[hsl(var(--secondary))] text-[hsl(var(--background))]">
                                    E
                                </span>
                            )}
                            <Link
                                href={
                                    artistLink
                                        ? `artists?artist=${artistLink}`
                                        : "artists"
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="hover:underline text-[hsl(var(--secondary))] truncate mt-1"
                            >
                                {artist}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* album (hidden at sm breakpoint) */}
                <div className="hidden sm:block text-left flex-1 justify-start">
                    <p className="text-sm text-[hsl(var(--secondary))] truncate text-left">
                        {album.length > 35 ? `${album.slice(0, 35)}...` : album}
                    </p>
                </div>

                {/* song length */}
                <div className="hidden xs:block min-w-[30px] text-sm text-[hsl(var(--secondary))] text-right">
                    {Math.floor(songLength / 60000)}:
                    {((songLength % 60000) / 1000).toFixed(0).padStart(2, "0")}
                </div>
            </div>
        </TooltipProvider>
    )
}

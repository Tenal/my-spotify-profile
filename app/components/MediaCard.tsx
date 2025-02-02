"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { cn, getFallbackInitials } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"

interface IMediaCardProps {
    imageSrc?: string
    name: string
    mediaType: string
    link: string
    spotifyLink: string
    squareAvatar?: boolean
    mb?: number
}

export function MediaCard({
    imageSrc,
    name,
    mediaType,
    link,
    spotifyLink,
    squareAvatar,
    mb,
}: IMediaCardProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleCardClick = () => {
        const currentParams = new URLSearchParams(searchParams.toString())
        const artistOrPlaylist = mediaType === "artist" ? "artist" : "playlist"
        currentParams.set(artistOrPlaylist, link)

        const newUrl = `${artistOrPlaylist}s?${currentParams.toString()}`
        router.push(newUrl)
    }

    return (
        <TooltipProvider>
            <Card
                onClick={handleCardClick}
                className={cn(
                    "card-fluid",
                    "group relative  cursor-pointer overflow-hidden p-[12px]",
                    "bg-transparent hover-bg-base text-base-default rounded-md transition-colors duration-100",
                    "border-0",
                    mb ? `mb-${mb}` : "mb-6"
                )}
            >
                {/* artist image & play button */}
                <div className="relative w-full aspect-square">
                    <Avatar
                        className={cn(
                            "w-full h-full",
                            squareAvatar ? "rounded-md" : "rounded-full"
                        )}
                    >
                        <AvatarImage
                            src={imageSrc}
                            alt={name}
                            className="object-cover w-full h-full"
                        />
                        <AvatarFallback
                            className={cn(
                                "flex items-center justify-center",
                                "w-full h-full",
                                "text-4xl font-bold",
                                "bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))]",
                                squareAvatar ? "rounded-md" : "rounded-full"
                            )}
                        >
                            {getFallbackInitials(name)}
                        </AvatarFallback>
                    </Avatar>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href={spotifyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="
                                    absolute bottom-2 right-2
                                    rounded-full
                                    bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]
                                    p-3
                                    opacity-0
                                    translate-y-2
                                    group-hover:opacity-100
                                    group-hover:translate-y-0
                                    hover:scale-105
                                    hover:bg-[hsl(var(--accent-hover))]
                                    shadow-md hover:shadow-lg
                                    "
                                style={{
                                    transition:
                                        "opacity 300ms, transform 200ms",
                                }}
                                aria-label={`Play ${name} on Spotify`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M4 3v18l17-9-17-9z" />
                                </svg>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] border-0">
                            Play {name} on Spotify
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* artist name & media type */}
                <div className="mt-3 flex flex-col items-start text-left gap-1">
                    <span className="font-normal leading-tight">
                        <Link
                            href={link}
                            onClick={handleCardClick}
                            className="hover:underline "
                        >
                            {name}
                        </Link>
                    </span>
                    <span className="text-xs mt-1 text-base-secondary leading-tight capitalize ">
                        {mediaType}
                    </span>
                </div>
            </Card>
        </TooltipProvider>
    )
}

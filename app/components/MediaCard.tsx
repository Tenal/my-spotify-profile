"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
    mediaType: "artist" | "playlist"
    link: string
    spotifyLink: string
}

export function MediaCard({
    imageSrc,
    name,
    mediaType,
    link,
    spotifyLink,
}: IMediaCardProps) {
    const router = useRouter()

    const fallbackInitials = name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")

    const handleCardClick = () => {
        router.push(link)
    }

    const handleNameClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.stopPropagation()
    }

    return (
        <TooltipProvider>
            <Card
                onClick={handleCardClick}
                className={cn(
                    "card-fluid",
                    "group relative  cursor-pointer overflow-hidden p-[12px]",
                    "hover-bg-base text-base-default rounded-md transition-colors duration-100",
                    "border-none"
                )}
            >
                <div className="relative w-full aspect-square">
                    <Avatar className="w-full h-full">
                        <AvatarImage
                            src={imageSrc}
                            alt={name}
                            className="object-cover w-full h-full"
                        />
                        <AvatarFallback
                            className="
                                flex items-center justify-center
                                w-full h-full
                                text-4xl font-bold
                                bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))]
                            "
                        >
                            {fallbackInitials}
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
                                    absolute bottom-1 right-2
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
                                aria-label={`Play ${name}`}
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
                        <TooltipContent
                            className="
                                data-[state=closed]:fade-out
                                data-[state=closed]:duration-300
                                data-[state=open]:fade-in
                                data-[state=open]:duration-300
                                bg-[hsl(var(--popover))]
                                text-[hsl(var(--popover-foreground))]
                                border-none
                            "
                        >
                            Play {name} on Spotify
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="mt-3 flex flex-col items-start text-left gap-1">
                    <span className="font-normal leading-tight">
                        <Link
                            href={link}
                            onClick={handleNameClick}
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

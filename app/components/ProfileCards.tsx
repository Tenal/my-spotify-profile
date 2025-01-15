"use client"

import React from "react"
import Link from "next/link"
import { IArtist, IPlaylist } from "@/lib/typescript"
import { MediaCard } from "@/components/MediaCard"
import { ErrorMessage } from "./ErrorMessage"

interface IProfileCardsProps {
    title: string
    link: string
    data: IArtist[] | IPlaylist[]
}

export function ProfileCards({ title, link, data }: IProfileCardsProps) {
    const isPlaylist = link.includes("playlist")

    return (
        <div className="mb-8 sm:mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-xl xs:text-2xl mb-4 sm:mb-0">{title}</h2>
                <Link
                    href={link}
                    className="text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] hover:underline transition-all duration-200"
                >
                    Show all
                </Link>
            </div>
            <div className="overflow-hidden h-80 mt-4">
                {data?.length ? (
                    <div className="fluid-grid">
                        {data.map((card: IArtist | IPlaylist) => (
                            <MediaCard
                                key={card.id}
                                name={card.name}
                                mediaType={
                                    isPlaylist && "owner" in card
                                        ? `by ${
                                              (card as IPlaylist).owner
                                                  .display_name
                                          }`
                                        : card.type
                                }
                                link={card.id}
                                spotifyLink={card.uri}
                                imageSrc={card.images?.[0]?.url}
                                squareAvatar={isPlaylist}
                                mb={28}
                            />
                        ))}
                    </div>
                ) : (
                    <ErrorMessage
                        message={`Failed to fetch ${link.substring(
                            1
                        )}. Please refresh and try again. If the problem persists, you may not have any ${link.substring(
                            1
                        )} data associated with your Spotify account or there could be a transient issue with the Spotify API.`}
                    />
                )}
            </div>
        </div>
    )
}

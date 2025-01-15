"use client"

import React from "react"
import Link from "next/link"
import { ITrack } from "@/lib/typescript"
import { SongRow } from "./SongRow"
import { ErrorMessage } from "./ErrorMessage"

interface IProfileTracksProps {
    title: string
    link: string
    data: ITrack[]
}

export function ProfileTracks({ title, link, data }: IProfileTracksProps) {
    return (
        <div className="mb-24 sm:mb-16">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-xl xs:text-2xl mb-4 sm:mb-0">{title}</h2>
                <Link
                    href={link}
                    className="text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] hover:underline transition-all duration-200"
                >
                    Show all
                </Link>
            </div>
            <div className="mt-4 w-full">
                {data?.length ? (
                    data.map((track: ITrack, index: number) => (
                        <SongRow
                            key={track.id}
                            name={track.name}
                            artist={track.artists[0].name}
                            album={track.album.name}
                            songLength={track.duration_ms}
                            explicit={track.explicit}
                            artistLink={track.artists[0].id}
                            songLink={track.id}
                            spotifyLink={track.uri ?? "/"}
                            imageSrc={track.album.images?.[0]?.url}
                            index={index}
                        />
                    ))
                ) : (
                    <ErrorMessage message="Failed to fetch top tracks. Please refresh and try again. If the problem persists, you may not have any track data associated with your Spotify account or there could be a transient issue with the Spotify API." />
                )}
            </div>
        </div>
    )
}

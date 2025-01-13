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
                            artistLink="/"
                            spotifyLink={track.uri ?? "/"}
                            imageSrc={track.album.images?.[0]?.url}
                            index={index}
                        />
                    ))
                ) : (
                    <ErrorMessage message="No tracks found, please re-login and try again" />
                )}
            </div>
        </div>
    )
}

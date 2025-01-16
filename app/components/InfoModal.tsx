"use client"

import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog" // adjust path as needed
import { Info } from "lucide-react"

export function InfoModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button aria-label="Info">
                    <Info className="hidden sm:block w-10 h-10 text-[hsl(var(--secondary))] hover:scale-105 hover:text-[hsl(var(--muted))] hover:cursor-pointer transition-all duration-200" />
                </button>
            </DialogTrigger>
            <DialogContent className="px-4 pt-3.5 pb-5 border-0 max-w-md bg-[hsl(var(--background-hover))]">
                <DialogHeader>
                    <DialogTitle className="text-[hsl(var(--secondary))] text-sm sm:text-lg">
                        Credits & Additional Information
                    </DialogTitle>
                    <DialogDescription>
                        <ul className="list-disc pt-2 pl-5 space-y-2 text-xs sm:text-sm">
                            <li className="list-none sm:list-disc">
                                Source code can be found on{" "}
                                <a
                                    href="https://github.com/Tenal/my-spotify-profile.git"
                                    className="text-green-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                                .
                            </li>
                            <li className="list-none sm:list-disc">
                                This application integrates with the{" "}
                                <a
                                    href="https://developer.spotify.com/documentation/web-api/"
                                    className="text-green-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Spotify API
                                </a>
                                .
                            </li>
                            <li className="list-none sm:list-disc">
                                Modeled after the{" "}
                                <a
                                    href="https://open.spotify.com/"
                                    className="text-green-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Spotify Web App
                                </a>
                                .
                            </li>
                            <li className="list-none sm:list-disc">
                                Nav, loader & artist page designs inspired by{" "}
                                <a
                                    href="https://spotify-profile.herokuapp.com/"
                                    className="text-green-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Brittany Chiang
                                </a>
                                .
                            </li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default InfoModal

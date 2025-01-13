"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Music, ListMusic, Clock10Icon, Mic2 } from "lucide-react"
import SpotifyIcon from "./icons/spotify"
import InfoModal from "./InfoModal"

const NAV_ITEMS = [
    { label: "Profile", href: "/", icon: User },
    { label: "Top Artists", href: "/artists", icon: Mic2 },
    { label: "Top Tracks", href: "/tracks", icon: Music },
    { label: "Recent", href: "/recent", icon: Clock10Icon },
    { label: "Playlists", href: "/playlists", icon: ListMusic },
]

export function NavigationBar() {
    const pathname = usePathname()

    return (
        <nav
            className="fixed z-50 bg-[hsl(var(--background-active))] text-[hsl(var(--secondary))] py-5
                sm:h-full sm:w-[70px] sm:top-0 sm:left-0 sm:flex-col sm:flex-nowrap sm:gap-2
                w-full h-[70px] bottom-0 flex flex-row justify-between items-center"
        >
            <Link key="spotify-icon" href="/" className="hidden sm:block">
                <SpotifyIcon className="w-10 h-10 text-[hsl(var(--accent))] hover:scale-105 hover:text-[hsl(var(--accent-hover))] transition-all duration-200" />
            </Link>
            <div
                className="sm:h-full sm:w-[70px] sm:top-0 sm:left-0 sm:flex-col sm:flex-nowrap sm:gap-2
                    w-full h-[70px] bottom-0 flex flex-row justify-center items-center"
            >
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 w-full sm:w-[70px] h-full sm:h-[70px]",
                                "transition-colors duration-200 text-xs font-medium border-t-4 border-black sm:border-l-4",
                                "hover:bg-[hsl(var(--background-hover))] hover:text-[hsl(var(--foreground))] hover:border-grey-500",
                                isActive &&
                                    "bg-[hsl(var(--background-hover))] text-[hsl(var(--foreground))] " +
                                        "border-t-4 border-l-0 border-green-500 sm:border-t-0 sm:border-l-4 sm:border-green-500"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-6 h-6 text-[hsl(var(--secondary))]",
                                    isActive && "text-[hsl(var(--foreground))]"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-[10px] text-[hsl(var(--secondary))]",
                                    isActive && "text-[hsl(var(--foreground))]"
                                )}
                            >
                                {label}
                            </span>
                        </Link>
                    )
                })}
            </div>
            <InfoModal />
        </nav>
    )
}

"use client"

import { useRouter } from "next/navigation"
import { IUser } from "@/lib/typescript"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface IProfileHeaderProps {
    user: IUser
    following: number
    playlists: number
}

export function ProfileHeader({
    user,
    following,
    playlists,
}: IProfileHeaderProps) {
    const router = useRouter()

    const handleLogout = async () => {
        const response = await fetch("/api/auth/logout", { method: "GET" })
        if (response.ok) {
            router.refresh()
        } else {
            console.error("Logout failed")
        }
    }

    return (
        <div
            className="
                text-[hsl(var(--foreground))] pt-5 pb-10 mb-12 sm:mb-10
                flex flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-end  gap-6
            "
        >
            <Avatar className="w-[150px] h-[150px] rounded-full">
                <AvatarImage
                    src={user.images[0]?.url}
                    alt={`${user.display_name}'s avatar`}
                    className="object-cover"
                />
                <AvatarFallback className="w-[150px] h-[150px] rounded-full bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))]">
                    <User className="w-[100px] h-[100px]" />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 w-full">
                <p className="text-sm text-[hsl(var(--primary))] hidden sm:block">
                    Profile
                </p>
                <h1 className="text-center sm:text-left text-8xl font-bold leading-tight">
                    {user.display_name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                    <p className="text-center sm:text-left text-sm text-[hsl(var(--secondary))]">
                        {playlists} Playlists · {user.followers.total} Followers
                        · {following} Following
                    </p>
                    <button
                        onClick={handleLogout}
                        className="mt-4 ml-0 sm:mt-0 sm:ml-2 px-3 py-2 bg-[hsl(var(--accent))] text-xs text-[hsl(var(--background-active))] uppercase font-medium tracking-wide rounded-full hover:bg-[hsl(var(--accent-hover))] hover:scale-105 transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

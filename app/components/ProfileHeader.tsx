"use client"

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
                    alt={`${name}'s avatar`}
                    className="object-cover"
                />
                <AvatarFallback className="w-[150px] h-[150px] rounded-full bg-[hsl(var(--background-hover))] text-[hsl(var(--secondary))]">
                    <User className="w-[100px] h-[100px]" />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
                <p className="text-sm text-[hsl(var(--primary))] hidden sm:block">
                    Profile
                </p>
                <h1 className="text-center sm:text-left text-8xl font-bold leading-tight">
                    {user.display_name}
                </h1>
                <p className="text-center sm:text-left text-sm text-[hsl(var(--secondary))]">
                    {playlists} Playlists · {user.followers.total} Followers ·{" "}
                    {following} Following
                </p>
            </div>
        </div>
    )
}

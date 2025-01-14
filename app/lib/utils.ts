import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getSpotifyTimeRange = (
    range: string
): "long_term" | "medium_term" | "short_term" => {
    switch (range) {
        case "all-time":
            return "long_term"
        case "4-weeks":
            return "short_term"
        case "6-months":
        default:
            return "long_term"
    }
}

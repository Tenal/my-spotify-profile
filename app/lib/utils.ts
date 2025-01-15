import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn merges a list of class names into one final string,
 * removing duplicates & ensuring a clean, combined set of classes
 * @param inputs - a list of class values (strings, arrays, conditionals)
 * @returns a single merged class name string
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * getSpotifyTimeRange converts a user-friendly time range string
 * ("all-time", "6-months", or "4-weeks") into the corresponding
 * Spotify API parameter time range ("long_term", "medium_term", "short_term")
 * @param range - time range ("all-time" | "6-months" | "4-weeks"), defaults to "all-time" if not provided
 * @returns one of "long_term", "medium_term", or "short_term" for Spotify’s API
 */
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

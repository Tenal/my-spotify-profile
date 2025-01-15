import { getSpotifyTimeRange } from "@/lib/utils"
import { cookies } from "next/headers"

/**
 * getSpotifyAuthToken retrieves the current Spotify access token for a user
 * by reading it from server-side cookies.
 * @throws error if no token is found in cookies
 * @returns a promise that resolves to the user’s spotify_access_token
 */
export const getSpotifyAuthToken = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("spotify_access_token")?.value

    if (!token) {
        throw new Error("UNAUTHORIZED")
    }

    return token
}

/**
 * spotifyFetch fetched data from the Spotify API
 * @param endpoint - the relative Spotify API endpoint (e.g., "me/top/artists?time_range=long_term&limit=50")
 * @param accessToken - the user's Spotify access token for authorization
 * @param init - optional fetch initialization options to override defaults
 * @throws error if access token expired & refresh token fails, or if Spotify API responds with a non-OK status
 * @returns a promise that resolves to the parsed JSON response from the Spotify API
 */
export const spotifyFetch = async (
    endpoint: string,
    accessToken: string,
    init?: RequestInit
) => {
    if (!accessToken) {
        throw new Error("UNAUTHORIZED")
    }

    const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })

    if (res.status === 401) {
        throw new Error("UNAUTHORIZED")
    }

    // TODO - integrate reauthorization flow
    // if (res.status === 401) {
    //     // call refresh route to get new access token
    //     const baseUrl =
    //         process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    //     const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh`, {
    //         method: "GET",
    //     })

    //     if (!refreshResponse.ok) {
    //         throw new Error(
    //             "Access token expired and refresh failed. Re-login required."
    //         )
    //     }

    //     const refreshData = await refreshResponse.json()
    //     if (!refreshData.accessToken) {
    //         throw new Error(
    //             "No access token returned from refresh. Re-login required."
    //         )
    //     }

    //     // retry original request with the new access token
    //     res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    //         ...init,
    //         credentials: "include",
    //         headers: {
    //             ...init?.headers,
    //             Authorization: `Bearer ${refreshData.accessToken}`,
    //             "Content-Type": "application/json",
    //         },
    //     })
    // }

    if (!res.ok) {
        throw new Error(`Spotify API error: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

/**
 * getTopArtists fetches top Spotify artists for a user
 * @param range - time range ("all-time" | "6-months" | "4-weeks"), defaults to "all-time" if not provided
 * @param token - user’s spotify_access_token
 * @param limit - optional param for the number of artists to fetch, defaults to 50
 * @throws error if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getTopArtists = async (
    range: string = "all-time",
    token: string,
    limit: number = 50
) => {
    const spotifyRange = getSpotifyTimeRange(range)
    const data = await spotifyFetch(
        `me/top/artists?time_range=${spotifyRange}&limit=${limit}`,
        token
    )

    if (!data || !data.items || data.items.length < 1) {
        throw new Error(
            data?.error?.message ||
                "Failed to fetch top artists. Please refresh and try again. If the problem persists, you may not have any artist data associated with your Spotify account or there could be a transient issue with the Spotify API."
        )
    }

    return data
}

/**
 * getTopPlaylists fetches top Spotify playlists for a user
 * @param token - user’s spotify_access_token
 * @param limit - optional param for the number of artists to fetch, defaults to 50
 * @throws error if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getTopPlaylists = async (token: string, limit: number = 50) => {
    const data = await spotifyFetch(`me/playlists?limit=${limit}`, token)

    if (!data || !data.items || data.items.length < 1) {
        throw new Error(
            data?.error?.message ||
                "Failed to fetch top playlists. Please refresh and try again. If the problem persists, you may not have any playlist data associated with your Spotify account or there could be a transient issue with the Spotify API."
        )
    }

    return data
}

/**
 * getTopTracks fetches top Spotify tracks for a user
 * @param range - time range ("all-time" | "6-months" | "4-weeks"), defaults to "all-time" if not provided
 * @param token - user’s spotify_access_token
 * @param limit - optional param for the number of tracks to fetch, defaults to 50
 * @throws error if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getTopTracks = async (
    range: string = "all-time",
    token: string,
    limit: number = 50
) => {
    const spotifyRange = getSpotifyTimeRange(range)
    const data = await spotifyFetch(
        `me/top/tracks?time_range=${spotifyRange}&limit=${limit}`,
        token
    )

    if (!data || !data.items || data.items.length < 1) {
        throw new Error(
            data?.error?.message ||
                "Failed to fetch top tracks. Please refresh and try again. If the problem persists, you may not have any track data associated with your Spotify account or there could be a transient issue with the Spotify API."
        )
    }

    return data
}

/**
 * getRecentTracks fetches recently played Spotify tracks for a user
 * @param token - user’s spotify_access_token
 * @param limit - optional param for the number of tracks to fetch, defaults to 50
 * @throws error if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getRecentTracks = async (token: string, limit: number = 50) => {
    const data = await spotifyFetch(
        `me/player/recently-played?limit=${limit}`,
        token
    )

    if (!data || !data.items || data.items.length < 1) {
        throw new Error(
            data?.error?.message ||
                "Failed to fetch recent tracks. Please refresh and try again. If the problem persists, you may not have any track data associated with your Spotify account or there could be a transient issue with the Spotify API."
        )
    }

    return data
}

/**
 * getHomeProfileData fetches all data needed for the Home page in parallel
 * @param token - user’s spotify_access_token
 * @throws error any fetch fails
 * @returns an object containing { user, userFollowing, artists, playlists, tracks }
 */
export const getHomeProfileData = async (token: string) => {
    const [user, userFollowing, topArtists, topPlaylists, topTracks] =
        await Promise.all([
            spotifyFetch("me", token),
            spotifyFetch("me/following?type=artist", token),
            spotifyFetch("me/top/artists?time_range=long_term&limit=10", token),
            spotifyFetch("me/playlists?limit=10", token),
            spotifyFetch("me/top/tracks?time_range=long_term&limit=4", token),
        ])

    return {
        user,
        userFollowing,
        artists: topArtists,
        playlists: topPlaylists,
        tracks: topTracks,
    }
}

/**
 * getArtist fetches info for a single artist by ID
 * @param id - the artist's Spotify ID
 * @param token - user’s spotify_access_token
 * @throws error if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getArtist = async (id: string, token: string) => {
    const data = await spotifyFetch(`artists/${id}`, token)

    if (!data || data.error) {
        throw new Error(
            data?.error?.message ||
                "Failed to fetch artist info. Please refresh and try again. If the problem persists, the artist may not exist or there's a transient issue with the Spotify API."
        )
    }

    return data
}

/**
 * getTrack fetches info for a single track by ID
 * @param id - the tracks's Spotify ID
 * @param token - user’s spotify_access_token
 * @throws error if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getTrack = async (id: string, token: string) => {
    const data = await spotifyFetch(`tracks/${id}`, token)

    if (!data || data.error) {
        throw new Error(
            data?.error?.message ||
                "Failed to fetch track info. Please refresh and try again. If the problem persists, the track may not exist or there's a transient issue with the Spotify API."
        )
    }

    return data
}

/**
 * getPlaylist fetches info for a playlist by ID
 * @param id - the playlists's Spotify ID
 * @param token - user’s spotify_access_token
 * @throws error if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getPlaylist = async (id: string, token: string) => {
    const data = await spotifyFetch(`playlists/${id}`, token)

    if (!data || data.error) {
        throw new Error(
            data?.error?.message ||
                "Failed to fetch playlist info. Please refresh and try again. If the problem persists, the playlist may not exist or there's a transient issue with the Spotify API."
        )
    }

    return data
}

import { getSpotifyTimeRange } from "@/lib/utils"

/**
 * spotifyFetch fetched data from the Spotify API
 * @param endpoint - the relative Spotify API endpoint (e.g., "me/top/artists?time_range=long_term&limit=50")
 * @param accessToken - the user's Spotify access token for authorization
 * @param init - optional fetch initialization options to override defaults
 * @throws error if the Spotify API responds with a non-OK status
 * @returns a promise that resolves to the parsed JSON response from the Spotify API
 */
export const spotifyFetch = async (
    endpoint: string,
    accessToken: string,
    init?: RequestInit
) => {
    const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })

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
 * @throws error if no token is provided or if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getTopArtists = async (
    range: string = "all-time",
    token: string,
    limit: number = 50
) => {
    if (!token) {
        throw new Error(
            "No access token provided. Please re-login and try again."
        )
    }

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
 * @throws error if no token is provided or if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getTopPlaylists = async (token: string, limit: number = 50) => {
    if (!token) {
        throw new Error(
            "No access token provided. Please re-login and try again."
        )
    }

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
 * @throws error if no token is provided or if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getTopTracks = async (
    range: string = "all-time",
    token: string,
    limit: number = 50
) => {
    if (!token) {
        throw new Error(
            "No access token provided. Please re-login and try again."
        )
    }

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
 * @throws error if no token is provided or if fetched data is invalid/empty
 * @returns a promise that resolves to the data fetched from Spotify's API
 */
export const getRecentTracks = async (token: string, limit: number = 50) => {
    if (!token) {
        throw new Error(
            "No access token provided. Please re-login and try again."
        )
    }

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
 * @throws error if no token is provided or if any fetch fails
 * @returns an object containing { user, userFollowing, artists, playlists, tracks }
 */
export const getHomeProfileData = async (token: string) => {
    if (!token) {
        throw new Error(
            "No access token provided. Please re-login and try again."
        )
    }

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

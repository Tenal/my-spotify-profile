export async function spotifyFetch(
    endpoint: string,
    accessToken: string,
    init?: RequestInit
) {
    const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        // TODO handle errors - 401, 403, 404, etc.
        // 401 - refresh the token if & throw an error to the caller
        // etc
        throw new Error(`Spotify API error: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export interface ISpotifyImage {
    url: string
    height: number
    width: number
}

export interface IArtist {
    id: string
    name: string
    images: ISpotifyImage[]
    type: "artist"
    uri: string
    external_urls?: { spotify: string }
    followers?: { href: string | null; total: number }
    genres?: string[]
    href?: string
    popularity?: number
    [key: string]: unknown
}

export interface ITrack {
    id: string
    name: string
    uri: string
    artists: { name: string; id: string }[]
    album: { name: string; images: ISpotifyImage[] }
    duration_ms: number
    explicit: boolean
    external_urls?: { spotify: string }
    href?: string
    popularity?: number
    [key: string]: unknown
}

export interface IRecentTrack {
    track: {
        album: {
            album_type: string
            total_tracks: number
            available_markets: string[]
            external_urls: {
                spotify: string
            }
            href: string
            id: string
            images: ISpotifyImage[]
            name: string
            release_date: string
            release_date_precision: string
            restrictions?: {
                reason: string
            }
            type: string
            uri: string
            artists: ITrackArtist[]
        }
        artists: ITrackArtist[]
        available_markets: string[]
        disc_number: number
        duration_ms: number
        explicit: boolean
        external_ids: {
            isrc: string
            ean: string
            upc: string
        }
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        is_playable: boolean
        linked_from?: object
        restrictions?: {
            reason: string
        }
        name: string
        popularity: number
        preview_url: string | null
        track_number: number
        type: string
        uri: string
        is_local: boolean
    }
    played_at: string
    context?: {
        type: string
        href: string
        external_urls: {
            spotify: string
        }
        uri: string
    }
}

export interface ITrackArtist {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface IPlaylist {
    collaborative: boolean
    description: string
    external_urls: { spotify: string }
    href: string
    id: string
    images: ISpotifyImage[]
    name: string
    owner: {
        external_urls: { spotify: string }
        followers: { href: string | null; total: number }
        href: string
        id: string
        type: string
        uri: string
        display_name: string
        [key: string]: unknown
    }
    public: boolean
    snapshot_id: string
    tracks: {
        href: string
        total: number
        items?: any[]
        [key: string]: unknown
    }
    type: string
    uri: string
    followers?: { href: string | null; total: number }
}

export interface IUser {
    country: string
    display_name: string
    email: string
    explicit_content: {
        filter_enabled: boolean
        filter_locked: boolean
    }
    external_urls: {
        spotify: string
    }
    followers: {
        href: string | null
        total: number
    }
    href: string
    id: string
    images: ISpotifyImage[]
    product: string
    type: string
    uri: string
}

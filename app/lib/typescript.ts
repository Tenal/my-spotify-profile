export interface ITrack {
    id: string
    name: string
    uri: string
    artists: { name: string }[]
    album: { name: string; images: { url: string }[] }
    duration_ms: number
    explicit: boolean
    [key: string]: unknown
}

export interface IArtist {
    id: string
    name: string
    images: { url: string }[]
    type: "artist"
    uri: string
    [key: string]: unknown
}

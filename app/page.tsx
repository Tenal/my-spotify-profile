import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"

export default async function Home() {
    const nextCookies = await cookies()
    const accessToken = nextCookies.get("spotify_access_token")?.value
    console.log("**** ACCESS TOKEN ****", accessToken)

    return (
        <div className="text-center p-4">
            <h1 className="text-3xl font-bold text-blue-500">Spotify</h1>
            <Button>Click me</Button>
        </div>
    )
}

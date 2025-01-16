import Link from "next/link"

export function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <h2 className="text-3xl font-extrabold mb-6 text-center">
                My Spotify Profile
            </h2>
            <p className="p-3 max-w-[300px] text-center">
                Welcome! To access this app, you&apos;ll need a Spotify account.
                Click login below to authenticate with Spotify.
            </p>
            <p className="text-xs mb-8 p-3 max-w-[300px] text-center">
                This app is a personal learning project, it is not affiliated
                with or endorsed by Spotify.
            </p>
            <Link href="/api/auth/login">
                <button className="px-8 py-3 bg-[hsl(var(--accent))] text-[hsl(var(--background-active))] uppercase font-medium tracking-wide rounded-full hover:bg-[hsl(var(--accent-hover))] hover:scale-105 transition-all duration-200">
                    Log in to Spotify
                </button>
            </Link>
        </div>
    )
}

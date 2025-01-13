import Link from "next/link"

export function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <h2 className="text-3xl font-extrabold mb-8">My Spotify Profile</h2>
            <Link href="/api/auth/login">
                <button className="px-8 py-3 bg-[hsl(var(--accent))] text-[hsl(var(--background-active))] uppercase font-medium tracking-wide rounded-full hover:bg-[hsl(var(--accent-hover))] hover:scale-105 transition-all duration-200">
                    Log in to Spotify
                </button>
            </Link>
        </div>
    )
}

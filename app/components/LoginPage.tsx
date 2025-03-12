import Link from "next/link"

export function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <h2 className="text-3xl font-extrabold mb-6 text-center">
                My Spotify Profile
            </h2>
            <p className="p-3 max-w-[300px] text-center">
                Welcome! To access this app, you&apos;ll need a Spotify account
                & for me to grant access to your account. Following that, you
                can click login below to authenticate with Spotify.
            </p>
            <p className="text-xs mb-8 p-3 max-w-[300px] text-center">
                Important: due to the Spotify API&apos;s terms of service, I
                need to manually grant access to your account. Without this, the
                My Spotify Profile app won&apos;t display any of your data.
                I&apos;m happy to grant access to anyone who wants access, just
                send your name & email to tenalbourchier@gmail.com!
            </p>
            <Link href="/api/auth/login">
                <button className="px-8 py-3 bg-[hsl(var(--accent))] text-[hsl(var(--background-active))] uppercase font-medium tracking-wide rounded-full hover:bg-[hsl(var(--accent-hover))] hover:scale-105 transition-all duration-200">
                    Log in to Spotify
                </button>
            </Link>
        </div>
    )
}

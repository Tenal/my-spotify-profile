import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NavigationBar } from "@/components/NavigationBar"
import { LoginPage } from "./components/LoginPage"
import { cookies } from "next/headers"
import { ErrorBoundary } from "./components/ErrorBoundary"
import "./globals.css"

export const dynamic = "force-dynamic"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "My Spotify Profile",
    description: "A web app for viewing your Spotify data",
    icons: {
        icon: "/favicons/spotify-favicon.ico",
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {accessToken ? (
                    <ErrorBoundary>
                        <NavigationBar />
                        <main>{children}</main>
                    </ErrorBoundary>
                ) : (
                    <LoginPage />
                )}
            </body>
        </html>
    )
}

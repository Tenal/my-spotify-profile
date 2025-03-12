# My Spotify Profile

A web application, modeled after Spotify's profile interface, for visualizing your spotify data. It uses Next.js v15+ (App Router), TypeScript, Tailwind CSS, and shadcn/ui. OAuth and data fetching are handled through the Spotify Web API.


Desktop View                                                                              | Mobile View
:----------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------:
![image](https://github.com/user-attachments/assets/d0c4714a-6d02-4407-9e1e-a60a1761d70c) | ![image](https://github.com/user-attachments/assets/45756e41-7d45-45e9-b299-09d28c42d87d)
![image](https://github.com/user-attachments/assets/cbf8bcb3-ac5f-4934-b33d-239bac8e0534) | ![image](https://github.com/user-attachments/assets/c2f91603-a823-4534-8fba-0849143dfcab)
![image](https://github.com/user-attachments/assets/12a2ddce-9f74-41b0-8a28-e8d505fb0dec) | ![image](https://github.com/user-attachments/assets/4248c4db-9f68-4850-960e-86d270aa8cc2)
![image](https://github.com/user-attachments/assets/addeb6dd-3c27-4e24-8b4f-0d1c88c6be2a) | ![image](https://github.com/user-attachments/assets/4067f4b1-9674-478a-93eb-583165fae3df)



## Table of Contents

-   [Overview](#overview)
-   [Project Structure](#project-structure)
-   [Architecture](#architecture)
    -   [Application Structure](#application-structure)
    -   [Auth/Fetching Flow](#authfetching-flow)
    -   [Styling Strategy](#styling-strategy)
-   [Environment Variables](#environment-variables)
-   [Installation & Setup](#installation--setup)
-   [Scripts](#scripts)
-   [Dependencies](#dependencies)
-   [Future Plans](#future-plans)
-   [License](#license)

## Overview

My Spotify Profile is a Next.js application that displays a user’s top artists, top tracks, recently played tracks, playlists, and other profile-related data using the Spotify Web API. It authenticates via OAuth, stores tokens in HTTP-only cookies, and renders user data via React Server/Client Components.

Features currently include:

-   Login / Logout via Spotify OAuth
-   Top artists with time-range filtering (e.g., All Time, 6 Months, 4 Weeks) & drill-down artist info (followers, popularity score, etc)
-   Top tracks with time-range filtering (e.g., All Time, 6 Months, 4 Weeks) & drill-down track info (artists, popularity score, etc)
-   Recently played tracks
-   Public playlists followed & drill-down playlist info (individual tracks, owner, etc)
-   Minimal theming with Tailwind + shadcn/ui components

## Project Structure

```
my-spotify-profile
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts       # auth login route
│   │       ├── callback/route.ts    # OAuth callback route
│   │       ├── refresh/route.ts     # refresh token route (in development)
│   │       └── logout/route.ts      # logout route
│   ├── (various pages)              # home (root page.tsx), artists, tracks, recent & playlists
│   ├── layout.tsx                   # root layout
│   ├── globals.css                  # global Tailwind styles
│   ├── components/                  # icons, shadcn/ui components, reusable UI components
│   └── lib/                         # constants, spotify fetch & token functions, utility functions, TS interfaces
├── public/                          # static files, fonts, & favicons
├── .env files                       # environment variables (.local & .production)
├── (various configs)                # config files for tailwind, TS, next, eslint, etc
└── README.md
```

## Architecture

#### Application Structure

-   Next.js (App Router) for server + client rendering
-   TypeScript for type-safe development
-   Spotify OAuth flow via custom /api/auth/login and /api/auth/callback routes
-   Server Components for SSR data loading, Client Components for interactive parts (modals, user click handlers, etc)
-   Cookies (HTTP-only) for storing tokens
-   Tailwind CSS + shadcn/ui for styling and UI components

#### Auth/Fetching Flow

-   user clicks login & is redirected to Spotify OAuth page
-   on success, Spotify calls /api/auth/callback?code={x}
-   access + refresh tokens are stored in HTTP-only cookies
-   root layout & pages read cookies
    -   if none, show login
    -   if exists, call various endpoints
-   on logout (via token expiry or logout click), cookies removed via /api/auth/logout
-   root layout sees no token → skips data calls & shows login page

#### Styling Strategy

-   shadcn/ui for prebuilt UI components (cards, tooltips, etc)
-   tailwind CSS for body/component/utility classes and quick custom styles

## Environment Variables

To run this app, you'll need .env.local & .env.production files with the following values:

```
SPOTIFY_CLIENT_ID=<YOUR_SPOTIFY_CLIENT_ID>
SPOTIFY_CLIENT_SECRET=<YOUR_SPOTIFY_CLIENT_SECRET>
SPOTIFY_REDIRECT_URI=<YOUR_APP_URL>/api/auth/callback
NEXT_PUBLIC_SITE_URL=<YOUR_APP_URL>
```

Required:

-   SPOTIFY_CLIENT_ID: Found in your Spotify Developer Dashboard
-   SPOTIFY_CLIENT_SECRET: Secret key for your Spotify app
-   SPOTIFY_REDIRECT_URI: Must match the callback route (e.g., http://localhost:3000/api/auth/callback)
-   NEXT_PUBLIC_SITE_URL: Base URL for your Next.js site (local or production)

## Installation & Setup

1. Clone the repository:

```
git clone https://github.com/YourUser/spotify-profile.git
cd spotify-profile
```

2. Install dependencies:

```
npm install
```

3. Configure environment variables:

```
SPOTIFY_CLIENT_ID=xxxxx
SPOTIFY_CLIENT_SECRET=xxxxx
SPOTIFY_REDIRECT_URI=xxxxx/api/auth/callback
NEXT_PUBLIC_SITE_URL=xxxxx
```

4. Start the development server (local site usually runs at http://localhost:3000):

```
npm run dev
```

## Scripts

| Script | Description                                            |
| ------ | ------------------------------------------------------ |
| dev    | runs the dev server with hot reloading `(npm run dev)` |
| build  | builds the production-ready Next.js app                |
| start  | starts the production server after building            |
| lint   | runs ESLint over the codebase                          |

## Dependencies

Core

-   Next.js (App Router)
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Spotify Web API (via custom fetch logic)

Additional

-   ESLint for code linting
-   Prettier (optional formatting)

## Future Plans

-   add testing coverage
-   refine token management and add token refresh flow
-   add expansions for user follow lists, user’s saved albums, etc
-   add ability to play songs in-app

## License

This project is public

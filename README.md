# Mangrove

A polished, local-first manga library web app with an extension-ready source architecture. Track your reading, search across catalogs, and keep your library in one place.

## Run locally

```bash
npm install
npm run dev
```

## Features

- Responsive dark reading dashboard
- Library search and status filters
- Reading progress, ratings, favorites, and activity stats
- Extension marketplace UI with enable/disable controls
- Adapter-friendly data model for connecting public manga catalogs
- No account or backend required for the starter app

## Extension architecture

Sources are represented by adapters that can implement search, metadata, and chapter retrieval. The current UI ships with sample manifests in `src/data.ts`; the next step for a production connector is to add a server-side proxy for each public API so browser CORS and rate limits are handled safely.

An extension should expose:

```ts
export type MangaSource = {
  id: string
  name: string
  search(query: string): Promise<Manga[]>
  getManga(id: string): Promise<Manga>
  getChapters(id: string): Promise<Chapter[]>
}
```

> Only connect sources that permit access through their API and respect their terms of service. Avoid bypassing paywalls or access controls.

Built with Vite, React, TypeScript, and CSS.

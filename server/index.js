"use strict"

import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3001
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '../dist')

app.use(cors())
app.use(express.json())

const manga = [
  {
    id: 'apothecary-diaries',
    title: 'The Apothecary Diaries',
    author: 'Natsu Hyūga',
    status: 'Reading',
    chapters: 78,
    read: 62,
    rating: 4.8,
    genres: ['Mystery', 'Drama'],
    source: 'MangaDex',
    color: '#b99b83',
    description: 'A palace apothecary solves the riddles no one else can.',
    updated: '2h ago'
  },
  {
    id: 'frieren',
    title: 'Frieren: Beyond Journey\'s End',
    author: 'Kanehito Yamada',
    status: 'Reading',
    chapters: 140,
    read: 98,
    rating: 4.9,
    genres: ['Fantasy', 'Adventure'],
    source: 'MangaDex',
    color: '#748e9e',
    description: 'A quiet elf mage continues walking after the heroes have gone.',
    updated: 'Yesterday'
  },
  {
    id: 'blue-box',
    title: 'Blue Box',
    author: 'Kouji Miura',
    status: 'Plan to read',
    chapters: 162,
    read: 0,
    rating: 4.5,
    genres: ['Romance', 'Sports'],
    source: 'Comick',
    color: '#668aa4',
    description: 'Two young athletes discover what really matters to them.',
    updated: '3d ago'
  }
]

const extensions = [
  { name: 'MangaDex', icon: '✦', description: 'Open-source manga catalog', version: '1.4.2', enabled: true, color: '#a878f5' },
  { name: 'Comick', icon: '◈', description: 'Community-driven catalog service', version: '2.1.0', enabled: true, color: '#f2a65a' },
  { name: 'AniList', icon: '◉', description: 'Tracker and metadata source', version: '1.0.8', enabled: true, color: '#4c9ee8' },
  { name: 'MangaReader', icon: '▦', description: 'Curated catalog for reader-friendly sources', version: '0.8.4', enabled: false, color: '#ec6d88' }
]

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'mangrove-api', version: '1.0.0' })
})

app.get('/api/manga', (_, res) => {
  res.json(manga)
})

app.get('/api/extensions', (_, res) => {
  res.json(extensions)
})

app.get('/api/manga/:id', (req, res) => {
  const item = manga.find((entry) => entry.id === req.params.id)
  if (!item) {
    return res.status(404).json({ message: 'Manga not found' })
  }
  return res.json(item)
})

app.use(express.static(distPath))

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next()
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Mangrove API running on http://localhost:${port}`)
})

export type Status = 'Reading' | 'Plan to read' | 'Completed' | 'Paused'
export type Manga = {
  id: string; title: string; author: string; status: Status; chapters: number; read: number
  rating: number; genres: string[]; source: string; color: string; description: string; updated: string
}
export type Extension = { name: string; icon: string; description: string; version: string; enabled: boolean; color: string }

export const manga: Manga[] = [
  { id: '1', title: 'The Apothecary Diaries', author: 'Natsu Hyūga', status: 'Reading', chapters: 78, read: 62, rating: 4.8, genres: ['Mystery', 'Drama'], source: 'MangaDex', color: '#b99b83', description: 'In the imperial palace, a clever apothecary quietly solves the mysteries no one else can.', updated: '2h ago' },
  { id: '2', title: 'Frieren: Beyond Journey’s End', author: 'Kanehito Yamada', status: 'Reading', chapters: 140, read: 98, rating: 4.9, genres: ['Fantasy', 'Adventure'], source: 'MangaDex', color: '#748e9e', description: 'An elf mage begins a new journey long after the defeat of the Demon King.', updated: 'Yesterday' },
  { id: '3', title: 'Blue Box', author: 'Kouji Miura', status: 'Plan to read', chapters: 162, read: 0, rating: 4.5, genres: ['Romance', 'Sports'], source: 'Comick', color: '#668aa4', description: 'A badminton player and a basketball star find their dreams—and each other—in the same gym.', updated: '3d ago' },
  { id: '4', title: 'Delicious in Dungeon', author: 'Ryōko Kui', status: 'Completed', chapters: 97, read: 97, rating: 4.7, genres: ['Fantasy', 'Comedy'], source: 'MangaReader', color: '#a77d58', description: 'A party of adventurers cooks its way through a dungeon to save their friend.', updated: '1w ago' },
  { id: '5', title: 'Dandadan', author: 'Yukinobu Tatsu', status: 'Reading', chapters: 168, read: 151, rating: 4.6, genres: ['Action', 'Supernatural'], source: 'AniList', color: '#9b6b81', description: 'Aliens, ghosts, and two teenagers with something to prove collide in a wild supernatural adventure.', updated: '5h ago' },
  { id: '6', title: 'Witch Hat Atelier', author: 'Kamome Shirahama', status: 'Paused', chapters: 82, read: 31, rating: 4.9, genres: ['Fantasy', 'Drama'], source: 'MangaDex', color: '#a394bc', description: 'A young girl discovers that magic is not a gift—it is a craft anyone can learn.', updated: '2w ago' },
]

export const extensions: Extension[] = [
  { name: 'MangaDex', icon: '✦', description: 'The world’s largest open manga catalog', version: '1.4.2', enabled: true, color: '#a878f5' },
  { name: 'Comick', icon: '◈', description: 'Fast, clean, and community powered', version: '2.1.0', enabled: true, color: '#f2a65a' },
  { name: 'AniList', icon: '◉', description: 'Anime and manga tracking metadata', version: '1.0.8', enabled: true, color: '#4c9ee8' },
  { name: 'MangaReader', icon: '▦', description: 'A curated reader-friendly catalog', version: '0.8.4', enabled: false, color: '#ec6d88' },
]

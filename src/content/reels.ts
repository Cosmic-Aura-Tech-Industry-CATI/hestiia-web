import { reels, instagramProfileUrl } from '../data/reels'
export type { Reel } from '../data/reels'

export type ReelItem = {
  id: string
  title: string
  video?: string
  poster: string
  instagramUrl: string
  caption: string
}

export { reels, instagramProfileUrl }

export const REELS: ReelItem[] = reels.map((r) => ({
  id: r.id,
  title: r.title,
  video: r.video,
  poster: r.poster || '',
  instagramUrl: r.link,
  caption: r.caption || '',
}))

import { RESTAURANT } from './restaurant'

export interface ReelItem {
  id: string
  title: string
  video?: string
  poster: string
  instagramUrl: string
  caption: string
}

export const instagramProfileUrl: string =
  RESTAURANT.social.instagram || 'https://www.instagram.com/hestiiarestaurant/'

export const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Slow Simmered Heritage',
    video: '/reels/reel-1.mp4',
    poster: '/reels/reel-1-poster.jpg',
    instagramUrl: 'https://www.instagram.com/hestiiarestaurant/',
    caption: 'Pure ghee tempering & hand-ground heritage spices simmered to perfection.',
  },
  {
    id: 'reel-2',
    title: 'The Sizzling Wok',
    video: '/reels/reel-2.mp4',
    poster: '/reels/reel-2-poster.jpg',
    instagramUrl: 'https://www.instagram.com/hestiiarestaurant/',
    caption: 'High-heat wok tossing fresh garden vegetables for our signature Hakka noodles.',
  },
  {
    id: 'reel-3',
    title: 'Atmospheric Dining Hall',
    video: '/reels/reel-3.mp4',
    poster: '/reels/reel-3-poster.jpg',
    instagramUrl: 'https://www.instagram.com/hestiiarestaurant/',
    caption: 'Warm copper lanterns and peaceful acoustic sanctuary in Shyam Nagar.',
  },
  {
    id: 'reel-4',
    title: 'Royal Vegetarian Feast',
    video: '/reels/reel-4.mp4',
    poster: '/reels/reel-4-poster.jpg',
    instagramUrl: 'https://www.instagram.com/hestiiarestaurant/',
    caption: 'Our Grand Thali assembled with authentic North Indian curries & warm breads.',
  },
  {
    id: 'reel-5',
    title: 'Saffron Badam Kheer',
    video: '/reels/reel-5.mp4',
    poster: '/reels/reel-5-poster.jpg',
    instagramUrl: 'https://www.instagram.com/hestiiarestaurant/',
    caption: 'Rich dairy reduced with Kashmiri saffron, slivered almonds & green cardamom.',
  },
]

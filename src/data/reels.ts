/**
 * HESTIIA REELS DATA CONFIGURATION
 * 
 * HOW TO ADD OR REPLACE A REEL:
 * -------------------------------------------------------------
 * 1. Video files:
 *    - Place your 9:16 vertical MP4 video file in: public/reels/
 *      (e.g., public/reels/reel-1.mp4, public/reels/reel-2.mp4, etc.)
 *    - Paths MUST start with "/" and match the exact filename in public/ (e.g., "/reels/reel-1.mp4").
 * 
 * 2. Poster images (Optional):
 *    - If you add a poster still image in: public/reels/posters/
 *      (e.g., public/reels/posters/reel-1.jpg), set the `poster` property below.
 *    - If omitted, the HTML5 video automatically displays its first frame.
 * 
 * 3. Instagram URL:
 *    - Paste the direct Instagram Reel URL in the `link` property.
 *      This URL opens when visitors click the Instagram icon or the "Watch on Instagram" pill.
 * 
 * 4. Adding or removing reels:
 *    - Simply add or remove objects from the `reels` array below.
 *    - The carousel dynamically adapts to 3, 4, 5, or more reels with no code changes!
 */

export type Reel = {
  id: string
  title: string
  caption?: string
  video: string
  poster?: string
  link: string
}

export const instagramProfileUrl: string = 'https://www.instagram.com/hestiiarestaurant/'

export const reels: Reel[] = [
  {
    id: 'reel-1',
    title: 'Slow Simmered Heritage',
    caption: 'Pure ghee tempering & hand-ground heritage spices simmered to perfection.',
    video: '/reels/reel-1.mp4',
    poster: '/reels/posters/reel-1.webp',
    link: 'https://www.instagram.com/reel/De4LeQYCz1b/?cplk=aXBtdGc0enI3ODN3',
  },
  {
    id: 'reel-2',
    title: 'The Sizzling Wok',
    caption: 'High-heat wok tossing fresh garden vegetables for our signature Hakka noodles.',
    video: '/reels/reel-2.mp4',
    poster: '/reels/posters/reel-2.webp',
    link: 'https://www.instagram.com/reel/Da-S_64CgMh/?xtok=ZW9uZXMwanJpamNp',
  },
  {
    id: 'reel-3',
    title: 'Atmospheric Dining Hall',
    caption: 'Warm copper lanterns and peaceful acoustic sanctuary in Shyam Nagar.',
    video: '/reels/reel-3.mp4',
    poster: '/reels/posters/reel-3.webp',
    link: 'https://www.instagram.com/reel/DcOGstzNno5/?vrfl=MTQybTJncTM3dzV0Yw==',
  },
  {
    id: 'reel-4',
    title: 'Royal Vegetarian Feast',
    caption: 'Our Grand Thali assembled with authentic North Indian curries & warm breads.',
    video: '/reels/reel-4.mp4',
    poster: '/reels/posters/reel-4.webp',
    link: 'https://www.instagram.com/reel/DdY4AgUiiFj/?psln=MTh6YmJpdjR0OG05OQ==',
  },
  {
    id: 'reel-5',
    title: 'Saffron Badam Kheer',
    caption: 'Rich dairy reduced with Kashmiri saffron, slivered almonds & green cardamom.',
    video: '/reels/reel-5.mp4',
    poster: '/reels/posters/reel-5.webp',
    link: 'https://www.instagram.com/reel/DSU8DkWkgjv/?dlrf=MTVqamdycWRxY2sxYw==',
  },
]

import type { Metadata } from 'next'
import GalleryView from '../../views/Gallery'

export const metadata: Metadata = {
  title: 'Ambience & Food Gallery',
  description:
    'Explore the visual gallery of Hestiia Restaurant Kanpur. From handcrafted vegetarian thalis and paneer curries to warm interior tablescapes.',
}

export default function GalleryPage() {
  return <GalleryView />
}

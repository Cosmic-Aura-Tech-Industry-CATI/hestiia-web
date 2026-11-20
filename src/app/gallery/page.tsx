import type { Metadata } from 'next'
import GalleryView from '../../views/Gallery'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Ambience & Food Gallery | Hestiia Restaurant Kanpur',
  description:
    'Explore the ambience and culinary gallery of Hestiia Restaurant in Shyam Nagar, Kanpur. From handcrafted vegetarian thalis and paneer curries to warm lantern-lit dining interiors.',
  alternates: {
    canonical: '/gallery',
  },
  keywords: [
    'Hestiia photos',
    'restaurant interior Shyam Nagar',
    'food photos Kanpur',
    'pure veg ambience Kanpur',
  ],
  openGraph: {
    title: 'Ambience & Food Gallery | Hestiia Restaurant Kanpur',
    description: 'A glimpse inside the dining sanctuary and handcrafted dishes of Hestiia.',
    url: 'https://hestiiarestaurant.com/gallery',
  },
}

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
        ]}
      />
      <GalleryView />
    </>
  )
}

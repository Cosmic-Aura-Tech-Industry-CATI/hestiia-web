import type { Metadata } from 'next'
import DishDetailView from '../../../views/DishDetail'
import { DISHES } from '../../../content/menu'
import BreadcrumbJsonLd from '../../../components/seo/BreadcrumbJsonLd'

const BASE_URL = 'https://hestiiarestaurant.com'

export function generateStaticParams() {
  return DISHES.map((dish) => ({ slug: dish.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const dish = DISHES.find((d) => d.slug === slug || d.id === slug)

  if (!dish) {
    return {
      title: 'Dish Not Found | Hestiia Restaurant Kanpur',
      description: 'Explore pure vegetarian dishes at Hestiia Restaurant Kanpur.',
    }
  }

  const imageUrl = dish.image?.src ? `${BASE_URL}${dish.image.src}` : `${BASE_URL}/brand/logo.webp`

  return {
    title: `${dish.name} — Pure Vegetarian Kanpur | Hestiia Restaurant`,
    description: `${dish.name}: ₹${dish.price}. ${dish.description} Crafted fresh at Hestiia Restaurant, Shyam Nagar, Kanpur.`,
    alternates: {
      canonical: `${BASE_URL}/menu/${dish.slug}`,
    },
    openGraph: {
      title: `${dish.name} — 100% Pure Vegetarian | Hestiia Restaurant Kanpur`,
      description: dish.description,
      url: `${BASE_URL}/menu/${dish.slug}`,
      images: [
        {
          url: imageUrl,
          alt: `${dish.name} - Pure Vegetarian Dining at Hestiia Kanpur`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dish.name} | Hestiia Restaurant Kanpur`,
      description: `${dish.description} · ₹${dish.price}`,
      images: [imageUrl],
    },
  }
}

export default async function DishDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dish = DISHES.find((d) => d.slug === slug || d.id === slug)

  const dishJsonLd = dish
    ? {
        '@context': 'https://schema.org',
        '@type': 'MenuItem',
        name: dish.name,
        description: dish.detail?.story || dish.description,
        image: dish.image?.src ? `${BASE_URL}${dish.image.src}` : undefined,
        suitableForDiet: 'https://schema.org/VegetarianDiet',
        offers: {
          '@type': 'Offer',
          price: dish.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@id': `${BASE_URL}/#restaurant`,
          },
        },
      }
    : null

  return (
    <>
      {dish && (
        <>
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', url: '/' },
              { name: 'Menu', url: '/menu' },
              { name: dish.name, url: `/menu/${dish.slug}` },
            ]}
          />
          {dishJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(dishJsonLd) }}
            />
          )}
        </>
      )}
      <DishDetailView />
    </>
  )
}

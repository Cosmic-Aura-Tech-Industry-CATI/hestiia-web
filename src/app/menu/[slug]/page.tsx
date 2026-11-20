import type { Metadata } from 'next'
import DishDetailView from '../../../views/DishDetail'
import { DISHES } from '../../../content/menu'

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

  return {
    title: dish ? `${dish.name} — Pure Vegetarian | Hestiia Restaurant` : 'Dish Not Found',
    description: dish ? dish.description : 'Explore pure vegetarian dishes at Hestiia Restaurant Kanpur.',
  }
}

export default function DishDetailPage() {
  return <DishDetailView />
}

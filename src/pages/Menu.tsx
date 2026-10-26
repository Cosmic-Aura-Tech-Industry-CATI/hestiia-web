import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import MenuPreview from '../components/MenuPreview'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Menu() {
  useDocumentMeta(
    'Pure Vegetarian Menu (193 Dishes)',
    'Browse 193 pure vegetarian dishes at Hestiia Restaurant Kanpur across 21 categories: North Indian curries, Indo-Chinese wok, snacks, breads, and desserts.'
  )

  return (
    <>
      <PageHero
        title="Complete Pure Vegetarian"
        accentWord="Menu"
        intro="193 authentic culinary selections arranged across 21 disciplines, prepared daily with pure vegetarian ingredients."
        currentPage="Menu"
      />

      <div style={{ paddingBottom: '32px' }}>
        <MenuPreview />
      </div>

      <PageClosingCta
        title="Ready to Taste Our"
        accentWord="Creations?"
        subtitle="Call directly for table reservations or takeaway orders from our Shyam Nagar kitchen."
      />
    </>
  )
}

import type { Metadata } from 'next'
import NotFoundView from '../views/NotFound'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The requested page or dish path could not be found at Hestiia Restaurant Kanpur.',
}

export default function NotFoundPage() {
  return <NotFoundView />
}

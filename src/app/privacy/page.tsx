import type { Metadata } from 'next'
import PrivacyView from '../../views/Privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy | Hestiia Restaurant',
  description:
    'How Hestiia Restaurant safeguards guest information and dining reservation confidentiality.',
}

export default function PrivacyPage() {
  return <PrivacyView />
}

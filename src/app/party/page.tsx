import { redirect } from 'next/navigation'

export default function PartyPage() {
  redirect('/contact?type=party')
}

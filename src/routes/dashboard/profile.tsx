import { createFileRoute } from '@tanstack/react-router'
import ProfileCard from '../../components/dashboard/ProfileCard'
import { documentTitle } from '../../components/layout/navConfig'
import { MOCK_PROFILE } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/profile')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard/profile') }] }),
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="space-y-4">
      <p className="m-0 text-sm text-[var(--sea-ink-soft)]">Your member details, read-only for now. Sample profile — not a real account.</p>
      <ProfileCard profile={MOCK_PROFILE} />
    </div>
  )
}

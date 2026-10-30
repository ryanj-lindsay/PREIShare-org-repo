import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/profile')({
  head: () => ({ meta: [{ title: 'Profile · PREIshare' }] }),
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-[var(--sea-ink)]">Profile</h1>
      <p className="m-0 text-[var(--sea-ink-soft)]">Your member details: name, email, membership tier, and contact preference.</p>
    </section>
  )
}

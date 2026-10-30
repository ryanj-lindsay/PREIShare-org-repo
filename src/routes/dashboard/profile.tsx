import { createFileRoute } from '@tanstack/react-router'
import { documentTitle } from '../../components/layout/navConfig'

export const Route = createFileRoute('/dashboard/profile')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard/profile') }] }),
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <section>
      <p className="m-0 text-[var(--sea-ink-soft)]">Your member details: name, email, membership tier, and contact preference.</p>
    </section>
  )
}

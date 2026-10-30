import { createFileRoute } from '@tanstack/react-router'
import { documentTitle } from '../../components/layout/navConfig'

export const Route = createFileRoute('/dashboard/')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard') }] }),
  component: DashboardHomePage,
})

function DashboardHomePage() {
  return (
    <section>
      <p className="m-0 text-[var(--sea-ink-soft)]">Your portfolio snapshot and recent activity will appear here.</p>
    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  head: () => ({ meta: [{ title: 'Overview · PREIshare' }] }),
  component: DashboardHomePage,
})

function DashboardHomePage() {
  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-[var(--sea-ink)]">Overview</h1>
      <p className="m-0 text-[var(--sea-ink-soft)]">Your portfolio snapshot and recent activity will appear here.</p>
    </section>
  )
}

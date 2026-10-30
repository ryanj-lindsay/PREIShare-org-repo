import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/deals')({
  head: () => ({ meta: [{ title: 'Deals · PREIshare' }] }),
  component: DealsPage,
})

function DealsPage() {
  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-[var(--sea-ink)]">Deals</h1>
      <p className="m-0 text-[var(--sea-ink-soft)]">Open deals you can review, with minimums and how close they are to closing.</p>
    </section>
  )
}

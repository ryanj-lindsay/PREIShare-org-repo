import { createFileRoute } from '@tanstack/react-router'
import { documentTitle } from '../../components/layout/navConfig'

export const Route = createFileRoute('/dashboard/deals')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard/deals') }] }),
  component: DealsPage,
})

function DealsPage() {
  return (
    <section>
      <p className="m-0 text-[var(--sea-ink-soft)]">Open deals you can review, with minimums and how close they are to closing.</p>
    </section>
  )
}

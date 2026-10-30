import { createFileRoute } from '@tanstack/react-router'
import DealsList from '../../components/dashboard/DealsList'
import { documentTitle } from '../../components/layout/navConfig'
import { MOCK_DEALS } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/deals')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard/deals') }] }),
  component: DealsPage,
})

function DealsPage() {
  return (
    <div className="space-y-4">
      <p className="m-0 text-sm text-[var(--sea-ink-soft)]">Deals currently taking investments. Sample deals — not live offerings.</p>
      <DealsList deals={MOCK_DEALS} />
    </div>
  )
}

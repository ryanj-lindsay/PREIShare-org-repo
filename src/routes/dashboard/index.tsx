import { createFileRoute } from '@tanstack/react-router'
import PortfolioSummary from '../../components/dashboard/PortfolioSummary'
import RecentActivity from '../../components/dashboard/RecentActivity'
import StatsCard from '../../components/dashboard/StatsCard'
import { documentTitle } from '../../components/layout/navConfig'
import { MOCK_ACTIVITY, MOCK_DEALS, MOCK_HOLDINGS } from '../../data/mock-dashboard'
import { formatUsd } from '../../lib/format'

export const Route = createFileRoute('/dashboard/')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard') }] }),
  component: DashboardHomePage,
})

function DashboardHomePage() {
  const totalInvested = MOCK_HOLDINGS.reduce((sum, holding) => sum + holding.invested, 0)
  const currentValue = MOCK_HOLDINGS.reduce((sum, holding) => sum + holding.currentValue, 0)
  const activeCount = MOCK_HOLDINGS.filter((holding) => holding.status === 'Active').length

  return (
    <div className="space-y-6">
      <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
        Sample figures for a mock investor — not a live balance.
      </p>

      <section aria-label="Portfolio at a glance" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total invested" value={formatUsd(totalInvested)} note="Across every holding" />
        <StatsCard label="Current value" value={formatUsd(currentValue)} note="Latest quarterly estimate" />
        <StatsCard label="Active investments" value={String(activeCount)} note={`${MOCK_HOLDINGS.length} holdings in total`} />
        <StatsCard label="Open deals" value={String(MOCK_DEALS.length)} note="Taking investments now" />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <PortfolioSummary holdings={MOCK_HOLDINGS} />
        <RecentActivity items={MOCK_ACTIVITY} />
      </div>
    </div>
  )
}

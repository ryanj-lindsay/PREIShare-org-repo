import { createFileRoute } from '@tanstack/react-router'
import PortfolioTable from '../../components/dashboard/PortfolioTable'
import { documentTitle } from '../../components/layout/navConfig'
import { MOCK_HOLDINGS } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/portfolio')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard/portfolio') }] }),
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <div className="space-y-4">
      <p className="m-0 text-sm text-[var(--sea-ink-soft)]">Every property you hold a share of. Sample data — not your live portfolio.</p>
      <PortfolioTable holdings={MOCK_HOLDINGS} />
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { documentTitle } from '../../components/layout/navConfig'

export const Route = createFileRoute('/dashboard/portfolio')({
  head: () => ({ meta: [{ title: documentTitle('/dashboard/portfolio') }] }),
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <section>
      <p className="m-0 text-[var(--sea-ink-soft)]">Every property you hold, with what you invested and what it is worth now.</p>
    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/portfolio')({
  head: () => ({ meta: [{ title: 'Portfolio · PREIshare' }] }),
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-[var(--sea-ink)]">Portfolio</h1>
      <p className="m-0 text-[var(--sea-ink-soft)]">Every property you hold, with what you invested and what it is worth now.</p>
    </section>
  )
}

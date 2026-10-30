import { Outlet, createFileRoute } from '@tanstack/react-router'

// Parent layout route for every investor page under /dashboard.
// It renders the matching child page in <Outlet />; the shared AppShell
// (sidebar, header, main area) wraps this outlet in a later step.
export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="page-wrap px-4 pb-8 pt-10">
      <Outlet />
    </div>
  )
}

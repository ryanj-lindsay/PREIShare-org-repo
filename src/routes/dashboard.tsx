import { Outlet, createFileRoute } from '@tanstack/react-router'
import AppShell from '../components/layout/AppShell'

// Parent layout route for every investor page under /dashboard: the AppShell
// (sidebar, header, main area) is written once here and wraps each child page,
// which renders in <Outlet />.
export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

/** The URLs of the four investor dashboard areas — the only pages under /dashboard. */
export type DashboardPath =
  | '/dashboard'
  | '/dashboard/portfolio'
  | '/dashboard/deals'
  | '/dashboard/profile'

/** One dashboard area: what the link says, where it goes, and the heading its page shows. */
export interface NavItem {
  /** Short link text in the sidebar. */
  label: string
  /** Route the link opens. */
  path: DashboardPath
  /** Page heading in the dashboard header and in the browser tab. */
  title: string
}

/**
 * The single list of dashboard destinations. NavItems builds the sidebar links from it
 * and the Header takes its title from it, so labels, paths, and titles never drift apart.
 */
export const navConfig: readonly NavItem[] = [
  { label: 'Home', path: '/dashboard', title: 'Your dashboard' },
  { label: 'Portfolio', path: '/dashboard/portfolio', title: 'Your portfolio' },
  { label: 'Deals', path: '/dashboard/deals', title: 'Open deals' },
  { label: 'Profile', path: '/dashboard/profile', title: 'Your profile' },
]

/** The nav item for a URL path (a trailing slash is ignored), or undefined if it is not a dashboard page. */
export function findNavItem(pathname: string): NavItem | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return navConfig.find((item) => item.path === path)
}

/** Browser tab title for a dashboard page, for example "Open deals · PREIshare". */
export function documentTitle(path: DashboardPath): string {
  return `${findNavItem(path)?.title ?? 'Investor dashboard'} · PREIshare`
}

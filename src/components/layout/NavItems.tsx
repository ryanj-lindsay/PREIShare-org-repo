import { Link } from '@tanstack/react-router'
import { navConfig } from './navConfig'

/**
 * The dashboard links, built from navConfig. The link for the current page gets the
 * "is-active" style and aria-current="page". Matching is exact, so Home is active only
 * on /dashboard itself, not on every page nested under it.
 */
export default function NavItems() {
  return (
    <ul className="m-0 flex list-none gap-1 p-0">
      {navConfig.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            activeOptions={{ exact: true }}
            className="nav-link"
            activeProps={{ className: 'nav-link is-active', 'aria-current': 'page' }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

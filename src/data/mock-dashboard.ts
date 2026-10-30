// MOCK DATA for the investor dashboard shell — every value here is made up.
// Nothing in this file comes from a database or API; a later sprint replaces these
// constants with live data. Money is whole US dollars, dates are ISO 8601.

/** Where one of the investor's holdings is. */
export type HoldingStatus = 'Active' | 'Pending' | 'Exited'

/** One property the investor holds a share of. */
export interface Holding {
  id: string
  property: string
  propertyType: string
  location: string
  invested: number
  currentValue: number
  status: HoldingStatus
}

/** Whether a deal is still taking investments. */
export type DealStatus = 'Open' | 'Closing soon'

/** One deal open to investors. */
export interface Deal {
  id: string
  name: string
  location: string
  propertyType: string
  minimumInvestment: number
  targetRaise: number
  status: DealStatus
}

/** One entry in the investor's recent activity. */
export interface ActivityItem {
  id: string
  date: string
  description: string
  /** Money moved, if any: positive is money in to the investor, negative is money out. */
  amount?: number
}

/** The signed-in investor's read-only profile. */
export interface InvestorProfile {
  fullName: string
  email: string
  membershipTier: string
  contactPreference: string
  memberSince: string
  notes: string
}

export const MOCK_HOLDINGS: readonly Holding[] = [
  {
    id: 'hld_maple',
    property: 'Maple Street Duplex',
    propertyType: 'Multi-family',
    location: 'Springfield, IL',
    invested: 25000,
    currentValue: 27400,
    status: 'Active',
  },
  {
    id: 'hld_main3rd',
    property: 'Main & 3rd Mixed-Use Building',
    propertyType: 'Mixed use',
    location: 'Boise, ID',
    invested: 50000,
    currentValue: 53100,
    status: 'Active',
  },
  {
    id: 'hld_summit',
    property: 'Summit Office Suites',
    propertyType: 'Commercial',
    location: 'Denver, CO',
    invested: 100000,
    currentValue: 112500,
    status: 'Active',
  },
  {
    id: 'hld_cedar',
    property: 'Cedar Lane Starter Home',
    propertyType: 'Single-family',
    location: 'Columbus, OH',
    invested: 10000,
    currentValue: 10000,
    status: 'Pending',
  },
]

export const MOCK_DEALS: readonly Deal[] = [
  {
    id: 'deal_riverside',
    name: 'Riverside Fourplex',
    location: 'Boise, ID',
    propertyType: 'Multi-family',
    minimumInvestment: 10000,
    targetRaise: 600000,
    status: 'Open',
  },
  {
    id: 'deal_harbor',
    name: 'Harbor Point Condos',
    location: 'Boston, MA',
    propertyType: 'Condo',
    minimumInvestment: 25000,
    targetRaise: 1200000,
    status: 'Closing soon',
  },
  {
    id: 'deal_oak',
    name: 'Oak Street Retail Center',
    location: 'Columbus, OH',
    propertyType: 'Commercial',
    minimumInvestment: 50000,
    targetRaise: 900000,
    status: 'Open',
  },
]

export const MOCK_ACTIVITY: readonly ActivityItem[] = [
  { id: 'act_1', date: '2026-10-28', description: 'Distribution paid — Summit Office Suites', amount: 1250 },
  { id: 'act_2', date: '2026-10-22', description: 'New deal opened — Riverside Fourplex' },
  { id: 'act_3', date: '2026-10-15', description: 'Investment made — Cedar Lane Starter Home', amount: -10000 },
  { id: 'act_4', date: '2026-10-01', description: 'Quarterly value update for all holdings' },
]

export const MOCK_PROFILE: InvestorProfile = {
  fullName: 'Sam Taylor',
  email: 'sam.taylor@example.com',
  membershipTier: 'Accredited investor',
  contactPreference: 'Email',
  memberSince: '2024-03-12',
  notes: 'Prefers multi-family and mixed-use properties in the Mountain West.',
}

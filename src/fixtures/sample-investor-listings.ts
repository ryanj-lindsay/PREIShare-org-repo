// Sample investor listings that must satisfy InvestorListing — one per status.
// Plain object literals with a `: InvestorListing` annotation and no `as` casts, so a
// sample that breaks a rule fails the typecheck instead of being waved through.
// All names, addresses, emails, and numbers are made up.

import type { InvestorListing } from '../types'

/** Active multi-family listing with every optional field filled in. */
export const sampleActiveListing: InvestorListing = {
  id: 'lst_8f3k2m',
  title: 'Maple Street Duplex',
  description: 'Two-unit duplex near the university, both units leased.',
  askingPrice: 425000,
  status: 'active',
  propertyType: 'multi_family',
  address: {
    street: '1420 Maple Street',
    city: 'Springfield',
    state: 'IL',
    postalCode: '62704',
    country: 'US',
  },
  financials: {
    currency: 'USD',
    minimumInvestment: 25000,
    estimatedMonthlyRent: 3400,
    annualPropertyTax: 7800,
    monthlyHoaFee: 0,
  },
  contacts: [
    {
      id: 'ct_jrivera',
      fullName: 'Jordan Rivera',
      role: 'listing_agent',
      email: 'jordan.rivera@example.com',
      phone: '555-0142',
    },
    {
      id: 'ct_cmorgan',
      fullName: 'Casey Morgan',
      role: 'property_manager',
      email: 'casey.morgan@example.com',
    },
  ],
  primaryContactId: 'ct_jrivera',
  ownership: {
    ownerName: 'Maple Street Holdings LLC',
    owners: [{ name: 'Maple Street Holdings LLC', ownerType: 'llc', sharePercent: 100 }],
    acquiredDate: '2019-06-14',
  },
  createdAt: '2026-10-01T09:00:00Z',
  updatedAt: '2026-10-18T16:45:00Z',
}

/** Draft condo listing: optional description and most financial metrics still unknown. */
export const sampleDraftListing: InvestorListing = {
  id: 'lst_2q9w7c',
  title: 'Lakeview Condo 4B',
  askingPrice: 289000,
  status: 'draft',
  propertyType: 'condo',
  address: {
    street: '77 Harbor Drive',
    unit: 'Unit 4B',
    city: 'Boston',
    state: 'MA',
    postalCode: '02134',
    country: 'US',
  },
  financials: {
    currency: 'USD',
    monthlyHoaFee: 410,
  },
  contacts: [
    {
      id: 'ct_pnguyen',
      fullName: 'Priya Nguyen',
      role: 'listing_agent',
      email: 'priya.nguyen@example.com',
    },
  ],
  primaryContactId: 'ct_pnguyen',
  ownership: {
    ownerName: 'Dana Whitfield',
    owners: [{ name: 'Dana Whitfield', ownerType: 'individual', sharePercent: 100 }],
  },
  createdAt: '2026-10-22T13:10:00Z',
  updatedAt: '2026-10-22T13:10:00Z',
}

/** Single-family listing waiting for reviewer approval; ZIP+4 postal code. */
export const sampleInReviewListing: InvestorListing = {
  id: 'lst_5h1n4r',
  title: 'Cedar Lane Starter Home',
  description: 'Three-bedroom ranch with a fenced yard, recently re-roofed.',
  askingPrice: 214000,
  status: 'in_review',
  propertyType: 'single_family',
  address: {
    street: '903 Cedar Lane',
    city: 'Columbus',
    state: 'OH',
    postalCode: '43215-1102',
    country: 'US',
  },
  financials: {
    currency: 'USD',
    minimumInvestment: 10000,
    estimatedMonthlyRent: 1650,
    annualPropertyTax: 3900,
  },
  contacts: [
    {
      id: 'ct_mokafor',
      fullName: 'Maya Okafor',
      role: 'sponsor',
      email: 'maya.okafor@example.com',
      phone: '555-0177',
    },
  ],
  primaryContactId: 'ct_mokafor',
  ownership: {
    ownerName: 'Bell Family Trust',
    owners: [{ name: 'Bell Family Trust', ownerType: 'trust', sharePercent: 100 }],
    acquiredDate: '2011-03-02',
  },
  createdAt: '2026-10-12T08:30:00Z',
  updatedAt: '2026-10-25T11:05:00Z',
}

/** Mixed-use building under contract, owned by a partnership split two ways. */
export const sampleUnderContractListing: InvestorListing = {
  id: 'lst_7t3v8p',
  title: 'Main & 3rd Mixed-Use Building',
  description: 'Ground-floor retail with four apartments above.',
  askingPrice: 1180000,
  status: 'under_contract',
  propertyType: 'mixed_use',
  address: {
    street: '301 Main Street',
    city: 'Boise',
    state: 'ID',
    postalCode: '83702',
    country: 'US',
  },
  financials: {
    currency: 'USD',
    minimumInvestment: 50000,
    estimatedMonthlyRent: 9800,
    annualPropertyTax: 16400,
  },
  contacts: [
    {
      id: 'ct_lbrooks',
      fullName: 'Lena Brooks',
      role: 'sponsor',
      email: 'lena.brooks@example.com',
      phone: '555-0193',
    },
    {
      id: 'ct_tsato',
      fullName: 'Taro Sato',
      role: 'listing_agent',
      email: 'taro.sato@example.com',
    },
  ],
  primaryContactId: 'ct_lbrooks',
  ownership: {
    ownerName: 'Main & Third Partners',
    owners: [
      { name: 'Ellis Capital Partners', ownerType: 'partnership', sharePercent: 60 },
      { name: 'Ruiz Holdings Corp', ownerType: 'corporation', sharePercent: 40 },
    ],
    acquiredDate: '2016-09-30',
  },
  createdAt: '2026-08-04T10:00:00Z',
  updatedAt: '2026-10-27T15:20:00Z',
}

/** Commercial listing whose deal completed; the closed branch requires closedAt. */
export const sampleClosedListing: InvestorListing = {
  id: 'lst_9k6d2s',
  title: 'Summit Office Suites',
  askingPrice: 2750000,
  status: 'closed',
  propertyType: 'commercial',
  address: {
    street: '1 Summit Plaza',
    unit: 'Suite 200',
    city: 'Denver',
    state: 'CO',
    postalCode: '80202',
    country: 'US',
  },
  financials: {
    currency: 'USD',
    minimumInvestment: 100000,
    annualPropertyTax: 41200,
  },
  contacts: [
    {
      id: 'ct_achen',
      fullName: 'Alex Chen',
      role: 'listing_agent',
      email: 'alex.chen@example.com',
    },
  ],
  primaryContactId: 'ct_achen',
  ownership: {
    ownerName: 'Summit Office LLC',
    owners: [{ name: 'Summit Office LLC', ownerType: 'llc', sharePercent: 100 }],
  },
  createdAt: '2026-05-15T09:00:00Z',
  updatedAt: '2026-09-30T18:00:00Z',
  closedAt: '2026-09-30T17:30:00Z',
}

/** Townhouse taken off the market before closing; kept for history with no closing date. */
export const sampleWithdrawnListing: InvestorListing = {
  id: 'lst_3m8x5b',
  title: 'Birch Row Townhouse',
  askingPrice: 335000,
  status: 'withdrawn',
  propertyType: 'townhouse',
  address: {
    street: '18 Birch Row',
    city: 'Raleigh',
    state: 'NC',
    postalCode: '27601',
    country: 'US',
  },
  financials: {
    currency: 'USD',
    estimatedMonthlyRent: 2100,
    monthlyHoaFee: 150,
  },
  contacts: [
    {
      id: 'ct_jpark',
      fullName: 'Jamie Park',
      role: 'property_manager',
      email: 'jamie.park@example.com',
      phone: '555-0128',
    },
  ],
  primaryContactId: 'ct_jpark',
  ownership: {
    ownerName: 'Morgan & Lee',
    owners: [
      { name: 'Riley Morgan', ownerType: 'individual', sharePercent: 50 },
      { name: 'Sam Lee', ownerType: 'individual', sharePercent: 50 },
    ],
    acquiredDate: '2021-04-19',
  },
  createdAt: '2026-07-01T12:00:00Z',
  updatedAt: '2026-08-15T09:45:00Z',
}

/** Every valid sample above, one per status. */
export const sampleInvestorListings: InvestorListing[] = [
  sampleDraftListing,
  sampleInReviewListing,
  sampleActiveListing,
  sampleUnderContractListing,
  sampleClosedListing,
  sampleWithdrawnListing,
]

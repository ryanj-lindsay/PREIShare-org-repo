import type { InvestorProfile } from '../../data/mock-dashboard'
import { formatDate } from '../../lib/format'

export interface ProfileCardProps {
  profile: InvestorProfile
}

/** The investor's member details, read-only. Editing comes in a later sprint. */
export default function ProfileCard({ profile }: ProfileCardProps) {
  const fields: [label: string, value: string][] = [
    ['Email', profile.email],
    ['Membership', profile.membershipTier],
    ['Contact preference', profile.contactPreference],
    ['Member since', formatDate(profile.memberSince)],
    ['Notes', profile.notes],
  ]

  return (
    <article className="island-shell max-w-2xl rounded-2xl p-5" aria-labelledby="profile-name">
      <h2 id="profile-name" className="mb-4 mt-0 text-lg font-semibold text-[var(--sea-ink)]">
        {profile.fullName}
      </h2>
      <dl className="m-0 grid gap-3 text-sm sm:grid-cols-[12rem_minmax(0,1fr)]">
        {fields.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-[var(--sea-ink-soft)]">{label}</dt>
            <dd className="m-0 text-[var(--sea-ink)]">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

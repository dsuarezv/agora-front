import { Link } from 'react-router-dom'

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatDate(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function pathToId(path) {
  return path.replace(/\.json$/, '')
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BoletinCard({ item, activeKeywords = new Set() }) {
  const displayTitle = item.visible_title || item.title
  const hasVisibleTitle = Boolean(item.visible_title)
  const href = `/boletin/${pathToId(item.url)}`

  return (
    <Link
      to={href}
      className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-7 flex flex-col gap-4 hover:shadow-[0_20px_40px_rgba(24,28,30,0.07)] hover:border-primary/20 transition-all duration-300"
    >
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-primary text-on-primary px-2.5 py-0.5 rounded text-[10px] font-headline font-black uppercase tracking-widest">
          {item.rank?.replace(/-/g, '\u2011') ?? '—'}
        </span>
        <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded text-[10px] font-headline font-bold tracking-tight">
          {item.identifier}
        </span>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h2 className="font-headline text-lg font-black text-on-surface group-hover:text-primary transition-colors leading-snug mb-1">
          {displayTitle}
        </h2>
        {hasVisibleTitle && (
          <p className="font-body italic text-secondary text-sm leading-snug line-clamp-2">
            {item.title}
          </p>
        )}
      </div>

      {/* Department */}
      <div className="flex items-center gap-1.5 text-secondary">
        <span className="material-symbols-outlined text-[16px]">account_balance</span>
        <span className="font-headline text-xs font-bold uppercase tracking-tight truncate">
          {item.department}
        </span>
      </div>

      {/* Dates */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-outline-variant/20 pt-3.5">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-headline">
          <span className="material-symbols-outlined text-[14px] text-outline">calendar_today</span>
          <span className="text-outline font-bold uppercase tracking-tight">Pub.</span>
          <span>{formatDate(item.publication_date)}</span>
        </div>
        {item.last_updated && (
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-headline">
            <span className="material-symbols-outlined text-[14px] text-outline">update</span>
            <span className="text-outline font-bold uppercase tracking-tight">Act.</span>
            <span>{formatDate(item.last_updated)}</span>
          </div>
        )}
      </div>

      {/* Keywords */}
      {item.keywords?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.keywords.map((kw) => {
            const isActive = activeKeywords.has(kw)
            return (
              <span
                key={kw}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-headline transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {kw}
              </span>
            )
          })}
        </div>
      )}

      {/* Arrow */}
      <div className="flex justify-end -mt-1">
        <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">
          arrow_forward
        </span>
      </div>
    </Link>
  )
}

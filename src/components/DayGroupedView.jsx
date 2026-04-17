import { useRef, useState, useMemo, useEffect, useLayoutEffect } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import BoletinCard from './BoletinCard'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function groupByDate(items) {
  const map = new Map()
  for (const item of items) {
    const date = item.publication_date ?? ''
    if (!map.has(date)) map.set(date, [])
    map.get(date).push(item)
  }
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, items]) => ({ date, items }))
}

function formatDayLabel(dateStr) {
  if (!dateStr) return 'Sin fecha'
  const [y, m, d] = dateStr.split('-')
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d)).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

const DOW = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

function CalendarNav({ dateSet, currentActiveDate, onSelectDate }) {
  const parseMonthYear = (dateStr) => {
    if (dateStr && dateStr !== '') {
      const [y, m] = dateStr.split('-')
      return { year: parseInt(y), month: parseInt(m) - 1 }
    }
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  }

  const initial = useMemo(() => parseMonthYear(currentActiveDate), []) // eslint-disable-line react-hooks/exhaustive-deps
  const [viewYear, setViewYear] = useState(initial.year)
  const [viewMonth, setViewMonth] = useState(initial.month)
  const userNavigating = useRef(false)
  const navTimeout = useRef(null)

  // Follow active date unless user is manually browsing calendar months
  useEffect(() => {
    if (!userNavigating.current && currentActiveDate && currentActiveDate !== '') {
      const { year, month } = parseMonthYear(currentActiveDate)
      setViewYear(year)
      setViewMonth(month)
    }
  }, [currentActiveDate])

  const goMonth = (delta) => {
    userNavigating.current = true
    clearTimeout(navTimeout.current)
    navTimeout.current = setTimeout(() => { userNavigating.current = false }, 5000)

    setViewMonth((m) => {
      let nm = m + delta
      let ny = viewYear
      if (nm < 0) { nm = 11; ny-- }
      if (nm > 11) { nm = 0; ny++ }
      setViewYear(ny)
      return nm
    })
  }

  // Build calendar grid (Monday-first)
  const firstOfMonth = new Date(viewYear, viewMonth, 1)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const startDow = (firstOfMonth.getDay() + 6) % 7

  const cells = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const monthLabel = firstOfMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  // Count docs per day in this month for the count badge
  const dayCounts = useMemo(() => {
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-`
    const counts = {}
    for (const date of dateSet) {
      if (date.startsWith(prefix)) {
        const d = parseInt(date.slice(8))
        counts[d] = true
      }
    }
    return counts
  }, [dateSet, viewYear, viewMonth])

  return (
    <div className="sticky top-[10.5rem] w-56 mt-14 flex-shrink-0 self-start hidden lg:block">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-4 shadow-sm">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => goMonth(-1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <span className="font-headline font-bold text-sm capitalize text-on-surface select-none">
            {monthLabel}
          </span>
          <button
            onClick={() => goMonth(1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 mb-0.5">
          {DOW.map((d) => (
            <div
              key={d}
              className="text-center text-[9px] font-headline font-black text-outline uppercase py-1 select-none"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} className="h-7" />
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const hasDocs = dayCounts[day]
            const isActive = dateStr === currentActiveDate

            return (
              <button
                key={dateStr}
                disabled={!hasDocs}
                onClick={() => hasDocs && onSelectDate(dateStr)}
                title={hasDocs ? formatDayLabel(dateStr) : undefined}
                className={`
                  relative h-7 w-full text-xs font-headline font-bold rounded-lg transition-all
                  ${isActive
                    ? 'bg-primary text-on-primary'
                    : hasDocs
                    ? 'text-on-surface hover:bg-primary/10 hover:text-primary cursor-pointer'
                    : 'text-outline/35 cursor-default'}
                `}
              >
                {day}
                {hasDocs && !isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/50" />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-outline-variant/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
          <span className="text-[10px] font-headline text-outline">Con boletines</span>
        </div>
      </div>
    </div>
  )
}

// ─── Day Group ────────────────────────────────────────────────────────────────

function DayGroup({ date, items, activeKeywords }) {
  return (
    <div className="pb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-headline font-black text-2xl uppercase pl-2 text-secondary capitalize whitespace-nowrap">
          {formatDayLabel(date)}
        </h2>
        <div className="h-px flex-1 bg-outline-variant/20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => (
          <BoletinCard key={item.identifier} item={item} activeKeywords={activeKeywords} />
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

// Estimate height: each card row ~320px, group header ~72px
function estimateGroupHeight(itemCount) {
  const rows = Math.ceil(itemCount / 3)
  return rows * 320 + 72
}

export default function DayGroupedView({ items, activeKeywords }) {
  const dayGroups = useMemo(() => groupByDate(items), [items])
  const dateSet = useMemo(() => new Set(dayGroups.map((g) => g.date)), [dayGroups])

  const listRef = useRef(null)
  const [scrollMargin, setScrollMargin] = useState(250)

  useLayoutEffect(() => {
    if (listRef.current) {
      const top = listRef.current.getBoundingClientRect().top + window.scrollY
      setScrollMargin(Math.round(top))
    }
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: dayGroups.length,
    estimateSize: (i) => estimateGroupHeight(dayGroups[i].items.length),
    overscan: 4,
    scrollMargin,
    scrollPaddingStart: 180, // sticky header + filter bar
  })

  const virtualItems = virtualizer.getVirtualItems()

  // Derive active date from scroll position
  const activeDateIndex = useMemo(() => {
    const scrollTop = virtualizer.scrollOffset
    for (const vi of virtualItems) {
      if (vi.end > scrollTop) return vi.index
    }
    return virtualItems[0]?.index ?? 0
  }, [virtualItems, virtualizer.scrollOffset])

  const currentActiveDate = dayGroups[activeDateIndex]?.date ?? ''

  const scrollToDate = (date) => {
    const idx = dayGroups.findIndex((g) => g.date === date)
    if (idx >= 0) virtualizer.scrollToIndex(idx, { align: 'start', behavior: 'smooth' })
  }

  if (dayGroups.length === 0) return null

  return (
    <div className="flex gap-8 items-start">
      <CalendarNav
        dateSet={dateSet}
        currentActiveDate={currentActiveDate}
        onSelectDate={scrollToDate}
      />

      <div className="flex-1 min-w-0">
        <div
          ref={listRef}
          style={{ height: virtualizer.getTotalSize() + 'px', position: 'relative' }}
        >
          {virtualItems.map((vItem) => {
            const group = dayGroups[vItem.index]
            return (
              <div
                key={vItem.key}
                data-index={vItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${vItem.start - scrollMargin}px)`,
                }}
              >
                <DayGroup date={group.date} items={group.items} activeKeywords={activeKeywords} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

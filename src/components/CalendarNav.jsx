import { useState, useEffect, useMemo, useRef } from 'react'

const DOW = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

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

export default function CalendarNav({ dateSet, currentActiveDate, onSelectDate }) {
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

  const firstOfMonth = new Date(viewYear, viewMonth, 1)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const startDow = (firstOfMonth.getDay() + 6) % 7

  const cells = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const monthLabel = firstOfMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

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
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-4 shadow-sm w-56">
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

      <div className="mt-3 pt-3 border-t border-outline-variant/10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
        <span className="text-[10px] font-headline text-outline">Con boletines</span>
      </div>
    </div>
  )
}

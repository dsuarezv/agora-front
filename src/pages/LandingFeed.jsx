import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { API_BASE_URL } from '../constants'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CalendarNav from '../components/CalendarNav'
import KeywordFilter from '../components/KeywordFilter'
import { normalize } from '../utils'

// ─── Utils ───────────────────────────────────────────────────────────────────

function pathToId(url) {
  return url?.replace(/\.json$/, '') ?? ''
}

function formatDateLong(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function groupByDate(items) {
  const newMap = {}
  const updatedMap = {}

  for (const item of items) {
    const pubDate = item.publication_date ?? 'unknown'
    if (!newMap[pubDate]) newMap[pubDate] = []
    newMap[pubDate].push(item)

    if (item.last_updated && item.last_updated !== item.publication_date) {
      const upDate = item.last_updated
      if (!updatedMap[upDate]) updatedMap[upDate] = []
      updatedMap[upDate].push(item)
    }
  }

  const allDates = new Set([...Object.keys(newMap), ...Object.keys(updatedMap)])
  return Array.from(allDates)
    .sort((a, b) => b.localeCompare(a))
    .map((date) => ({
      date,
      items: newMap[date] ?? [],
      updatedItems: updatedMap[date] ?? [],
    }))
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px', ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedCounter({ target, duration = 2400 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 4)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(step)
          else setCount(target)
        }
        requestAnimationFrame(step)
        observer.unobserve(el)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString('es-ES')}</span>
}

// ─── Ticker ──────────────────────────────────────────────────────────────────

function Ticker({ items }) {
  const labels = items.slice(0, 24).map((item) => item.visible_title || item.title)
  const doubled = [...labels, ...labels]

  return (
    <div className="border-y border-outline-variant/20 py-3 overflow-hidden bg-surface-container-lowest select-none">
      <div className="marquee-inner whitespace-nowrap">
        {doubled.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-8 font-headline text-[11px] font-bold uppercase tracking-widest text-on-surface-variant"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block flex-shrink-0" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ docCount }) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <section className="relative flex flex-col justify-between pt-28 pb-0 overflow-hidden bg-background">
      {/* Background structural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,46,90,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,46,90,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end pb-12 pt-4">

          {/* ── Left: editorial headline ── */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-14 bg-primary" />
              <span className="font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-secondary">
                AGORA · Boletín diario
              </span>
            </div>

            <h1 className="font-headline font-black text-primary leading-[0.88] tracking-tighter mb-10">
              <span className="block" style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)' }}>
                EL ESTADO
              </span>
              <span
                className="block font-body italic font-normal text-secondary"
                style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)' }}
              >
                en claro.
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-xl leading-relaxed mb-12">
              Toda la normativa oficial del BOE, traducida a lenguaje humano. Cada día. Sin laberintos.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#timeline"
                className="bg-primary text-on-primary px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-3"
              >
                Leer el feed
                <span className="material-symbols-outlined text-base">arrow_downward</span>
              </a>
            </div>
          </div>

          {/* ── Right: stats ── */}
          <div className="lg:col-span-5">
            <div className="border-l-2 border-primary pl-10 md:pl-14">
              <div className="mb-12">
                <div
                  className="font-headline font-black text-primary leading-none tracking-tighter tabular-nums"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
                >
                  <AnimatedCounter target={docCount || 14208} />
                </div>
                <div className="font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-secondary mt-3">
                  Boletines simplificados
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { label: 'Documentos vigentes', value: '9.847', icon: 'check_circle' },
                  { label: 'Actualizados esta semana', value: '134', icon: 'update' },
                  { label: 'Categorías cubiertas', value: '28', icon: 'category' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-lg icon-fill flex-shrink-0">
                      {icon}
                    </span>
                    <div className="flex-1 border-b border-outline-variant/20 pb-2 flex justify-between items-baseline gap-4">
                      <span className="font-headline text-sm text-on-surface-variant font-bold truncate">
                        {label}
                      </span>
                      <span className="font-headline font-black text-primary text-sm tabular-nums flex-shrink-0">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full flex justify-between items-center py-5 border-t border-outline-variant/20">
        <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-outline">
          Scroll para explorar
        </span>
        <div className="flex items-center gap-1 text-primary animate-bounce">
          <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
        </div>
        <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-outline capitalize">
          {today}
        </span>
      </div>
    </section>
  )
}

// ─── Daily Item row ───────────────────────────────────────────────────────────

function DailyRow({ item, index, updated = false }) {
  const [ref, visible] = useReveal()
  const href = `/boletin/${pathToId(item.url)}`

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(index * 45, 300)}ms` }}
      className={`reveal-left ${visible ? 'in-view' : ''}`}
    >
      <Link
        to={href}
        className="group flex items-start gap-4 md:gap-6 py-5 border-b border-outline-variant/15 hover:bg-surface-container-low transition-colors duration-200 px-3 -mx-3 rounded-sm"
      >
        {/* Rank + ID */}
        <div className="flex flex-col gap-1.5 pt-0.5 flex-shrink-0 w-[110px] md:w-[130px]">
          {updated ? (
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 text-[9px] font-headline font-black uppercase tracking-widest rounded-sm truncate flex items-center gap-1">
              <span className="material-symbols-outlined text-[10px]">update</span>
              Actualizado
            </span>
          ) : (
            <span className="bg-primary text-on-primary px-2 py-0.5 text-[9px] font-headline font-black uppercase tracking-widest rounded-sm truncate">
              {item.rank?.replace(/-/g, '‑') ?? '—'}
            </span>
          )}
          <span className="text-[9px] font-headline font-bold text-outline uppercase tracking-tight truncate">
            {item.identifier}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="material-symbols-outlined text-[12px] text-outline flex-shrink-0">
              account_balance
            </span>
            <span className="font-headline text-[10px] font-bold uppercase tracking-wide text-secondary truncate">
              {item.department}
            </span>
          </div>
          <h3 className="font-headline text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
            {item.visible_title || item.title}
          </h3>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 pt-3.5">
          <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">
            arrow_forward
          </span>
        </div>
      </Link>
    </div>
  )
}

// ─── Day Group ────────────────────────────────────────────────────────────────

function DayGroup({ date, items, updatedItems, onActiveChange }) {
  const [headerRef, headerVisible] = useReveal()
  const rootRef = useRef(null)
  const dateLabel = formatDateLong(date)
  const [weekday, ...restParts] = dateLabel.split(', ')
  const rest = restParts.join(', ')
  const totalCount = items.length + updatedItems.length

  useEffect(() => {
    const el = rootRef.current
    if (!el || !onActiveChange) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onActiveChange(date) },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [date, onActiveChange])

  return (
    <div ref={rootRef} id={`day-${date}`} className="mb-6">
      {/* Date separator */}
      <div
        ref={headerRef}
        className={`reveal-up ${headerVisible ? 'in-view' : ''} flex items-baseline gap-6 py-8 border-t-2 border-primary`}
      >
        <div>
          <span
            className="font-headline font-black text-primary uppercase tracking-tight leading-none block"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' }}
          >
            {weekday}
          </span>
          <span className="font-headline font-bold text-secondary uppercase tracking-[0.25em] text-[10px] mt-1.5 block">
            {rest}
          </span>
        </div>
        <span
          className="ml-auto font-headline font-black text-outline/40 tabular-nums leading-none flex-shrink-0"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          {String(totalCount).padStart(2, '0')}
        </span>
      </div>

      {/* New items */}
      {items.length > 0 && (
        <div className="md:pl-6">
          {items.map((item, i) => (
            <DailyRow key={item.identifier} item={item} index={i} />
          ))}
        </div>
      )}

      {/* Updated items */}
      {updatedItems.length > 0 && (
        <div className="md:pl-6 mt-4">
          <div className="flex items-center gap-4 mb-2 py-2 border-t border-outline-variant/20">
            <span className="material-symbols-outlined text-[14px] text-secondary">update</span>
            <span className="font-headline text-[9px] font-bold uppercase tracking-[0.3em] text-secondary">
              Actualizadas este día
            </span>
          </div>
          {updatedItems.map((item, i) => (
            <DailyRow key={`upd-${item.identifier}`} item={item} index={i} updated />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Infinite scroll sentinel ─────────────────────────────────────────────────

function LoadMoreSentinel({ onIntersect }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onIntersect()
    }, { rootMargin: '300px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <div ref={ref} className="py-12 flex justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-40" />
    </div>
  )
}

// ─── Newsletter Banner ────────────────────────────────────────────────────────

function NewsletterBanner() {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`reveal-up ${visible ? 'in-view' : ''} py-24 px-6 md:px-12`}>
      <div className="max-w-screen-2xl mx-auto border-2 border-primary bg-surface-container-lowest px-10 md:px-20 py-16 md:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-5 mb-10">
            <div className="h-px w-14 bg-primary" />
            <span className="font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-secondary">
              Boletín semanal gratuito
            </span>
          </div>

          <h2
            className="font-headline font-black text-primary leading-[0.92] tracking-tighter mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            No vuelvas a perderte una ley que te afecta.
          </h2>

          <p className="font-body italic text-xl md:text-2xl text-secondary mb-12 max-w-xl leading-relaxed">
            Cada lunes: los cambios legales de la semana, en lenguaje claro, en tu bandeja de entrada.
          </p>

          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="tu@correo.es"
              className="flex-1 bg-surface-container border border-outline-variant/30 px-6 py-4 font-headline text-sm focus:border-primary focus:outline-none transition-colors rounded-none"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary-container transition-colors whitespace-nowrap rounded-none"
            >
              Suscribirme
            </button>
          </form>

          <p className="font-headline text-[10px] text-outline uppercase tracking-widest mt-4">
            Sin spam · Cancelación inmediata · Sin datos de terceros
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const DAYS_PER_LOAD = 4

export default function LandingFeed() {
  const [allItems, setAllItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleDays, setVisibleDays] = useState(DAYS_PER_LOAD)
  const [searchRaw, setSearchRaw] = useState('')
  const [search, setSearch] = useState('')
  const [selectedKeywords, setSelectedKeywords] = useState(new Set())
  const [matchMode, setMatchMode] = useState('any')
  const [activeDate, setActiveDate] = useState(null)
  const scrollTargetRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/boletines/index.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setAllItems(data.filter((item) => !isNaN(Date.parse(item.publication_date))))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Debounce text search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchRaw.trim()), 250)
    return () => clearTimeout(t)
  }, [searchRaw])

  const groups = useMemo(() => groupByDate(allItems), [allItems])
  const visibleGroups = useMemo(() => groups.slice(0, visibleDays), [groups, visibleDays])
  const hasMore = visibleDays < groups.length
  const allDateSet = useMemo(() => new Set(groups.map((g) => g.date)), [groups])

  const allKeywords = useMemo(() => {
    const counts = {}
    for (const item of allItems)
      for (const k of item.keywords ?? [])
        counts[k] = (counts[k] ?? 0) + 1
    return Object.entries(counts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
  }, [allItems])

  const loadMore = useCallback(() => {
    if (hasMore) setVisibleDays((v) => v + DAYS_PER_LOAD)
  }, [hasMore])

  const isFiltering = search.length > 0 || selectedKeywords.size > 0

  const matchesItem = useCallback((item) => {
    if (search) {
      const q = normalize(search)
      const hit =
        [item.visible_title, item.title, item.department, item.identifier]
          .some((f) => f && normalize(f).includes(q)) ||
        (item.keywords ?? []).some((k) => normalize(k).includes(q))
      if (!hit) return false
    }
    if (selectedKeywords.size > 0) {
      const kws = new Set(item.keywords ?? [])
      const kwHit =
        matchMode === 'all'
          ? [...selectedKeywords].every((k) => kws.has(k))
          : [...selectedKeywords].some((k) => kws.has(k))
      if (!kwHit) return false
    }
    return true
  }, [search, selectedKeywords, matchMode])

  const filteredGroups = useMemo(() => {
    if (!isFiltering) return []
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(matchesItem),
        updatedItems: g.updatedItems.filter(matchesItem),
      }))
      .filter((g) => g.items.length > 0 || g.updatedItems.length > 0)
  }, [groups, isFiltering, matchesItem])

  const displayGroups = isFiltering ? filteredGroups : visibleGroups

  const filteredResultCount = useMemo(
    () => filteredGroups.reduce((n, g) => n + g.items.length + g.updatedItems.length, 0),
    [filteredGroups]
  )

  const scrollToDate = useCallback((date) => {
    const idx = groups.findIndex((g) => g.date === date)
    if (idx === -1) return
    if (!isFiltering && idx >= visibleDays) {
      setVisibleDays(idx + 1)
      scrollTargetRef.current = date
    } else {
      document.getElementById(`day-${date}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [groups, visibleDays, isFiltering])

  // Scroll to pending target after new days render
  useEffect(() => {
    if (!scrollTargetRef.current) return
    const el = document.getElementById(`day-${scrollTargetRef.current}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      scrollTargetRef.current = null
    }
  }, [visibleGroups])

  const handleActiveChange = useCallback((date) => setActiveDate(date), [])

  return (
    <>
      <Header />

      <Hero docCount={allItems.length} />

      {allItems.length > 0 && <Ticker items={allItems} />}

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-3 flex flex-wrap items-center gap-3">
          {/* Text search */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 focus-within:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0">search</span>
            <input
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              placeholder="Buscar por título, departamento, identificador…"
              className="flex-1 bg-transparent text-sm font-headline outline-none placeholder:text-outline min-w-0"
            />
            {searchRaw && (
              <button onClick={() => setSearchRaw('')} className="flex-shrink-0">
                <span className="material-symbols-outlined text-[18px] text-outline hover:text-on-surface transition-colors">close</span>
              </button>
            )}
          </div>

          <KeywordFilter
            allKeywords={allKeywords}
            selected={selectedKeywords}
            onChange={setSelectedKeywords}
          />

          {/* AND / OR toggle — only shown when 2+ keywords selected */}
          {selectedKeywords.size > 1 && (
            <div className="flex items-center border border-outline-variant/30 rounded-lg overflow-hidden bg-surface-container-lowest font-headline font-bold text-xs">
              <button
                onClick={() => setMatchMode('any')}
                className={`px-3 py-2.5 transition-colors ${
                  matchMode === 'any' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                ALGUNA
              </button>
              <button
                onClick={() => setMatchMode('all')}
                className={`px-3 py-2.5 transition-colors border-l border-outline-variant/30 ${
                  matchMode === 'all' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                TODAS
              </button>
            </div>
          )}

          {isFiltering && (
            <div className="flex items-center gap-2">
              <span className="font-headline text-xs text-secondary">
                {filteredResultCount.toLocaleString('es-ES')} resultado{filteredResultCount !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => { setSearchRaw(''); setSelectedKeywords(new Set()) }}
                className="flex items-center gap-1 font-headline text-xs text-outline hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
                Limpiar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Timeline feed */}
      <main id="timeline">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-20 pb-4">

          {/* Section label */}
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[3px] w-16 bg-primary" />
            <h2 className="font-headline font-bold uppercase tracking-[0.25em] text-[11px] text-secondary">
              Feed legislativo · Últimas publicaciones
            </h2>
          </div>

          {loading ? (
            <div className="py-32 flex flex-col items-center gap-6">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-headline text-[11px] text-secondary uppercase tracking-[0.3em]">
                Cargando boletines…
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-10">
              {/* Feed */}
              <div className="flex-1 min-w-0">
                {displayGroups.map((group) => (
                  <DayGroup
                    key={group.date}
                    date={group.date}
                    items={group.items}
                    updatedItems={group.updatedItems}
                    onActiveChange={handleActiveChange}
                  />
                ))}

                {isFiltering && filteredGroups.length === 0 && (
                  <div className="py-24 text-center">
                    <p className="font-body italic text-xl text-secondary">
                      No hay boletines que coincidan con la búsqueda.
                    </p>
                  </div>
                )}

                {!isFiltering && hasMore && <LoadMoreSentinel onIntersect={loadMore} />}

                {!isFiltering && !hasMore && allItems.length > 0 && (
                  <div className="py-24 text-center border-t-2 border-primary mt-12">
                    <p className="font-headline font-black text-primary text-xl md:text-3xl mb-3 tracking-tight">
                      — FIN DEL ARCHIVO —
                    </p>
                    <p className="font-headline text-[10px] text-outline uppercase tracking-[0.35em]">
                      {allItems.length.toLocaleString('es-ES')} documentos disponibles
                    </p>
                  </div>
                )}

                {allItems.length === 0 && (
                  <div className="py-24 text-center">
                    <p className="font-body italic text-xl text-secondary">
                      No se pudieron cargar los boletines.
                    </p>
                  </div>
                )}
              </div>

              {/* Calendar sidebar */}
              <div className="hidden lg:block shrink-0 self-start sticky top-28">
                <CalendarNav
                  dateSet={allDateSet}
                  currentActiveDate={activeDate}
                  onSelectDate={scrollToDate}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <NewsletterBanner />
      <Footer />
    </>
  )
}

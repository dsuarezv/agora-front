import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { API_BASE_URL } from '../constants'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-0 overflow-hidden bg-background">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end pb-24 pt-8">

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
              <Link
                to="/boletines"
                className="border border-primary text-primary px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors"
              >
                Índice completo
              </Link>
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
              {item.rank?.replace(/-/g, '\u2011') ?? '—'}
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

function DayGroup({ date, items, updatedItems }) {
  const [headerRef, headerVisible] = useReveal()
  const dateLabel = formatDateLong(date)
  const [weekday, ...restParts] = dateLabel.split(', ')
  const rest = restParts.join(', ')
  const totalCount = items.length + updatedItems.length

  return (
    <div className="mb-6">
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

// ─── Weekly Digest ────────────────────────────────────────────────────────────

function WeeklyDigest({ weekData }) {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`reveal-scale ${visible ? 'in-view' : ''} my-20`}>
      <div className="bg-primary text-on-primary px-10 md:px-20 py-16 md:py-20 relative overflow-hidden">
        {/* Decorative gavel */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '20rem', lineHeight: 1 }}
          >
            gavel
          </span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-8">
            <div className="h-px w-12 bg-on-primary/30" />
            <span className="font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-on-primary/50">
              Resumen Semanal
            </span>
          </div>

          <p className="font-headline font-bold text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-on-primary/40 mb-4">
            {weekData.dateRange}
          </p>

          <blockquote
            className="font-body font-normal italic text-on-primary leading-[1.25] mb-10"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
          >
            {weekData.summary}
          </blockquote>

          <div className="flex flex-wrap gap-2 mb-12">
            {weekData.highlights.map((h) => (
              <span
                key={h}
                className="border border-on-primary/25 text-on-primary/75 px-4 py-1.5 font-headline text-[10px] font-bold uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between flex-wrap gap-8">
            <div className="flex items-center gap-10 md:gap-16">
              {[
                { label: 'Boletines', value: weekData.count },
                { label: 'Urgentes', value: weekData.urgent },
                { label: 'Categorías', value: weekData.categories },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-headline font-black text-on-primary tabular-nums leading-none mb-1.5" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
                    {value}
                  </div>
                  <div className="font-headline text-[9px] font-bold uppercase tracking-[0.35em] text-on-primary/40">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/boletines"
              className="flex items-center gap-3 border border-on-primary/30 text-on-primary px-7 py-3.5 font-headline font-bold text-[11px] uppercase tracking-widest hover:bg-on-primary hover:text-primary transition-colors duration-200"
            >
              Ver resumen
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Monograph ────────────────────────────────────────────────────────────────

function Monograph({ data }) {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`reveal-clip ${visible ? 'in-view' : ''} my-20`}>
      <div className="relative overflow-hidden" style={{ minHeight: '580px' }}>
        {/* Background image */}
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
            style={{ transform: 'scale(1.05)' }}
          />
        )}

        {/* Gradient overlay: left heavy, right lighter */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-10 md:px-20 py-16 md:py-20 flex flex-col justify-end h-full min-h-[580px]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-5 mb-8">
              <span className="bg-tertiary-container text-on-tertiary px-4 py-1.5 font-headline text-[10px] font-black uppercase tracking-[0.35em]">
                Monográfico
              </span>
              <div className="h-px flex-1 bg-on-primary/20" />
            </div>

            <p className="font-headline font-bold text-[10px] uppercase tracking-[0.4em] text-on-primary/45 mb-5">
              {data.category} · {data.readTime} de lectura
            </p>

            <h2
              className="font-headline font-black text-on-primary leading-[0.92] tracking-tighter mb-8"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.75rem)' }}
            >
              {data.title}
            </h2>

            <p className="font-body italic text-xl md:text-2xl text-on-primary/75 max-w-2xl leading-relaxed mb-10">
              {data.summary}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-12">
              {data.topics.map((t) => (
                <span
                  key={t}
                  className="bg-on-primary/10 border border-on-primary/20 text-on-primary/75 px-4 py-1.5 font-headline text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              to={data.href || '/boletines'}
              className="inline-flex items-center gap-3 bg-on-primary text-primary px-8 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-primary-fixed transition-colors duration-200"
            >
              Leer análisis completo
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
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

// ─── Mock special content ─────────────────────────────────────────────────────

const MONOGRAPH_DATA = {
  title: 'La nueva Ley de Vivienda: lo que necesitas saber si alquilas o eres propietario',
  summary:
    'Desde la regulación de precios en zonas tensionadas hasta las nuevas obligaciones para grandes tenedores, analizamos todos los cambios que entran en vigor este año.',
  image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
  category: 'Vivienda',
  readTime: '12 min',
  topics: ['Arrendamientos', 'Zonas tensionadas', 'Grandes tenedores', 'Rehabilitación'],
  href: '/boletines',
}

const WEEKLY_SAMPLE = {
  dateRange: 'Semana del 7 al 11 de Abril de 2026',
  summary:
    '"Reforma de las pensiones, nuevas restricciones de movilidad y cambios en la normativa de extranjería: una semana densa en legislación de impacto directo para el ciudadano."',
  highlights: ['Pensiones', 'Movilidad', 'Extranjería', 'Fiscalidad', 'Empleo Público'],
  count: 47,
  urgent: 3,
  categories: 9,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const DAYS_PER_LOAD = 4

export default function LandingFeed() {
  const [allItems, setAllItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleDays, setVisibleDays] = useState(DAYS_PER_LOAD)

  useEffect(() => {
    fetch(`${API_BASE_URL}/boletines/index.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setAllItems(data.filter((item) => !isNaN(Date.parse(item.publication_date))))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const groups = useMemo(() => groupByDate(allItems), [allItems])
  const visibleGroups = useMemo(() => groups.slice(0, visibleDays), [groups, visibleDays])
  const hasMore = visibleDays < groups.length

  const loadMore = useCallback(() => {
    if (hasMore) setVisibleDays((v) => v + DAYS_PER_LOAD)
  }, [hasMore])

  // Build the mixed feed: inject monograph after day 0, weekly after day 4
  const feedEntries = useMemo(() => {
    const result = []
    for (let i = 0; i < visibleGroups.length; i++) {
      result.push({ type: 'day', data: visibleGroups[i], key: `day-${visibleGroups[i].date}` })
      if (i === 0) result.push({ type: 'monograph', key: 'mono-0' })
      if (i === 4) result.push({ type: 'weekly', key: 'weekly-0' })
    }
    return result
  }, [visibleGroups])

  return (
    <>
      <Header />

      <Hero docCount={allItems.length} />

      {/* Ticker — shows once data is loaded */}
      {allItems.length > 0 && <Ticker items={allItems} />}

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
            <>
              {feedEntries.map((entry) => {
                if (entry.type === 'day') {
                  return (
                    <DayGroup
                      key={entry.key}
                      date={entry.data.date}
                      items={entry.data.items}
                      updatedItems={entry.data.updatedItems}
                    />
                  )
                }
                // if (entry.type === 'monograph') {
                //   return <Monograph key={entry.key} data={MONOGRAPH_DATA} />
                // }
                // if (entry.type === 'weekly') {
                //   return <WeeklyDigest key={entry.key} weekData={WEEKLY_SAMPLE} />
                // }
                return null
              })}

              {hasMore && <LoadMoreSentinel onIntersect={loadMore} />}

              {!hasMore && allItems.length > 0 && (
                <div className="py-24 text-center border-t-2 border-primary mt-12">
                  <p className="font-headline font-black text-primary text-xl md:text-3xl mb-3 tracking-tight">
                    — FIN DEL ARCHIVO —
                  </p>
                  <p className="font-headline text-[10px] text-outline uppercase tracking-[0.35em]">
                    {allItems.length.toLocaleString('es-ES')} documentos disponibles
                  </p>
                </div>
              )}

              {allItems.length === 0 && !loading && (
                <div className="py-24 text-center">
                  <p className="font-body italic text-xl text-secondary">
                    No se pudieron cargar los boletines.{' '}
                    <Link to="/boletines" className="text-primary underline underline-offset-4">
                      Ir al índice completo.
                    </Link>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <NewsletterBanner />
      <Footer />
    </>
  )
}

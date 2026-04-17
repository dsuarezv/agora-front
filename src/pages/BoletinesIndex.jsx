import { useState, useEffect, useMemo, useRef } from 'react'
import { API_BASE_URL } from '../constants'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { SkeletonBlock } from '../components/Skeleton'
import BoletinCard from '../components/BoletinCard'
import DayGroupedView from '../components/DayGroupedView'

// ─── Constants ───────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 18

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function IndexSkeleton() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <SkeletonBlock className="h-4 w-32 mb-4" />
      <SkeletonBlock className="h-16 w-2/3 mb-3" />
      <SkeletonBlock className="h-8 w-1/2 mb-16" />
      <SkeletonBlock className="h-14 w-full mb-4 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonBlock key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

// ─── Keyword popover ─────────────────────────────────────────────────────────

function KeywordFilter({ allKeywords, selected, onChange }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const visible = useMemo(() => {
    const q = normalize(search.trim())
    return q ? allKeywords.filter((k) => normalize(k.keyword).includes(q)) : allKeywords
  }, [allKeywords, search])

  const sorted = useMemo(() => {
    return [...visible].sort((a, b) => {
      const aS = selected.has(a.keyword)
      const bS = selected.has(b.keyword)
      if (aS && !bS) return -1
      if (!aS && bS) return 1
      return b.count - a.count
    })
  }, [visible, selected])

  const toggle = (kw) => {
    const next = new Set(selected)
    if (next.has(kw)) next.delete(kw)
    else next.add(kw)
    onChange(next)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-headline font-bold text-sm border transition-all whitespace-nowrap ${
          selected.size > 0
            ? 'bg-primary text-on-primary border-primary'
            : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">tag</span>
        Palabras clave
        {selected.size > 0 && (
          <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded font-black tabular-nums">
            {selected.size}
          </span>
        )}
        <span
          className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 z-50 w-80 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-2xl overflow-hidden">
          {/* Search within keywords */}
          <div className="p-3 border-b border-outline-variant/10">
            <div className="flex items-center gap-2 bg-surface-container-low rounded-lg px-3 py-2">
              <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0">search</span>
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Buscar entre ${allKeywords.length} keywords…`}
                className="bg-transparent flex-1 text-sm font-headline outline-none placeholder:text-outline min-w-0"
              />
              {search && (
                <button onClick={() => setSearch('')} className="flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-outline hover:text-on-surface transition-colors">
                    close
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Stats line */}
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] font-headline font-bold text-outline uppercase tracking-widest">
              {search ? `${sorted.length} resultado${sorted.length !== 1 ? 's' : ''}` : `${allKeywords.length} palabras clave`}
            </span>
            {selected.size > 0 && (
              <span className="text-[10px] font-headline font-bold text-primary">
                {selected.size} seleccionada{selected.size !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* List */}
          <div className="max-h-64 overflow-y-auto px-2 pb-2">
            {sorted.length === 0 ? (
              <p className="text-center text-xs text-outline py-8 font-headline italic">
                Sin resultados para «{search}»
              </p>
            ) : (
              sorted.map(({ keyword, count }) => {
                const isSelected = selected.has(keyword)
                return (
                  <button
                    key={keyword}
                    onClick={() => toggle(keyword)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-headline transition-all ${
                      isSelected
                        ? 'bg-primary/8 text-primary'
                        : 'hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'bg-primary border-primary' : 'border-outline-variant'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[10px] text-white leading-none">
                            check
                          </span>
                        )}
                      </div>
                      <span className="truncate text-left">{keyword}</span>
                    </div>
                    <span className="flex-shrink-0 text-[10px] bg-surface-container px-1.5 py-0.5 rounded font-black text-outline tabular-nums">
                      {count}
                    </span>
                  </button>
                )
              })
            )}
          </div>

          {/* Footer actions */}
          {selected.size > 0 && (
            <div className="border-t border-outline-variant/10 p-2">
              <button
                onClick={() => onChange(new Set())}
                className="w-full text-xs text-outline hover:text-tertiary font-headline font-bold py-1.5 transition-colors rounded-lg hover:bg-tertiary-fixed/30"
              >
                Limpiar selección ({selected.size})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Sort dropdown ────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: 'updated', label: 'Actualización reciente' },
  { value: 'newest', label: 'Publicación más reciente' },
  { value: 'oldest', label: 'Publicación más antigua' },
  { value: 'alpha', label: 'Alfabético A → Z' },
]

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = SORT_OPTIONS.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-headline font-bold text-sm border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:border-primary/40 hover:text-primary transition-all whitespace-nowrap"
      >
        <span className="material-symbols-outlined text-[18px]">sort</span>
        {current.label}
        <span
          className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 z-50 w-56 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-2xl overflow-hidden p-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-headline transition-all ${
                opt.value === value
                  ? 'bg-primary/8 text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const range = new Set(
      [1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]
        .filter((p) => p >= 1 && p <= totalPages)
    )
    const sorted = [...range].sort((a, b) => a - b)
    const result = []
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…')
      result.push(sorted[i])
    }
    return result
  }

  const btnBase =
    'h-9 min-w-[2.25rem] px-2 rounded-lg font-headline font-bold text-sm transition-all flex items-center justify-center'

  return (
    <div className="flex items-center justify-center gap-1 mt-16">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${btnBase} border border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
      </button>

      {getPages().map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="text-outline text-sm px-1 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${btnBase} ${
              p === page
                ? 'bg-primary text-on-primary'
                : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={`${btnBase} border border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
      </button>
    </div>
  )
}

// ─── Error state ──────────────────────────────────────────────────────────────

function ErrorState({ message, onRetry }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
      <span className="material-symbols-outlined text-6xl text-outline">error_outline</span>
      <h2 className="font-headline text-2xl font-bold text-primary">No se pudo cargar el índice</h2>
      <p className="font-body text-secondary max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="bg-primary text-on-primary px-8 py-3 rounded-lg font-headline font-bold text-sm hover:bg-primary-container transition-colors"
      >
        Reintentar
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BoletinesIndex() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filters
  const [searchRaw, setSearchRaw] = useState('')
  const [selectedKeywords, setSelectedKeywords] = useState(new Set())
  const [matchMode, setMatchMode] = useState('any') // 'any' | 'all'
  const [sortBy, setSortBy] = useState('updated')
  const [page, setPage] = useState(1)

  // Debounced search
  const [search, setSearch] = useState('')
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchRaw); setPage(1) }, 250)
    return () => clearTimeout(t)
  }, [searchRaw])

  const resetPage = () => setPage(1)

  const fetchIndex = () => {
    setLoading(true)
    setError(null)
    fetch(`${API_BASE_URL}/boletines/index.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then((data) => setItems(data.filter((item) => !isNaN(Date.parse(item.publication_date)))))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchIndex() }, [])

  // Build keyword frequency map (sorted by count desc)
  const allKeywords = useMemo(() => {
    const freq = {}
    for (const item of items) {
      for (const kw of item.keywords ?? []) {
        freq[kw] = (freq[kw] ?? 0) + 1
      }
    }
    return Object.entries(freq)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
  }, [items])

  // Filter + sort
  const filtered = useMemo(() => {
    const q = normalize(search.trim())

    return items.filter((item) => {
      // Text search
      if (q) {
        const haystack = normalize(
          [item.visible_title, item.title, item.department, item.identifier, ...(item.keywords ?? [])]
            .filter(Boolean)
            .join(' ')
        )
        if (!haystack.includes(q)) return false
      }

      // Keyword filter
      if (selectedKeywords.size > 0) {
        const kws = new Set(item.keywords ?? [])
        if (matchMode === 'all') {
          if (![...selectedKeywords].every((k) => kws.has(k))) return false
        } else {
          if (![...selectedKeywords].some((k) => kws.has(k))) return false
        }
      }

      return true
    })
  }, [items, search, selectedKeywords, matchMode])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'newest') return (b.publication_date ?? '').localeCompare(a.publication_date ?? '')
      if (sortBy === 'oldest') return (a.publication_date ?? '').localeCompare(b.publication_date ?? '')
      if (sortBy === 'alpha') return (a.visible_title || a.title).localeCompare(b.visible_title || b.title, 'es')
      // updated (default)
      return (b.last_updated ?? b.publication_date ?? '').localeCompare(a.last_updated ?? a.publication_date ?? '')
    })
  }, [filtered, sortBy])

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const paginated = useMemo(
    () => sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [sorted, page]
  )

  const isGroupedMode = !search
  const hasFilters = search || selectedKeywords.size > 0

  const clearAll = () => {
    setSearchRaw('')
    setSelectedKeywords(new Set())
    setPage(1)
  }

  const handleKeywordChange = (next) => {
    setSelectedKeywords(next)
    resetPage()
  }

  return (
    <>
      <Header />

      {loading && <IndexSkeleton />}
      {!loading && error && <ErrorState message={error} onRetry={fetchIndex} />}

      {!loading && !error && (
        <main className="pt-28 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">

          {/* Hero */}
          <header className="pt-6 mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-12 bg-primary" />
              <span className="font-headline font-bold text-secondary text-sm uppercase tracking-[0.2em]">
                Normativa oficial
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight font-headline text-primary mb-3 leading-[1.05]">
              Boletines
            </h1>
            <p className="text-xl font-body text-secondary italic">
              {items.length.toLocaleString('es-ES')} documentos disponibles
            </p>
          </header>

          {/* ── Sticky filter bar ── */}
          <div className="sticky top-20 z-30 -mx-6 md:-mx-12 px-6 md:px-12 py-4 bg-background/90 backdrop-blur-md border-b border-outline-variant/10 mb-8">
            <div className="flex flex-wrap items-center gap-3">

              {/* Text search */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 focus-within:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0">search</span>
                <input
                  value={searchRaw}
                  onChange={(e) => { setSearchRaw(e.target.value); resetPage() }}
                  placeholder="Buscar por título, departamento, identificador…"
                  className="flex-1 bg-transparent text-sm font-headline outline-none placeholder:text-outline min-w-0"
                />
                {searchRaw && (
                  <button onClick={() => { setSearchRaw(''); resetPage() }} className="flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-outline hover:text-on-surface transition-colors">close</span>
                  </button>
                )}
              </div>

              {/* Keyword filter */}
              <KeywordFilter
                allKeywords={allKeywords}
                selected={selectedKeywords}
                onChange={handleKeywordChange}
              />

              {/* AND / OR toggle — only shown when keywords selected */}
              {selectedKeywords.size > 1 && (
                <div className="flex items-center border border-outline-variant/30 rounded-lg overflow-hidden bg-surface-container-lowest font-headline font-bold text-xs">
                  <button
                    onClick={() => { setMatchMode('any'); resetPage() }}
                    className={`px-3 py-2.5 transition-colors ${
                      matchMode === 'any' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    ALGUNA
                  </button>
                  <button
                    onClick={() => { setMatchMode('all'); resetPage() }}
                    className={`px-3 py-2.5 transition-colors border-l border-outline-variant/30 ${
                      matchMode === 'all' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    TODAS
                  </button>
                </div>
              )}

              {/* Sort — only in search mode */}
              {!isGroupedMode && (
                <SortDropdown value={sortBy} onChange={(v) => { setSortBy(v); resetPage() }} />
              )}

              {/* Clear all */}
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-sm font-headline font-bold text-outline hover:text-tertiary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
                  Limpiar
                </button>
              )}
            </div>

            {/* Active keyword chips */}
            {selectedKeywords.size > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {[...selectedKeywords].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => {
                      const next = new Set(selectedKeywords)
                      next.delete(kw)
                      handleKeywordChange(next)
                    }}
                    className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-headline font-bold hover:bg-tertiary-fixed/50 hover:text-tertiary transition-colors group"
                  >
                    {kw}
                    <span className="material-symbols-outlined text-[12px] group-hover:scale-110 transition-transform">close</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-headline text-sm text-secondary">
              {isGroupedMode ? (
                selectedKeywords.size > 0 ? (
                  <>
                    <span className="font-black text-primary text-base">{filtered.length.toLocaleString('es-ES')}</span>
                    {' '}de{' '}
                    <span className="font-bold">{items.length.toLocaleString('es-ES')}</span>
                    {' '}documentos, agrupados por fecha
                  </>
                ) : (
                  <>
                    <span className="font-black text-primary text-base">{items.length.toLocaleString('es-ES')}</span>
                    {' '}documentos, agrupados por fecha
                  </>
                )
              ) : (
                <>
                  <span className="font-black text-primary text-base">{filtered.length.toLocaleString('es-ES')}</span>
                  {' '}de{' '}
                  <span className="font-bold">{items.length.toLocaleString('es-ES')}</span>
                  {' '}documentos
                  {totalPages > 1 && (
                    <span className="text-outline ml-2">
                      — página {page} de {totalPages}
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Grouped view (no text search) */}
          {isGroupedMode && (
            <DayGroupedView items={filtered} activeKeywords={selectedKeywords} />
          )}

          {/* Search results (text search active) */}
          {!isGroupedMode && (
            <>
              {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
                  <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
                  <div>
                    <p className="font-headline font-bold text-on-surface text-lg mb-1">
                      Sin resultados
                    </p>
                    <p className="font-body italic text-secondary">
                      Prueba con otros términos o elimina algún filtro.
                    </p>
                  </div>
                  <button
                    onClick={clearAll}
                    className="text-sm font-headline font-bold text-primary hover:underline"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((item) => (
                    <BoletinCard
                      key={item.identifier}
                      item={item}
                      activeKeywords={selectedKeywords}
                    />
                  ))}
                </div>
              )}
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={(p) => {
                  setPage(p)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            </>
          )}
        </main>
      )}

      <Footer />
    </>
  )
}

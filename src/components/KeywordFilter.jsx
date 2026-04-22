import { useState, useEffect, useMemo, useRef } from 'react'
import { normalize } from '../utils'

export default function KeywordFilter({ allKeywords, selected, onChange }) {
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

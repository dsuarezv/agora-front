import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../constants'
import { Link, useParams, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { DetailSkeleton } from '../components/Skeleton'

// ─── Helpers ────────────────────────────────────────────────────────────────

const STATUS_MAP = {
  in_force: { label: 'Vigente', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  repealed: { label: 'Derogada', className: 'bg-surface-container-high text-outline border border-outline-variant/40' },
  amended:  { label: 'Modificada', className: 'bg-secondary-container text-on-secondary-container border border-secondary-container' },
}

const HASH_SCROLL_OFFSET = 112

function formatDate(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TimelineStep({ step, title, description, start_date, end_date, required_documentation, isLast }) {
  return (
    <div className={`flex gap-6 ${isLast ? '' : 'pb-10'}`}>
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="z-10 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold text-sm">
          {String(step).padStart(2, '0')}
        </div>
        {!isLast && <div className="w-px flex-1 bg-outline-variant/30 mt-2" />}
      </div>
      <div className="pt-1 pb-2">
        <h4 className="font-headline font-bold text-lg text-primary">{title}</h4>
        <p className="text-on-surface-variant mb-4">{description}</p>
        <div className="flex flex-wrap gap-3 text-xs font-headline">
          {start_date && (
            <span className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1.5 rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">event</span>
              Inicio: {start_date}
            </span>
          )}
          {end_date && (
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1.5 rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">event_busy</span>
              Fin: {end_date}
            </span>
          )}
          {required_documentation && (
            <span className="bg-surface-container-high px-3 py-1.5 rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">description</span>
              {required_documentation}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function ProcedureCard({ name, steps }) {
  return (
    <div className="bg-white p-10 rounded-xl border border-outline-variant/10 shadow-sm">
      <h3 className="font-headline text-2xl font-black text-primary mb-8">{name}</h3>
      {steps.map((step, i) => (
        <TimelineStep key={step.step} {...step} isLast={i === steps.length - 1} />
      ))}
    </div>
  )
}

function KeyPointsList({ points }) {
  const icons = ['check_circle', 'info', 'warning', 'rule', 'home_work', 'nature', 'local_fire_department', 'gavel']
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {points.map((point, i) => (
          <li key={i} className="flex gap-4">
            <span className="bg-white p-2 rounded-lg shadow-sm h-fit flex-shrink-0">
              <span className="material-symbols-outlined text-primary icon-fill">
                {icons[i % icons.length]}
              </span>
            </span>
            <p className="text-on-surface-variant text-sm leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ImpactCards({ citizenImpact, professionalImpact }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-primary-container/10 border border-primary-container/20 p-8 rounded-xl">
        <div className="text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">gite</span>
          <span className="font-headline font-bold uppercase tracking-widest text-xs">Impacto Ciudadano</span>
        </div>
        <h3 className="font-headline text-xl font-bold text-primary mb-3">Protección y Restricciones</h3>
        <p className="text-on-surface-variant leading-relaxed font-body text-lg">{citizenImpact}</p>
      </div>
      <div className="bg-secondary-container/20 border border-secondary-container/40 p-8 rounded-xl">
        <div className="text-on-secondary-container mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">architecture</span>
          <span className="font-headline font-bold uppercase tracking-widest text-xs">Impacto Profesional</span>
        </div>
        <h3 className="font-headline text-xl font-bold text-primary mb-3">Garantías y Responsabilidad</h3>
        <p className="text-on-surface-variant leading-relaxed font-body text-lg">{professionalImpact}</p>
      </div>
    </div>
  )
}

function LegalContext({ derogations, legalRefs }) {
  return (
    <section className="mt-32 max-w-5xl">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-[2px] w-12 bg-primary" />
        <h2 className="font-headline text-xl font-bold text-primary uppercase tracking-widest">
          Contexto Legal y Referencias
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-headline font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">history</span>
            Normas Derogadas
          </h3>
          <ul className="space-y-3">
            {derogations.map((norm) => (
              <li key={norm} className="p-3 bg-surface-container-lowest border border-outline-variant/10 rounded-lg text-sm font-body text-on-surface-variant">
                {norm}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-headline font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">link</span>
            Referencias Legislativas
          </h3>
          <ul className="space-y-3 font-body text-on-surface-variant">
            {legalRefs.map((ref) => (
              <li key={ref}>
                <p className="text-primary flex justify-between items-center">
                  {ref}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
      <span className="material-symbols-outlined text-6xl text-outline">error_outline</span>
      <h2 className="font-headline text-2xl font-bold text-primary">No se pudo cargar el boletín</h2>
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

function ArticleSection({ content, title = 'En Profundidad', id }) {
  return (
    <section id={id} className="mb-16">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-[2px] w-12 bg-primary" />
        <h2 className="font-headline text-xl font-bold text-primary uppercase tracking-widest">
          {title}
        </h2>
      </div>
      <div className="prose-article">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="font-headline text-3xl md:text-5xl font-black text-primary leading-[1.15] tracking-tight mb-6">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-headline text-2xl font-bold text-primary mt-12 mb-4 pb-2 border-b border-outline-variant/20">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-headline text-lg font-bold text-primary mt-8 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-5">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-on-surface">
                {children}
              </strong>
            ),
            ul: ({ children }) => (
              <ul className="space-y-3 my-6 ml-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-3 my-6 ml-1 list-none counter-reset-item">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="flex gap-3 font-body text-lg text-on-surface-variant leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{children}</span>
              </li>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Detail() {
  const params = useParams()
  const id = params['*']
  const { hash } = useLocation()
  const [boletin, setBoletin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [article, setArticle] = useState(null)
  const [updates, setUpdates] = useState(null)
  const [critical, setCritical] = useState(null)

  const fetchBoletin = () => {
    setLoading(true)
    setError(null)
    fetch(`${API_BASE_URL}/boletines/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then((data) => setBoletin(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
    fetchBoletin()
    const stripFrontmatter = (text) => text.replace(/^---[\s\S]*?---\n?/, '')
    const fetchMd = (url, setter) =>
      fetch(url)
        .then((res) => (res.ok && !res.headers.get('content-type')?.includes('text/html')) ? res.text() : null)
        .then((text) => setter(text ? stripFrontmatter(text) : null))
        .catch(() => setter(null))

    fetchMd(`${API_BASE_URL}/articles/${id}.md`, setArticle)
    fetchMd(`${API_BASE_URL}/articles/${id}--updates.md`, setUpdates)
    fetchMd(`${API_BASE_URL}/articles/${id}--critical.md`, setCritical)
  }, [id])

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY - HASH_SCROLL_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }, [hash, article, updates, critical])

  useEffect(() => {
    if (!boletin) return
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: boletin.visible_title || boletin.title,
      description: boletin.summary,
      inLanguage: 'es',
      datePublished: boletin.publication_date,
      dateModified: boletin.last_updated || boletin.publication_date,
      publisher: {
        '@type': 'Organization',
        name: 'ÁGORA',
      },
      author: {
        '@type': 'SoftwareApplication',
        name: 'Gemma',
        url: 'https://deepmind.google/models/gemma/gemma-4/',
      },
      editor: {
        '@type': 'Organization',
        name: 'ÁGORA',
      },
      isBasedOn: {
        '@type': 'LegislativeWork',
        name: boletin.title,
        url: boletin.source,
        publisher: {
          '@type': 'Organization',
          name: boletin.official_journal || 'Boletín Oficial del Estado',
        },
      },
      keywords: boletin.keywords?.join(', '),
      about: boletin.department,
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'boletin-schema'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => {
      document.getElementById('boletin-schema')?.remove()
    }
  }, [boletin])

  const statusInfo = STATUS_MAP[boletin?.status] ?? STATUS_MAP['in_force']

  return (
    <>
      <Header />

      {loading && <DetailSkeleton />}

      {!loading && error && <ErrorState message={error} onRetry={fetchBoletin} />}

      {!loading && boletin && (
        <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">

          {/* Header */}
          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-primary text-on-primary px-3 py-1 rounded text-xs font-headline font-bold uppercase tracking-widest">
                {boletin.rank.replace(/-/g, '\u2011')}
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded text-xs font-headline font-bold">
                {boletin.identifier}
              </span>
              <span className={`px-3 py-1 rounded text-xs font-headline font-bold flex items-center gap-1 ${statusInfo.className}`}>
                {boletin.status === 'in_force' && (
                  <span className="material-symbols-outlined text-[14px] icon-fill">check_circle</span>
                )}
                {statusInfo.label}
              </span>
              <Link
                to="/uso-ia"
                className="px-3 py-1 rounded text-xs font-headline font-bold flex items-center gap-1 bg-surface-container text-on-surface-variant border border-outline-variant/30 hover:border-primary/40 hover:text-primary transition-colors"
                title="Este contenido ha sido generado automáticamente por IA sin revisión humana previa"
              >
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                Asistido por IA
              </Link>
            </div>

            <div className="mb-3">
              <p className="font-headline font-bold text-secondary text-sm uppercase tracking-widest mb-1">
                {boletin.department}
              </p>
              <h1 className="font-headline text-5xl md:text-7xl font-black text-primary leading-[1.1] tracking-tighter max-w-5xl">
                {boletin.visible_title || boletin.title}
              </h1>
            </div>
            {boletin.visible_title ? 
            <div className="mb-9">
              <p className="font-headline font-bold text-secondary text-sm uppercase tracking-widest mb-1">
                {boletin.title}
              </p>
            </div> : null}

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-secondary font-headline text-sm border-y border-outline-variant/30 py-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>Publicado: {formatDate(boletin.publication_date)}</span>
              </div>
              {boletin.last_updated && (
                <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-8">
                  <span className="material-symbols-outlined text-sm">update</span>
                  <span>Última actualización: {formatDate(boletin.last_updated)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-8">
                <span className="material-symbols-outlined text-sm">tag</span>
                <span>Ref: {boletin.official_number}</span>
              </div>
            </div>

            <p className="font-body italic text-2xl md:text-3xl text-secondary mt-8 max-w-5xl leading-relaxed">
              {boletin.summary}
            </p>
          </header>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <section className="lg:col-span-8 space-y-16">

              <ImpactCards
                citizenImpact={boletin.citizen_impact}
                professionalImpact={boletin.professional_impact}
              />

              {article && <ArticleSection content={article} id="articulo" />}

              {updates && <ArticleSection content={updates} title="Actualizaciones de la Ley" id="actualizaciones" />}

              {critical && <ArticleSection content={critical} title="Análisis Crítico" id="critica" />}

              {boletin.key_points?.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-[2px] w-12 bg-primary" />
                    <h2 className="font-headline text-xl font-bold text-primary uppercase tracking-widest">
                      Puntos Clave del Texto Refundido
                    </h2>
                  </div>
                  <KeyPointsList points={boletin.key_points} />
                </div>
              )}              

              {boletin.procedures?.length > 0 && (
                <section className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-primary" />
                    <h2 className="font-headline text-xl font-bold text-primary uppercase tracking-widest">
                      Guía de Trámites y Procedimientos
                    </h2>
                  </div>
                  {boletin.procedures.map((proc) => (
                    <ProcedureCard key={proc.name} name={proc.name} steps={proc.steps} />
                  ))}
                </section>
              )}
            </section>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
              {boletin.main_obligations && (
                <div className="bg-tertiary-container text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined" style={{ fontSize: '9rem' }}>gavel</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined">priority_high</span>
                    <h2 className="font-headline text-lg font-bold uppercase tracking-widest">
                      Obligaciones Críticas
                    </h2>
                  </div>
                  <p className="font-body text-lg italic text-on-tertiary-container/80 leading-relaxed">
                    {boletin.main_obligations}
                  </p>
                </div>
              )}

              <div className="bg-white p-8 rounded-xl shadow-[0_20px_40px_rgba(24,28,30,0.06)] border border-outline-variant/15">
                <div className="space-y-4">
                  <a
                    href={boletin.source}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-lg font-headline font-bold text-sm flex items-center justify-center gap-3 shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    <span className="material-symbols-outlined">open_in_new</span>
                    Ver en fuente oficial
                  </a>
                  <button className="w-full py-4 px-6 bg-surface-container-high text-primary rounded-lg font-headline font-bold text-sm flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-all">
                    <span className="material-symbols-outlined">bookmark</span>
                    Guardar en Mi Carpeta
                  </button>
                </div>

                {boletin.keywords?.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-outline-variant/20">
                    <span className="text-xs font-headline font-bold text-secondary uppercase tracking-widest block mb-4">
                      Palabras clave
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {boletin.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="bg-surface-container px-3 py-1 rounded-full text-xs font-headline text-on-surface-variant"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {(boletin.derogatons?.length > 0 || boletin.legal_references?.length > 0) && (
            <LegalContext
              derogations={boletin.derogatons ?? []}
              legalRefs={boletin.legal_references ?? []}
            />
          )}

          <div className="mt-16 mb-10 flex items-start gap-4 bg-surface-container rounded-xl p-6 border border-outline-variant/20 lg:w-8/12">
            <span className="material-symbols-outlined text-2xl text-on-surface-variant flex-shrink-0 mt-0.5">auto_awesome</span>
            <div className="font-body text-sm text-on-surface-variant leading-relaxed">
              <span className="font-bold text-on-surface">Aviso de contenido generado por IA —</span>{' '}
              Ninguna persona revisa ni aprueba los artículos individuales antes de su publicación. El sistema opera de forma autónoma dentro de las directrices definidas por el titular del sitio.{' '}
              <Link to="/uso-ia" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Más información sobre nuestro uso de la IA.
              </Link>
            </div>
          </div>

          <div className="mt-4">
            <Link
              to="/feed"
              className="inline-flex items-center gap-2 text-primary font-headline font-bold hover:gap-3 transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver al feed
            </Link>
          </div>
        </main>
      )}

      <Footer />
    </>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Boletines', to: '/boletines' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center h-20 px-8 w-full max-w-screen-2xl mx-auto">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-primary font-headline uppercase select-none"
          >
            ÁGORA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => {
              const active = pathname === to || (to !== '/' && pathname.startsWith(to.split('#')[0]))
              return (
                <Link
                  key={to}
                  to={to}
                  className={`font-headline tracking-tight font-bold text-sm uppercase transition-colors pb-1 ${
                    active
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-1">
            <button className="hidden md:flex p-2 hover:bg-surface-container-low rounded-lg transition-all text-primary">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="hidden md:flex p-2 hover:bg-surface-container-low rounded-lg transition-all">
              <span className="material-symbols-outlined text-primary icon-fill">account_circle</span>
            </button>

            {/* Mobile: Boletines shortcut + hamburger */}
            <Link
              to="/boletines"
              className="md:hidden flex items-center gap-1.5 bg-primary text-on-primary px-3 py-2 rounded-lg font-headline font-bold text-xs uppercase tracking-tight mr-2"
            >
              <span className="material-symbols-outlined text-[16px]">article</span>
              Boletines
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 hover:bg-surface-container-low rounded-lg transition-all text-primary"
              aria-label="Menú"
            >
              <span className="material-symbols-outlined">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-on-surface/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-outline-variant/10 shadow-xl">
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(({ label, to }) => {
                const active = pathname === to || (to !== '/' && pathname.startsWith(to.split('#')[0]))
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-headline font-bold text-sm uppercase tracking-tight transition-all ${
                      active
                        ? 'bg-primary/8 text-primary'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        arrow_forward
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="px-6 pb-5 pt-1 flex gap-3 border-t border-outline-variant/10">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-container-low rounded-xl font-headline font-bold text-sm text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                Alertas
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-container-low rounded-xl font-headline font-bold text-sm text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px] icon-fill">account_circle</span>
                Mi cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

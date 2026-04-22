import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full mt-32 bg-slate-50 border-t border-outline-variant/10">
      <div className="max-w-screen-xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6 max-w-sm">
          <div className="text-2xl font-black tracking-tighter text-primary font-headline uppercase">
            ÁGORA
          </div>
          <p className="font-body italic text-lg text-slate-500 leading-relaxed">
            Haciendo que la información pública sea realmente pública y comprensible para todos los ciudadanos.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm">rss_feed</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-headline text-xs font-bold uppercase text-primary mb-6 tracking-widest">
              Institucional
            </h5>
            <ul className="space-y-3">
              <li>
                <Link to="/uso-ia" className="text-slate-500 hover:text-primary font-body text-base hover:underline underline-offset-4 decoration-primary/30 transition-colors">
                  Uso de IA
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-slate-500 hover:text-primary font-body text-base hover:underline underline-offset-4 decoration-primary/30 transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link to="/aviso-legal" className="text-slate-500 hover:text-primary font-body text-base hover:underline underline-offset-4 decoration-primary/30 transition-colors">
                  Aviso Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 pb-10 border-t border-outline-variant/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 font-headline text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} AGORA. Simplificación Administrativa.
        </p>
        <div className="flex items-center gap-2 text-primary font-bold font-headline text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Sistemas en línea y actualizados
        </div>
      </div>
    </footer>
  )
}

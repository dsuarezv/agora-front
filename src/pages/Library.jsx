import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const categoryCards = [
  {
    span: 'md:col-span-2 md:row-span-2',
    bg: 'bg-primary-container text-white',
    icon: 'home',
    iconFill: true,
    title: 'Vivienda',
    subtitle: 'Planes estatales y ayudas al alquiler.',
    count: 12,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
  },
  {
    bg: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-colors duration-300',
    icon: 'work',
    title: 'Empleo',
    count: '04',
    arrow: true,
  },
  {
    bg: 'bg-tertiary-fixed text-on-tertiary-fixed border-l-4 border-tertiary',
    icon: 'history_edu',
    iconFill: true,
    title: 'Legislación',
    count: 28,
    arrow: true,
  },
  {
    span: 'md:col-span-2',
    bg: 'bg-surface-container-high',
    icon: 'school',
    iconColor: 'text-primary',
    title: 'Becas y Formación',
    subtitle: '7 nuevas convocatorias encontradas.',
    wide: true,
  },
]

const bulletins = [
  {
    ref: 'BOE-A-2024-1234',
    refBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    date: '12 OCT 2024',
    title: 'Modificación del Plan Estatal de acceso a la vivienda 2022-2025.',
    description:
      'Actualización de las cuantías máximas para el Bono Alquiler Joven y criterios de vulnerabilidad económica.',
    status: { text: 'Trámite Abierto', bg: 'bg-secondary-container text-on-secondary-fixed-variant', pulse: true },
    actions: ['download', 'share', 'bookmark'],
    bookmarkColor: 'text-tertiary hover:bg-tertiary',
  },
  {
    ref: 'BOE-B-2024-8892',
    refBg: 'bg-surface-container-high text-on-surface-variant',
    date: '05 OCT 2024',
    title: 'Convocatoria extraordinaria de plazas para el Cuerpo de Administradores Civiles.',
    description:
      'Listado provisional de admitidos y excluidos. Fecha prevista de examen: Enero 2025.',
    status: { text: 'Finalizado', bg: 'bg-surface-container-high text-on-surface-variant', pulse: false },
    actions: ['download', 'bookmark'],
    bookmarkColor: 'text-tertiary hover:bg-tertiary',
  },
]

const alerts = [
  {
    urgent: true,
    label: 'VENCE EN 2 DÍAS',
    title: 'Subvenciones Digitaliza-T',
    description: 'Presentación de justificación económica.',
  },
  {
    urgent: false,
    label: '15 NOV 2024',
    title: 'Renovación Abono Transporte',
    description: 'Apertura de plazo para familias numerosas.',
  },
]

const activity = [
  { time: 'Hace 2 horas', text: 'Descargaste el BOE-A-2024-1234 en formato PDF.', active: true },
  { time: 'Ayer, 14:30', text: 'Añadiste "Becas de Movilidad" a la categoría Favoritos.', active: false },
  { time: '12 Oct 2024', text: 'Cambio de estado en trámite: "En Revisión".', active: false },
]

export default function Library() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto">
        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-6xl font-black tracking-tight font-headline text-primary mb-4">Mi Biblioteca</h1>
          <p className="text-2xl font-body text-secondary max-w-2xl italic">
            Su archivo curado de normativas, becas y anuncios oficiales. Gestionado para una consulta eficiente.
          </p>
        </header>

        {/* Category Bento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {/* Vivienda — large */}
          <div className="md:col-span-2 md:row-span-2 bg-primary-container rounded-xl p-8 text-white relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-50" />
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80"
              alt="Edificio residencial"
              className="absolute -right-12 -bottom-12 w-64 h-64 object-cover rounded-full opacity-20 grayscale group-hover:scale-110 transition-transform duration-700"
            />
            <div className="relative z-10 h-full flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="material-symbols-outlined text-4xl mb-4 icon-fill block">home</span>
                <h3 className="text-3xl font-bold font-headline mb-2">Vivienda</h3>
                <p className="font-body text-lg italic opacity-90">Planes estatales y ayudas al alquiler.</p>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-black">12</span>
                <span className="text-sm uppercase tracking-widest font-bold opacity-70">Elementos</span>
              </div>
            </div>
          </div>

          {/* Empleo */}
          <div className="bg-secondary-container rounded-xl p-6 text-on-secondary-container flex flex-col justify-between hover:bg-secondary-fixed transition-colors duration-300 cursor-pointer">
            <div>
              <span className="material-symbols-outlined text-3xl mb-3 block">work</span>
              <h3 className="text-xl font-bold font-headline">Empleo</h3>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">04</span>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </div>
          </div>

          {/* Legislación */}
          <div className="bg-tertiary-fixed rounded-xl p-6 text-on-tertiary-fixed flex flex-col justify-between border-l-4 border-tertiary cursor-pointer">
            <div>
              <span className="material-symbols-outlined text-3xl mb-3 icon-fill block">history_edu</span>
              <h3 className="text-xl font-bold font-headline">Legislación</h3>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">28</span>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </div>
          </div>

          {/* Becas */}
          <div className="md:col-span-2 bg-surface-container-high rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary">school</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline">Becas y Formación</h3>
                <p className="font-body italic text-secondary">7 nuevas convocatorias encontradas.</p>
              </div>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-md font-bold text-sm tracking-tight hover:opacity-90 transition-opacity">
              VER TODO
            </button>
          </div>
        </div>

        {/* Main + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Saved Bulletins */}
          <div className="flex-grow">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-black font-headline text-primary">Documentos Recientes</h2>
              <button className="text-sm font-bold text-secondary flex items-center space-x-2 hover:text-primary transition-colors">
                <span>ORDENAR POR FECHA</span>
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
            <div className="space-y-8">
              {bulletins.map((b) => (
                <div
                  key={b.ref}
                  className="group bg-surface-container-lowest p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(24,28,30,0.06)]"
                >
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`${b.refBg} text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter`}
                      >
                        {b.ref}
                      </span>
                      <span className="text-outline text-xs font-bold uppercase">{b.date}</span>
                    </div>
                    <h4 className="text-2xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors leading-tight mb-2">
                      {b.title}
                    </h4>
                    <p className="font-body text-secondary text-lg leading-relaxed max-w-3xl">{b.description}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-4 min-w-[180px]">
                    <span
                      className={`flex items-center space-x-2 ${b.status.bg} px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          b.status.pulse ? 'bg-primary animate-pulse' : 'bg-outline'
                        }`}
                      />
                      <span>{b.status.text}</span>
                    </span>
                    <div className="flex space-x-2">
                      {b.actions.includes('download') && (
                        <button className="p-3 bg-surface-container-high rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                          <span className="material-symbols-outlined">download</span>
                        </button>
                      )}
                      {b.actions.includes('share') && (
                        <button className="p-3 bg-surface-container-high rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                          <span className="material-symbols-outlined">share</span>
                        </button>
                      )}
                      {b.actions.includes('bookmark') && (
                        <button
                          className={`p-3 bg-surface-container-high rounded-lg ${b.bookmarkColor} hover:text-white transition-all`}
                        >
                          <span className="material-symbols-outlined icon-fill">bookmark</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[380px] space-y-12 flex-shrink-0">
            {/* Alerts */}
            <section>
              <h3 className="text-sm font-black tracking-[0.2em] text-outline uppercase mb-6 flex items-center">
                <span className="material-symbols-outlined mr-2 text-tertiary">notification_important</span>
                Alertas Próximas
              </h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.title}
                    className={`p-5 rounded-xl ${
                      alert.urgent
                        ? 'bg-tertiary-fixed/30 border-l-4 border-tertiary'
                        : 'bg-surface-container'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`font-bold text-xs uppercase tracking-tight ${
                          alert.urgent ? 'text-tertiary' : 'text-outline'
                        }`}
                      >
                        {alert.label}
                      </span>
                      {alert.urgent && (
                        <span className="material-symbols-outlined text-tertiary scale-75">timer</span>
                      )}
                    </div>
                    <p className="font-headline font-bold text-on-surface-variant text-sm mb-1">{alert.title}</p>
                    <p className="font-body italic text-xs text-secondary">{alert.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Activity */}
            <section>
              <h3 className="text-sm font-black tracking-[0.2em] text-outline uppercase mb-6 flex items-center">
                <span className="material-symbols-outlined mr-2">history</span>
                Actividad Reciente
              </h3>
              <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-outline-variant">
                {activity.map(({ time, text, active }) => (
                  <div key={time} className="relative">
                    <div
                      className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full ring-4 ring-surface ${
                        active ? 'bg-primary' : 'bg-outline-variant'
                      }`}
                    />
                    <p className="text-xs text-outline font-bold uppercase mb-1">{time}</p>
                    <p className="text-sm font-bold font-headline">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
      <Footer />

      {/* FAB */}
      <div className="fixed bottom-10 right-10">
        <button className="bg-primary-container text-white h-16 w-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </>
  )
}

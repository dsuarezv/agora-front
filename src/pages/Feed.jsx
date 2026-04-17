import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const filterCards = [
  { icon: 'euro', label: 'Ayudas y Subvenciones', active: false },
  { icon: 'dashboard', label: 'Todas las Novedades', active: true },
  { icon: 'work', label: 'Empleo Público', active: false },
  { icon: 'gavel', label: 'Legislación Vivienda', active: false },
  { icon: 'edit_note', label: 'Mis Trámites', active: false },
]

const bulletins = [
  {
    id: 'BOC-j-2000-90006',
    urgent: false,
    badge: { text: 'Urgente', bg: 'bg-tertiary text-on-tertiary' },
    category: { text: 'Gestión de suelo y edificación', bg: 'bg-surface-container text-on-surface-variant' },
    ref: 'BOC-j-2000-90006',
    title: 'Ordenación del Territorio y Espacios Naturales de Canarias',
    description:
      'Esta norma unifica las reglas para organizar el uso del suelo y proteger la naturaleza en Canarias. Establece que la conservación ambiental tiene prioridad sobre el desarrollo urbanístico, limitando estrictamente qué y dónde se puede construir. Regula la transformación de terrenos rústicos, la gestión de proyectos urbanísticos y las sanciones por incumplimientos. Su objetivo es evitar la especulación y garantizar un equilibrio entre el crecimiento económico y la protección del entorno natural.',
    why: 'Podrías ahorrar una media de 1.200€ en tu instalación si solicitas el trámite antes de que agote el cupo provincial.',
    whyIcon: 'psychology',
    whyColor: 'text-tertiary',
    whyBg: 'bg-surface-container-low',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    imageAlt: 'Paneles solares en techo moderno',
    imageFilter: 'grayscale-[0.3]',
    borderAccent: 'before:absolute before:top-0 before:left-0 before:w-2 before:h-full before:bg-tertiary',
    reverse: false,
    overlayColor: 'bg-primary/10',
  },
  {
    id: '2',
    badge: { text: 'Subsidio', bg: 'bg-primary text-on-primary' },
    category: { text: 'Cultura', bg: 'bg-secondary-container text-on-secondary-container' },
    ref: 'BOE-B-2024-5678',
    title: 'Activación del Bono Cultural Joven: Plazos y requisitos de la convocatoria',
    description:
      'Los ciudadanos que cumplan 18 años durante el presente ejercicio fiscal ya pueden solicitar el monedero digital de 400€ destinado a la adquisición de productos culturales, artes escénicas y consumo digital.',
    why: 'Es una asignación directa por edad. El registro solo requiere Cl@ve o certificado digital y se resuelve en menos de 15 días.',
    whyIcon: 'volunteer_activism',
    whyColor: 'text-primary',
    whyBg: 'bg-secondary-container/30',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
    imageAlt: 'Concierto cultural',
    imageFilter: '',
    reverse: true,
    overlayColor: 'bg-primary/10',
  },
  {
    id: '3',
    badge: { text: 'Normativa', bg: 'bg-secondary text-on-secondary' },
    category: { text: 'Movilidad', bg: 'bg-surface-container text-on-surface-variant' },
    ref: 'DGT-2024-09',
    title: 'Actualización del Reglamento General de Circulación: Nuevas zonas de bajas emisiones',
    description:
      'Entran en vigor las restricciones definitivas para vehículos sin etiqueta ambiental en municipios de más de 50.000 habitantes, armonizando las sanciones en todo el territorio nacional.',
    why: 'Deberás revisar el distintivo de tu vehículo si planeas circular por cascos urbanos. Se unifican las multas a 200€ por acceso indebido.',
    whyIcon: 'directions_car',
    whyColor: 'text-outline',
    whyBg: 'bg-surface-container',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    imageAlt: 'Calle urbana con poco tráfico',
    imageFilter: 'grayscale-[0.5]',
    reverse: false,
    overlayColor: 'bg-primary/5',
  },
]

export default function Feed() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
        {/* Hero */}
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-4xl">
              <h1 className="font-headline text-7xl md:text-[5.5rem] font-black tracking-tighter leading-none text-primary mb-6">
                Tu Centro de Claridad
              </h1>
              <p className="font-body italic text-2xl md:text-3xl text-secondary max-w-2xl leading-relaxed">
                Navegamos la complejidad administrativa para entregarte solo lo que transforma tu día a día.
              </p>
            </div>
            <div className="hidden md:block pb-4">
              <div className="bg-secondary-container p-6 rounded-xl flex items-center gap-4">
                <div className="bg-primary p-3 rounded-lg text-on-primary">
                  <span className="material-symbols-outlined icon-fill">bolt</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-sm uppercase tracking-wider text-on-secondary-fixed">
                    Estado Actual
                  </p>
                  <p className="font-body text-lg">3 actualizaciones críticas hoy</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Filter Cards */}
        <section className="mb-24">
          <h2 className="font-headline font-bold text-sm uppercase tracking-[0.2em] text-outline mb-8">
            Personalizar mi vista
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {filterCards.map(({ icon, label, active }) => (
              <button
                key={label}
                className={`group p-6 rounded-xl transition-all duration-300 text-left flex flex-col justify-between h-40 ${
                  active
                    ? 'bg-primary text-white shadow-lg scale-105 z-10'
                    : 'bg-surface-container-lowest hover:bg-primary hover:text-white shadow-sm'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl ${
                    active ? 'icon-fill' : 'text-primary group-hover:text-white'
                  } transition-colors`}
                >
                  {icon}
                </span>
                <span className="font-headline font-bold text-lg leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Bulletin Feed */}
        <section className="space-y-12">
          {bulletins.map((b) => (
            <article
              key={b.id}
              className={`relative bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col ${
                b.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
              } min-h-[400px]`}
            >
              {b.urgent && (
                <div className="absolute top-0 left-0 w-2 h-full bg-tertiary z-10" />
              )}
              <div className={`flex-1 p-8 md:p-12 flex flex-col justify-between ${b.urgent ? 'pl-12 md:pl-16' : ''}`}>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span
                      className={`${b.badge.bg} px-3 py-1 font-headline font-bold text-xs uppercase tracking-widest rounded-sm`}
                    >
                      {b.badge.text}
                    </span>
                    <span
                      className={`${b.category.bg} px-3 py-1 font-headline font-bold text-xs uppercase tracking-widest rounded-sm`}
                    >
                      {b.category.text}
                    </span>
                    <span className="font-headline font-bold text-sm text-outline ml-auto">{b.ref}</span>
                  </div>
                  <h3 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                    {b.title}
                  </h3>
                  <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-8">{b.description}</p>
                </div>
                <div className={`${b.whyBg} p-6 rounded-xl flex items-start gap-5`}>
                  <div className={b.whyColor}>
                    <span className="material-symbols-outlined text-3xl">{b.whyIcon}</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-primary text-sm uppercase mb-1">¿Por qué te afecta?</p>
                    <p className="font-body text-lg italic text-secondary">{b.why}</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 bg-surface-container relative min-h-[240px]">
                <img
                  src={b.image}
                  alt={b.imageAlt}
                  className={`w-full h-full object-cover ${b.imageFilter} transition-all absolute inset-0`}
                />
                <div className={`absolute inset-0 ${b.overlayColor}`} />
                <Link
                  to={`/boletin/${b.id}`}
                  className="absolute bottom-4 right-4 bg-primary text-on-primary px-4 py-2 rounded-lg font-headline font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2 z-10"
                >
                  Leer más <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-32 bg-primary rounded-2xl p-12 md:p-24 text-center text-on-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-[100px] -mr-32 -mt-32 opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Que no se te escape lo importante
            </h2>
            <p className="font-body text-xl opacity-80 mb-10">
              Recibe cada lunes un resumen editorial de los cambios legales que realmente afectan a tu perfil
              profesional y personal.
            </p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu correo institucional o personal"
                className="flex-1 bg-white/10 border-0 rounded-md px-6 py-4 font-body text-lg focus:ring-2 focus:ring-on-primary-container placeholder:text-white/40 text-white outline-none"
              />
              <button
                type="submit"
                className="bg-white text-primary font-headline font-bold py-4 px-8 rounded-md hover:bg-primary-fixed transition-colors"
              >
                Suscribirme ahora
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

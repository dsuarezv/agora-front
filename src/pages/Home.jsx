import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const categories = [
  {
    id: 'vivienda',
    span: 'md:col-span-8',
    bg: 'bg-primary text-on-primary',
    icon: 'home',
    badge: '5 nuevas actualizaciones',
    title: 'Vivienda y Alquiler',
    description:
      'Guía completa sobre la Ley de Vivienda, ayudas al alquiler joven y subvenciones para rehabilitación energética.',
    footer: 'Lo último: Nueva convocatoria de fondos NextGen para fachadas.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: 'empleo',
    span: 'md:col-span-4',
    bg: 'bg-surface-container-highest',
    icon: 'work',
    title: 'Empleo Público',
    description: 'Calendario actualizado de oposiciones, ofertas locales y bolsas de trabajo estatales.',
    footer: 'Cuerpo de Gestión Administrativa (15/10)',
    footerLabel: 'Próximo Cierre',
  },
]

const steps = [
  {
    icon: 'description',
    bg: 'bg-surface-container-lowest border border-outline-variant/10',
    iconColor: 'text-primary',
    title: 'BOE Farragoso',
    description: 'Monitorizamos las páginas oficiales cada día buscando novedades críticas.',
  },
  {
    icon: 'auto_awesome',
    bg: 'bg-primary',
    iconColor: 'text-on-primary',
    title: 'Simplificación Editorial',
    description: 'Nuestros agentes de IA traducen la norma a lenguaje natural.',
  },
  {
    icon: 'notification_important',
    bg: 'bg-surface-container-lowest border border-outline-variant/10',
    iconColor: 'text-primary',
    title: 'Alerta Ciudadana',
    description: 'Recibes exactamente lo que te afecta, listo para ser solicitado o aplicado.',
  },
]

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface to-secondary-fixed opacity-40" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <span className="font-headline text-sm font-bold text-primary tracking-widest uppercase mb-6 block">
            Información que pertenece a las personas
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface leading-[1.1] tracking-tighter mb-8">
            La claridad oficial,{' '}
            <br />
            <span className="text-primary italic font-body font-normal">sin laberintos.</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            Transformamos el lenguaje administrativo en soluciones directas para tu día a día. Encuentra ayudas,
            empleos y leyes traducidas para ciudadanos.
          </p>

          {/* Search */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-surface-tint rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-surface-container-lowest rounded-xl shadow-2xl p-2 border border-outline-variant/20">
                <span className="material-symbols-outlined ml-4 text-primary text-3xl">search</span>
                <input
                  type="text"
                  placeholder="¿Qué necesitas hoy? Ej: 'Ayudas para alquiler joven'"
                  className="w-full bg-transparent border-none focus:ring-0 text-xl font-body py-4 px-4 text-on-surface placeholder:text-outline/50 outline-none"
                />
                <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-headline font-bold flex items-center gap-2 hover:bg-primary-container transition-all whitespace-nowrap">
                  Consultar
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="text-on-surface-variant text-sm font-headline">Tendencias:</span>
              {['#BonoAlquiler', '#Oposiciones2026', '#ReformaLaboral'].map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1 rounded-full text-xs font-bold hover:bg-primary-fixed transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/boletines"
                className="inline-flex items-center gap-2 font-headline font-bold text-sm text-secondary hover:text-primary transition-colors group"
              >
                <span className="material-symbols-outlined text-[18px]">article</span>
                O explora los{' '}
                <span className="text-primary underline underline-offset-4 decoration-primary/30 group-hover:decoration-primary transition-colors">
                  14.208 boletines disponibles
                </span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Figures */}
      <section className="bg-surface-container-low py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { value: '14,208', label: 'Boletines Simplificados' },
            { value: '2.4M', label: 'Ciudadanos Ayudados' },
            { value: '100%', label: 'Transparencia Real' },
          ].map(({ value, label }) => (
            <div key={label} className="space-y-2">
              <div className="font-headline text-5xl font-black text-primary tracking-tighter">{value}</div>
              <div className="font-headline text-xs font-bold uppercase tracking-widest text-secondary">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl font-black text-on-surface tracking-tighter mb-4">
              Ejes de Interés Ciudadano
            </h2>
            <p className="text-lg text-secondary">
              Priorizamos la información que impacta directamente en tu calidad de vida.
            </p>
          </div>
          <Link
            to="/boletines"
            className="text-primary font-bold font-headline flex items-center gap-2 group border-b-2 border-transparent hover:border-primary transition-all pb-1"
          >
            Ver todos los boletines{' '}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Vivienda */}
          <div className="md:col-span-8 group cursor-pointer">
            <div className="relative h-96 rounded-xl overflow-hidden bg-primary text-on-primary p-12 flex flex-col justify-end">
              <div className="absolute top-10 right-10 opacity-10 scale-[4] group-hover:scale-[4.5] transition-transform duration-700">
                <span className="material-symbols-outlined text-9xl">home</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                alt="Edificio residencial"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="relative z-10">
                <span className="bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                  5 nuevas actualizaciones
                </span>
                <h3 className="font-headline text-4xl font-bold mb-4">Vivienda y Alquiler</h3>
                <p className="font-body text-xl max-w-lg opacity-80 mb-6">
                  Guía completa sobre la Ley de Vivienda, ayudas al alquiler joven y subvenciones para rehabilitación
                  energética.
                </p>
                <div className="flex gap-4 items-center">
                  <span className="material-symbols-outlined">trending_up</span>
                  <span className="font-headline text-sm font-semibold">
                    Lo último: Nueva convocatoria de fondos NextGen para fachadas.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Empleo */}
          <div className="md:col-span-4 group cursor-pointer">
            <div className="relative h-96 rounded-xl overflow-hidden bg-surface-container-highest p-10 flex flex-col justify-between border border-outline-variant/10">
              <div>
                <span className="material-symbols-outlined text-primary text-5xl mb-6 icon-fill block">work</span>
                <h3 className="font-headline text-2xl font-black text-on-surface tracking-tight mb-2">
                  Empleo Público
                </h3>
                <p className="text-secondary leading-relaxed">
                  Calendario actualizado de oposiciones, ofertas locales y bolsas de trabajo estatales.
                </p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <p className="text-xs font-bold font-headline uppercase text-primary tracking-widest mb-2">
                  Próximo Cierre
                </p>
                <p className="font-headline font-bold text-on-surface">
                  Cuerpo de Gestión Administrativa (15/10)
                </p>
              </div>
            </div>
          </div>

          {/* Ayudas */}
          <div className="md:col-span-12 group cursor-pointer">
            <div className="relative bg-secondary-container rounded-xl overflow-hidden p-8 flex flex-col md:flex-row items-center gap-8 border border-primary/5">
              <div className="flex-1">
                <h3 className="font-headline text-3xl font-black text-on-secondary-fixed-variant mb-4">
                  Ayudas, Becas y Subvenciones
                </h3>
                <p className="font-body text-lg text-secondary mb-6">
                  Un buscador simplificado para no perder ninguna oportunidad por falta de entendimiento legal.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: 'school', color: 'text-tertiary', label: 'Educación', title: 'Becas MEC 24/25' },
                    { icon: 'family_restroom', color: 'text-primary', label: 'Familia', title: 'Cheque Bebé Extendido' },
                  ].map(({ icon, color, label, title }) => (
                    <div
                      key={icon}
                      className="bg-surface-container-lowest px-6 py-4 rounded-xl flex items-center gap-4 shadow-sm border border-outline-variant/10"
                    >
                      <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                      <div>
                        <p className="text-xs font-bold uppercase text-outline">{label}</p>
                        <p className="font-headline font-bold">{title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
                  alt="Estudiante con libros"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 bg-surface">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl font-black text-on-surface tracking-tighter mb-4">
              El Proceso de Claridad
            </h2>
            <p className="text-lg text-secondary italic font-body">
              De la jerga administrativa a la acción ciudadana.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-outline-variant/20 via-primary/30 to-outline-variant/20 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
              {steps.map(({ icon, bg, iconColor, title, description }) => (
                <div key={title} className="text-center">
                  <div
                    className={`w-24 h-24 ${bg} rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl`}
                  >
                    <span className={`material-symbols-outlined text-4xl ${iconColor}`}>{icon}</span>
                  </div>
                  <h4 className="font-headline text-xl font-bold mb-4">{title}</h4>
                  <p className="text-secondary font-body">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-primary py-20 px-12">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:24px_24px]" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-black text-on-primary tracking-tighter mb-6 leading-tight">
                No vuelvas a perder una ayuda por no entender el boletín oficial.
              </h2>
              <p className="text-primary-fixed text-xl font-body opacity-90">
                Únete a más de 500,000 ciudadanos informados con nuestro boletín semanal gratuito.
              </p>
            </div>
            <div className="w-full lg:w-auto bg-surface-container-lowest/10 backdrop-blur-xl p-8 rounded-2xl border border-on-primary/10">
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="bg-surface-container-lowest text-on-surface px-6 py-4 rounded-lg font-headline w-full lg:w-80 focus:ring-2 focus:ring-primary-fixed border-none outline-none"
                />
                <button
                  type="submit"
                  className="bg-on-primary text-primary px-8 py-4 rounded-lg font-headline font-black uppercase tracking-widest text-sm hover:bg-primary-fixed transition-colors"
                >
                  Suscribirme ahora
                </button>
                <p className="text-[10px] text-on-primary/60 text-center font-headline uppercase tracking-tighter">
                  Respetamos tu privacidad. Sin spam, solo claridad.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

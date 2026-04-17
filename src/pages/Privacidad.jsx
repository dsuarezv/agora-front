import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-screen-md mx-auto px-8 pt-32 pb-24">
        <div className="mb-12">
          <span className="font-headline text-xs font-bold uppercase text-primary tracking-widest">
            Marco Legal
          </span>
          <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-3 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-slate-500 font-body text-lg">
            Última actualización: abril de 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none font-body space-y-10">

          <section className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6">
            <p className="text-slate-700 font-body text-base leading-relaxed">
              <strong>La privacidad es un derecho, no una concesión.</strong> Este sitio no rastrea a sus visitantes,
              no vende datos y no utiliza ninguna herramienta de analítica invasiva. A continuación explicamos
              exactamente qué ocurre con su información cuando visita este portal.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">1. Responsable del tratamiento</h2>
            <p className="text-slate-600 leading-relaxed">
              El titular de este sitio web, con domicilio en España, es el responsable del tratamiento de los datos
              personales recogidos a través de este portal. Puede contactar con el responsable en:{' '}
              <a href="mailto:privacidad@elestado.es" className="text-primary underline underline-offset-4">
                privacidad@elestado.es
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">2. Qué datos NO recogemos</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Este sitio no utiliza Google Analytics, Facebook Pixel ni ningún otro servicio de analítica de terceros.
              No recogemos ni almacenamos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Direcciones IP en texto claro ni perfiles de usuario.</li>
              <li>Cookies de seguimiento o identificadores publicitarios.</li>
              <li>Datos de geolocalización.</li>
              <li>Datos biométricos.</li>
              <li>Información sobre comportamiento de navegación fuera de este sitio.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">3. Datos que sí podemos tratar</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-headline font-bold text-slate-700 mb-1">Registros de servidor (logs técnicos)</h3>
                <p className="text-slate-600 leading-relaxed">
                  El servidor web genera registros técnicos que pueden incluir direcciones IP de forma anonimizada
                  mediante hash criptográfico. Estos registros se conservan durante un máximo de <strong>7 días</strong> con
                  fines de seguridad y diagnóstico técnico, y no se utilizan para perfilar usuarios.
                </p>
              </div>
              <div>
                <h3 className="font-headline font-bold text-slate-700 mb-1">Comunicaciones directas</h3>
                <p className="text-slate-600 leading-relaxed">
                  Si nos escribe por correo electrónico, conservaremos los datos necesarios para gestionar su consulta
                  durante un máximo de <strong>2 años</strong>, salvo que la ley exija un plazo distinto o usted solicite
                  su supresión antes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">4. Cesión de datos</h2>
            <p className="text-slate-600 leading-relaxed">
              No vendemos ni cedemos sus datos a terceros con fines comerciales. Los únicos destinatarios posibles son:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600">
              <li>El proveedor de alojamiento (hosting), en calidad de encargado del tratamiento.</li>
              <li>Las autoridades competentes, cuando así lo exija la ley.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">5. Sus derechos (RGPD)</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), puede ejercer
              en cualquier momento los siguientes derechos dirigiéndose a{' '}
              <a href="mailto:privacidad@elestado.es" className="text-primary underline underline-offset-4">
                privacidad@elestado.es
              </a>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Acceso</strong> (art. 15 RGPD): conocer qué datos tratamos sobre usted.</li>
              <li><strong>Rectificación</strong> (art. 16 RGPD): corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión</strong> (art. 17 RGPD): solicitar la eliminación de sus datos.</li>
              <li><strong>Limitación</strong> (art. 18 RGPD): restringir el tratamiento en ciertos supuestos.</li>
              <li><strong>Portabilidad</strong> (art. 20 RGPD): recibir sus datos en formato estructurado.</li>
              <li><strong>Oposición</strong> (art. 21 RGPD): oponerse al tratamiento de sus datos.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Si considera que el tratamiento de sus datos vulnera la normativa vigente, puede presentar una reclamación
              ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en{' '}
              <a href="https://www.aepd.es" className="text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                www.aepd.es
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">6. Seguridad</h2>
            <p className="text-slate-600 leading-relaxed">
              Este sitio utiliza conexión cifrada HTTPS. Los datos se almacenan en centros de datos ubicados en la
              Unión Europea y se aplican medidas técnicas y organizativas para proteger la información frente a
              accesos no autorizados, pérdida o destrucción.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">7. Cambios en esta política</h2>
            <p className="text-slate-600 leading-relaxed">
              Podemos actualizar esta política para reflejar cambios en la legislación o en nuestras prácticas. La
              fecha de la última revisión figura siempre al inicio de este documento. Le recomendamos que la consulte
              periódicamente.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

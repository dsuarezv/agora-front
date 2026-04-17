import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-screen-md mx-auto px-8 pt-32 pb-24">
        <div className="mb-12">
          <span className="font-headline text-xs font-bold uppercase text-primary tracking-widest">
            Marco Legal
          </span>
          <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-3 mb-4">
            Aviso Legal
          </h1>
          <p className="text-slate-500 font-body text-lg">
            Última actualización: abril de 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none font-body space-y-10">

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">1. Titularidad del sitio web</h2>
            <p className="text-slate-600 leading-relaxed">
              El presente sitio web es operado con carácter divulgativo y sin ánimo de lucro. Su titular es una persona física
              con residencia en España. Para cualquier comunicación de carácter legal puede contactar a través del correo
              electrónico <a href="mailto:legal@elestado.es" className="text-primary underline underline-offset-4">legal@elestado.es</a>.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">2. Carácter no comercial</h2>
            <p className="text-slate-600 leading-relaxed">
              Este portal no contiene publicidad, patrocinios ni enlaces de afiliados. No se obtiene ningún beneficio
              económico directo o indirecto de su operación. Su único propósito es facilitar el acceso ciudadano a la
              información pública oficial publicada en boletines oficiales del Estado español.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">3. Sistema autónomo basado en inteligencia artificial</h2>
            <p className="text-slate-600 leading-relaxed">
              Este sitio opera como un sistema editorial parcialmente autónomo que utiliza modelos de inteligencia
              artificial para procesar, resumir y clarificar contenido oficial publicado por las administraciones
              públicas españolas. El proceso incluye:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600">
              <li>Monitorización automatizada de boletines oficiales (BOE, BOJA y otros).</li>
              <li>Análisis y resumen de textos normativos mediante modelos de lenguaje de gran escala (LLMs).</li>
              <li>Generación de contenido simplificado destinado a facilitar la comprensión ciudadana.</li>
              <li>Revisión posterior a la publicación por parte del titular del sitio.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">
              El contenido generado está sujeto a revisión humana y se publica bajo la responsabilidad del titular.
              El uso de IA se declara expresamente en cumplimiento del <strong>Reglamento (UE) 2024/1689 de Inteligencia
              Artificial (Ley de IA de la UE), artículo 50</strong>, que exige transparencia cuando el contenido es
              generado o sustancialmente asistido por sistemas de IA.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">4. Propiedad intelectual</h2>
            <p className="text-slate-600 leading-relaxed">
              El diseño, código fuente, logotipos y elementos gráficos originales de este sitio están protegidos por
              la legislación española de propiedad intelectual. Los textos normativos reproducidos provienen de fuentes
              oficiales del Estado y son de dominio público conforme al artículo 13 del Real Decreto Legislativo
              1/1996 (Ley de Propiedad Intelectual). Los resúmenes y elaboraciones propias generadas con asistencia
              de IA tienen una protección de derechos de autor limitada, reconocida expresamente.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">5. Limitación de responsabilidad</h2>
            <p className="text-slate-600 leading-relaxed">
              El contenido de este sitio se ofrece con fines informativos y divulgativos. No constituye asesoramiento
              jurídico. El titular no garantiza la exactitud, completitud o actualidad de la información y no se
              responsabiliza de las decisiones tomadas en base a la misma. Para cuestiones jurídicas concretas, consulte
              siempre a un profesional del derecho.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              El titular no se responsabiliza del contenido de los sitios externos enlazados, en particular los portales
              oficiales del BOE o de organismos públicos, cuya gestión es ajena a este portal.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">6. Protección de datos</h2>
            <p className="text-slate-600 leading-relaxed">
              El tratamiento de datos personales se realiza de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la
              Ley Orgánica 3/2018 (LOPDGDD). Consulte nuestra{' '}
              <a href="/privacidad" className="text-primary underline underline-offset-4">Política de Privacidad</a> para
              más información.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">7. Ley aplicable y jurisdicción</h2>
            <p className="text-slate-600 leading-relaxed">
              El presente aviso legal se rige por la legislación española. Para cualquier controversia derivada del uso
              de este sitio web, las partes se someten a los juzgados y tribunales competentes de España, con renuncia
              expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

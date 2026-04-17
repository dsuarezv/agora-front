import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DivulgacionIA() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-screen-md mx-auto px-8 pt-32 pb-24">
        <div className="mb-12">
          <span className="font-headline text-xs font-bold uppercase text-primary tracking-widest">
            Transparencia
          </span>
          <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-3 mb-4">
            Declaración de uso de IA
          </h1>
          <p className="text-slate-500 font-body text-lg">
            Transparencia sobre cómo la inteligencia artificial genera el contenido de este sitio, en cumplimiento de las obligaciones del art. 50 del Reglamento UE de IA.
          </p>
          <p className="text-slate-400 font-body text-sm mt-3">Última actualización: enero de 2026</p>
        </div>

        <div className="mb-10 bg-primary text-on-primary rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-4xl mt-1">auto_awesome</span>
            <div>
              <h2 className="font-headline text-xl font-bold mb-2">Contenido generado íntegramente por IA</h2>
              <p className="font-body text-base leading-relaxed opacity-90">
                «Este proyecto utiliza la inteligencia artificial como herramienta, no como sustituto del criterio, los valores ni la responsabilidad.»
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10 bg-slate-50 rounded-2xl p-6 font-body text-slate-600 text-sm space-y-2">
          <p className="font-bold text-slate-800 text-base mb-3">Resumen</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">●</span> Los artículos de este sitio son generados automáticamente por IA.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">●</span> El contenido se publica sin revisión humana previa.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">●</span> El sistema opera de forma autónoma dentro de unas directrices predefinidas.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">●</span> La supervisión humana es reactiva: se corrige el contenido al recibir notificaciones.</li>
          </ul>
        </div>

        <div className="prose prose-slate max-w-none font-body space-y-10">

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">1. Sistemas de IA que utilizamos</h2>

            <p className="text-slate-600 leading-relaxed mb-4">
              Este sitio emplea sistemas de inteligencia artificial para crear su contenido. En concreto:
            </p>

            <h3 className="font-headline text-base font-bold text-slate-700 mb-2">Modelos de lenguaje (LLMs)</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Utilizamos los modelos Gemini de Google para generar, investigar y estructurar automáticamente los artículos.
            </p>

            <h3 className="font-headline text-base font-bold text-slate-700 mb-2">Selección de imágenes</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              La IA selecciona las imágenes más adecuadas de servicios de fotografía bajo licencia (principalmente Unsplash) en función del contenido de cada artículo.
            </p>

            <h3 className="font-headline text-base font-bold text-slate-700 mb-2">Planificación de publicaciones</h3>
            <p className="text-slate-600 leading-relaxed">
              Sistemas automatizados gestionan la programación de publicaciones y la distribución por categorías.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">2. Cómo se crea el contenido</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Este sitio web funciona como un sistema de IA totalmente autónomo. El flujo de trabajo es el siguiente:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-slate-600">
              <li>
                <strong>Detección autónoma de temas</strong>: los agentes de IA monitorizan continuamente las páginas oficiales del gobierno en busca de leyes nuevas o actualizadas.
              </li>
              <li>
                <strong>Generación de contenido</strong>: la IA produce artículos completos siguiendo directrices editoriales, reglas de estilo y controles de calidad predefinidos.
              </li>
              <li>
                <strong>Publicación automática</strong>: el contenido se publica directamente, sin revisión humana, incluyendo de forma automática la etiqueta de declaración de IA.
              </li>
            </ol>
            <p className="text-slate-600 leading-relaxed mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
              <strong>Aviso:</strong> ninguna persona revisa ni aprueba los artículos individuales antes de su publicación. El sistema opera de forma continua dentro de las directrices definidas por el titular del sitio.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">3. Modelo de supervisión humana</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Este sitio funciona de forma autónoma sin revisión humana previa a la publicación. La «exención editorial» prevista en el art. 50 del Reglamento UE de IA no resulta aplicable. Todo el contenido se declara expresamente como generado por IA.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              El titular del sitio ejerce la supervisión mediante:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Directrices predefinidas</strong>: pautas editoriales, políticas de contenido y reglas de calidad que la IA debe respetar.</li>
              <li><strong>Correcciones reactivas</strong>: respuesta ágil a los avisos de los usuarios sobre errores, inexactitudes o contenido inadecuado.</li>
              <li><strong>Canales de contacto</strong>: correo electrónico y redes sociales para recibir comentarios y solicitudes de corrección.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Si detecta algún contenido inexacto o problemático, por favor contáctenos de inmediato en{' '}
              <a href="mailto:legal@elestado.es" className="text-primary underline underline-offset-4">
                legal@elestado.es
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">4. Limitaciones y precisión</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Aunque nos esforzamos por ofrecer información precisa, el contenido asistido por IA tiene limitaciones inherentes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Los modelos pueden cometer errores o malinterpretar matices jurídicos complejos.</li>
              <li>El contenido puede quedar desactualizado si una norma es modificada o derogada.</li>
              <li>Los resúmenes simplifican deliberadamente: pueden omitir casos excepcionales o tecnicismos.</li>
              <li>La IA no tiene en cuenta su situación personal concreta.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4 font-medium">
              Para cualquier decisión con consecuencias jurídicas o económicas, consulte siempre el texto oficial íntegro y, si es necesario, a un profesional del derecho.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">5. Marcado legible por máquinas</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              En cumplimiento de los requisitos del Reglamento UE de IA sobre marcado legible por máquinas, nuestros artículos incluyen los siguientes metadatos estructurados:
            </p>
            <pre className="bg-slate-100 rounded-xl p-4 text-xs text-slate-700 overflow-x-auto leading-relaxed">{`{
  "@context": "https://schema.org",
  "@type": "Article",
  "isAccessibleForFree": true,
  "creativeWorkStatus": "Published",
  "sdPublisher": {
    "@type": "Organization",
    "name": "elestado.es"
  },
  "about": {
    "@type": "Thing",
    "description": "Contenido generado por IA"
  }
}`}</pre>
            <p className="text-slate-600 leading-relaxed mt-3 text-sm">
              Estos datos estructurados permiten a los motores de búsqueda y otros sistemas identificar el contenido generado por IA de forma programática.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">6. Marco normativo aplicable</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Esta declaración se realiza en cumplimiento de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Reglamento (UE) 2024/1689 de Inteligencia Artificial</strong> — art. 50: obligaciones de transparencia para los responsables del despliegue de sistemas de IA que generan texto destinado al público.
              </li>
              <li>
                <strong>Anteproyecto de Ley española de IA</strong> — requisitos nacionales de etiquetado de contenido generado por IA supervisados por la AESIA.
              </li>
              <li>
                <strong>Código de Buenas Prácticas de la Comisión Europea</strong> — directrices voluntarias sobre transparencia en contenido generado por IA.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">7. Sus comentarios</h2>
            <p className="text-slate-600 leading-relaxed">
              Agradecemos cualquier comentario sobre nuestro contenido generado por IA. Si detecta inexactitudes, información desactualizada o tiene alguna preocupación sobre nuestro uso de la IA, contáctenos en{' '}
              <a href="mailto:legal@elestado.es" className="text-primary underline underline-offset-4">
                legal@elestado.es
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">8. Actualizaciones de esta declaración</h2>
            <p className="text-slate-600 leading-relaxed">
              A medida que la tecnología de IA y la normativa evolucionen, actualizaremos esta declaración. La fecha de «última actualización» indica cuándo fue revisada por última vez esta página.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

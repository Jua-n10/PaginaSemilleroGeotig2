import { ShieldAlert, Map, Trees, Droplets } from 'lucide-react';

const RESEARCH_LINES = [
  {
    icon: ShieldAlert,
    title: 'Gestión del Riesgo de Desastres y Medio Ambiente',
    description:
      'Evaluación de vulnerabilidades, reducción de riesgos de desastres y gestión sostenible de los ecosistemas.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Map,
    title: 'Tecnologías de la Información Geográfica (TIG)',
    description:
      'Aplicación de SIG, cartografía digital y herramientas geoespaciales avanzadas para el análisis territorial.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Trees,
    title: 'Geografía Rural',
    description:
      'Análisis de las dinámicas agrarias, transformaciones del espacio rural y desarrollo local.',
    gradient: 'from-green-600 to-emerald-600',
  },
  {
    icon: Droplets,
    title: 'Ordenamiento Territorial y Manejo de Cuencas Hidrográficas',
    description:
      'Planificación sostenible del uso del suelo, planificación ambiental y gestión integral de recursos hídricos.',
    gradient: 'from-teal-600 to-blue-600',
  },
];

export function ResearchAreasAlt() {
  return (
    <section id="investigacion" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-4">
            <span className="text-emerald-600 uppercase tracking-wide text-sm">Líneas de Investigación</span>
          </div>
          <h2 className="text-gray-900 mb-6">
            Áreas de estudio y desarrollo
          </h2>
          <p className="text-xl text-gray-600">
            Nuestro trabajo se enfoca en múltiples dimensiones del análisis territorial y geográfico
          </p>
        </div>

        {/* Research Lines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {RESEARCH_LINES.map((line) => {
            const Icon = line.icon;
            return (
              <div
                key={line.title}
                className="group h-full bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${line.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{line.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{line.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
            <p className="text-gray-700 mb-4">
              ¿Tienes interés en alguna de estas áreas o una propuesta de investigación?
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('unete');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

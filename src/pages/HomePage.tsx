import ImageCarousel from '../components/ImageCarousel';
import { Leaf, Award, Users, TreeDeciduous } from 'lucide-react';

type HomePageProps = {
  onNavigate: (page: 'catalog') => void;
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: TreeDeciduous,
      title: 'Variedades Selectas',
      description: 'Amplio catálogo de variedades de almendro adaptadas a diferentes climas y suelos',
    },
    {
      icon: Award,
      title: 'Calidad Garantizada',
      description: 'Certificación de origen y calidad en todos nuestros productos',
    },
    {
      icon: Leaf,
      title: 'Cultivo Sostenible',
      description: 'Prácticas agrícolas respetuosas con el medio ambiente',
    },
    {
      icon: Users,
      title: 'Asesoramiento Experto',
      description: 'Equipo profesional para guiarte en la selección de variedades',
    },
  ];

  return (
    <div>
      <ImageCarousel />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Especialistas en Almendros
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Con años de experiencia en el cultivo y comercialización de almendros,
              ofrecemos las mejores variedades del mercado. Nuestra pasión es ayudarte
              a encontrar la variedad perfecta para tu explotación agrícola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Icon className="text-green-800" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-green-800 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Ver Catálogo de Variedades
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg"
                alt="Almendro en flor"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Nuestra Experiencia
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Llevamos décadas dedicados al cultivo y comercialización de almendros.
                Nuestra experiencia nos permite seleccionar y ofrecer las variedades más
                productivas y adaptadas a las condiciones de cada región.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Trabajamos directamente con viveros certificados y aplicamos rigurosos
                controles de calidad en todas las fases del proceso, desde la selección
                de patrones hasta la entrega final.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nuestro compromiso es proporcionar plantas de la más alta calidad,
                acompañadas del mejor asesoramiento técnico para garantizar el éxito
                de tu plantación.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

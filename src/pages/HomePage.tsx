import ImageCarousel from '../components/ImageCarousel';
import { Leaf, Award, Users, TreeDeciduous } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type HomePageProps = {
  onNavigate: (page: 'catalog') => void;
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useTranslation();

  const features = [
    {
      icon: TreeDeciduous,
      title: t('home.features.varieties'),
      description: t('home.features.varieties_desc'),
    },
    {
      icon: Award,
      title: t('home.features.quality'),
      description: t('home.features.quality_desc'),
    },
    {
      icon: Leaf,
      title: t('home.features.sustainable'),
      description: t('home.features.sustainable_desc'),
    },
    {
      icon: Users,
      title: t('home.features.advisory'),
      description: t('home.features.advisory_desc'),
    },
  ];

  return (
    <div>
      <ImageCarousel />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('home.section1.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.section1.description')}
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
              {t('home.button')}
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
                alt="Almond tree in bloom"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t('home.section2.title')}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t('home.section2.para1')}
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t('home.section2.para2')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('home.section2.para3')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

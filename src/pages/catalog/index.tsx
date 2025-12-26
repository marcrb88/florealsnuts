import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import varieties from '../../data/varieties.json';
import { Loader2 } from 'lucide-react';

type AlmondVariety = {
  id: string;
  name: string;
  description: string;
  characteristics: string;
  image_url: string;
  origin: string;
  harvest_period: string;
  price: number;
  available: boolean;
};

export default function CatalogPage() {
  const [varietiesData, setVarietiesData] = useState<AlmondVariety[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = () => {
    try {
      setLoading(true);
      const sortedVarieties = [...varieties].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setVarietiesData(sortedVarieties);
    } catch (err) {
      setError(t('catalog.error'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-green-800" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('catalog.title')}
          </h1>
          <p className="text-xl text-green-100">
            {t('catalog.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {varietiesData.map((variety) => (
            <Link
              key={variety.id}
              to={`/variedad/${variety.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={variety.image_url || 'https://images.pexels.com/photos/4033630/pexels-photo-4033630.jpeg'}
                  alt={variety.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {variety.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {variety.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-800">
                    {variety.price.toFixed(2)}€
                  </span>
                  <span className="text-green-800 font-semibold">
                    {t('catalog.details')} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

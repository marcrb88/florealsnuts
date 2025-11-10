import { useEffect, useState } from 'react';
import { supabase, AlmondVariety } from '../lib/supabase';
import { Loader2, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CatalogPage() {
  const [varieties, setVarieties] = useState<AlmondVariety[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariety, setSelectedVariety] = useState<AlmondVariety | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('almond_varieties')
        .select('*')
        .eq('available', true)
        .order('name');

      if (error) throw error;
      setVarieties(data || []);
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
          {varieties.map((variety) => (
            <div
              key={variety.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedVariety(variety)}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={variety.image_url || 'https://images.pexels.com/photos/4033630/pexels-photo-4033630.jpeg'}
                  alt={variety.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {variety.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {variety.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin size={16} className="mr-2" />
                  <span>{variety.origin}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span>{variety.harvest_period}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-800">
                    {variety.price.toFixed(2)}€
                  </span>
                  <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    {t('catalog.details')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVariety && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedVariety(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80">
              <img
                src={selectedVariety.image_url || 'https://images.pexels.com/photos/4033630/pexels-photo-4033630.jpeg'}
                alt={selectedVariety.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedVariety(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {selectedVariety.name}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {selectedVariety.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="text-green-800 mr-2" size={20} />
                    <h3 className="font-semibold text-gray-800">
                      {t('catalog.title')}
                    </h3>
                  </div>
                  <p className="text-gray-600">{selectedVariety.characteristics}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="text-green-800 mr-2" size={20} />
                    <h3 className="font-semibold text-gray-800">
                      {t('contact.address_label')}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedVariety.origin}</p>
                  <div className="flex items-center mb-2">
                    <Calendar className="text-green-800 mr-2" size={20} />
                    <h3 className="font-semibold text-gray-800">Cosecha</h3>
                  </div>
                  <p className="text-gray-600">{selectedVariety.harvest_period}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <span className="text-3xl font-bold text-green-800">
                  {selectedVariety.price.toFixed(2)}{t('catalog.price_unit')}
                </span>
                <button
                  onClick={() => setSelectedVariety(null)}
                  className="bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors text-lg"
                >
                  {t('catalog.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

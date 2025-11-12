import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';
import { supabase, AlmondVariety } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VariedadPage() {
  const { id } = useParams<{ id: string }>();
  const [variety, setVariety] = useState<AlmondVariety | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchVariety();
  }, [id]);

  const fetchVariety = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('almond_varieties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setError('Variedad no encontrada');
        return;
      }
      setVariety(data);
    } catch (err) {
      setError('Error al cargar la variedad');
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

  if (error || !variety) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/catalog" className="text-green-800 hover:text-green-700 underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/catalog" className="text-green-800 hover:text-green-700 mb-6 inline-block">
          ← Volver al catálogo
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96">
            <img
              src={variety.image_url || 'https://images.pexels.com/photos/4033630/pexels-photo-4033630.jpeg'}
              alt={variety.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {variety.name}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {variety.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <TrendingUp className="text-green-800 mr-2" size={24} />
                  <h3 className="font-semibold text-gray-800">Características</h3>
                </div>
                <p className="text-gray-600">{variety.characteristics}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <MapPin className="text-green-800 mr-2" size={24} />
                  <h3 className="font-semibold text-gray-800">Origen</h3>
                </div>
                <p className="text-gray-600">{variety.origin}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Calendar className="text-green-800 mr-2" size={24} />
                  <h3 className="font-semibold text-gray-800">Cosecha</h3>
                </div>
                <p className="text-gray-600">{variety.harvest_period}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <span className="text-4xl font-bold text-green-800">
                {variety.price.toFixed(2)}€
              </span>
              <button className="bg-green-800 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg">
                Solicitar información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

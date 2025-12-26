import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import articlesData from '../../data/articles.json';
import { Loader2, Clock, User, ArrowLeft } from 'lucide-react';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  variety_id?: string;
  author: string;
  featured_image_url: string;
  video_url?: string;
  reading_time: number;
  published_at: string;
  language: string;
};

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = () => {
    try {
      setLoading(true);
      const found = articlesData.find((a) => a.slug === slug);
      if (!found) {
        setError('Artículo no encontrado');
        return;
      }
      setArticle(found);
    } catch (err) {
      setError('Error al cargar el artículo');
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

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/blog" className="text-green-800 hover:text-green-700 underline flex items-center justify-center">
            <ArrowLeft size={16} className="mr-2" />
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="text-green-800 hover:text-green-700 mb-6 inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Volver al blog
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96">
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{article.reading_time} min de lectura</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>{article.author}</span>
                </div>
              </div>
              <time dateTime={article.published_at}>
                {new Date(article.published_at).toLocaleDateString('ca-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {article.title}
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.video_url && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Vídeo Explicativo</h2>
                <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={article.video_url}
                    title="Vídeo del artículo"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-gray-200 mt-8">
              <Link
                to="/blog"
                className="text-green-800 hover:text-green-700 font-semibold inline-flex items-center"
              >
                <ArrowLeft size={16} className="mr-2" />
                Ver más artículos
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadRecaptchaScript, getRecaptchaToken } from '../../lib/recaptcha';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError(null);
    setIsSubmitting(true);

    try {
      const token = await getRecaptchaToken();

      if (!token) {
        setCaptchaError(t('contact.captcha_error') || 'reCAPTCHA error');
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      setCaptchaError(t('contact.captcha_error') || 'reCAPTCHA error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-green-100">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {t('contact.contact_info')}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('contact.description')}
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Phone className="text-green-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('contact.phone_label')}
                  </h3>
                  <p className="text-gray-600">{t('contact.phone_value')}</p>
                  <p className="text-gray-500 text-sm">{t('contact.hours')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Mail className="text-green-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('contact.email_label')}
                  </h3>
                  <p className="text-gray-600">{t('contact.email_value')}</p>
                  <p className="text-gray-500 text-sm">
                    {t('contact.response_time')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <MapPin className="text-green-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('contact.address_label')}
                  </h3>
                  <p className="text-gray-600">
                    {t('contact.address_value')}
                    <br />
                    {t('contact.city_value')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('contact.visit_hours')}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>{t('contact.weekdays')}</strong> {t('contact.weekdays_time')}
              </p>
              <p className="text-gray-600">
                <strong>{t('contact.saturday')}</strong> {t('contact.saturday_time')}
              </p>
              <p className="text-gray-500 text-sm mt-3">
                {t('contact.note')}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t('contact.form_title')}
            </h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                <p className="font-semibold">{t('contact.form_success')}</p>
                <p className="text-sm">
                  {t('contact.form_success_msg')}
                </p>
              </div>
            ) : null}
            {captchaError ? (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                <p className="text-sm">{captchaError}</p>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  {t('contact.fields.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder={t('contact.placeholders.name')}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  {t('contact.fields.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder={t('contact.placeholders.email')}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  {t('contact.fields.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder={t('contact.placeholders.phone')}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  {t('contact.fields.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all resize-none"
                  placeholder={t('contact.placeholders.message')}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>This site is protected by reCAPTCHA and the Google<br />
                  <a href="https://policies.google.com/privacy" className="underline hover:text-gray-600">Privacy Policy</a> and
                  <a href="https://policies.google.com/terms" className="underline hover:text-gray-600"> Terms of Service</a> apply.
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-800 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                {isSubmitting ? t('contact.sending') || 'Enviando...' : t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

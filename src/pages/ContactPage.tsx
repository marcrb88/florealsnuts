import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-xl text-green-100">
            Estamos aquí para ayudarte con tu proyecto
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ponte en Contacto
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              ¿Necesitas asesoramiento sobre qué variedad de almendro es la más
              adecuada para tu explotación? Nuestro equipo de expertos está
              disponible para resolver todas tus dudas y ayudarte a tomar la
              mejor decisión.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Phone className="text-green-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Teléfono</h3>
                  <p className="text-gray-600">+34 123 456 789</p>
                  <p className="text-gray-500 text-sm">Lun - Vie: 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Mail className="text-green-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">info@almendrospremium.es</p>
                  <p className="text-gray-500 text-sm">
                    Respuesta en 24-48 horas
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <MapPin className="text-green-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Dirección</h3>
                  <p className="text-gray-600">
                    Camino del Almendro, 123
                    <br />
                    12345 Valencia, España
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">
                Horario de Visitas
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Lunes - Viernes:</strong> 9:00 - 14:00, 16:00 - 18:00
              </p>
              <p className="text-gray-600">
                <strong>Sábados:</strong> 9:00 - 13:00 (previa cita)
              </p>
              <p className="text-gray-500 text-sm mt-3">
                * Se recomienda concertar cita previa para visitas
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Envíanos un Mensaje
            </h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                <p className="font-semibold">¡Mensaje enviado con éxito!</p>
                <p className="text-sm">
                  Nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder="+34 123 456 789"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

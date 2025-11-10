import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ca', label: 'Català' },
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe size={20} className="text-gray-600" />
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 bg-white text-gray-700 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}

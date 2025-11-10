import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

type NavigationProps = {
  currentPage: 'home' | 'catalog' | 'contact';
  onNavigate: (page: 'home' | 'catalog' | 'contact') => void;
};

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const menuItems = [
    { id: 'home' as const, label: t('navigation.home') },
    { id: 'catalog' as const, label: t('navigation.catalog') },
    { id: 'contact' as const, label: t('navigation.contact') },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-green-800 hover:text-green-600 transition-colors"
            >
              {t('navigation.title')}
            </button>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-green-800 border-b-2 border-green-800'
                    : 'text-gray-600 hover:text-green-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-l border-gray-300 pl-6">
              <LanguageSelector />
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-medium ${
                  currentPage === item.id
                    ? 'text-green-800 bg-green-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-3 py-4 border-t border-gray-200">
              <LanguageSelector />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

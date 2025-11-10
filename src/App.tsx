import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';

type Page = 'home' | 'catalog' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'catalog':
        return <CatalogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">
            © 2024 Ametllers Premium. Tots els drets reservats.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

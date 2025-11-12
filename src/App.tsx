import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/home';
import CatalogPage from './pages/catalog';
import VariedadPage from './pages/catalog/variedad';
import ContactPage from './pages/contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/variedad/:id" element={<VariedadPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <footer className="bg-gray-800 text-white py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-300">
              © 2024 Ametllers Premium. Tots els drets reservats.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

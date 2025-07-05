import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import Menu from './components/Menu/Menu';
import Loader from './components/Loader/Loader';
import About from './components/About/About';
import { useNavigationCleanup } from './components/Utils/NavigationCleanup';

// Lazy load components for code splitting
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const DataManager = lazy(() => import('./products/data-manager/DataManager'));
const Monitoring = lazy(() => import('./products/monitoring/Monitoring'));
const PILA = lazy(() => import('./products/PILA/PILA'));
const Plugins = lazy(() => import('./plugins/Plugins'));



function AppRoutes() {
  const location = useLocation();
  
  // Add navigation cleanup
  useNavigationCleanup();
  
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/data-manager" element={<DataManager />} />
          <Route path="/products/monitoring" element={<Monitoring />} />
          <Route path="/products/PILA" element={<PILA />} />
          <Route path="/plugins" element={<Plugins />} />
        </Routes>
      </Suspense>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter basename="/ROKKA-Website-Dev/">
      <Menu />
      <AppRoutes />
      <About />
    </BrowserRouter>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize app loading state
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <AppWrapper />;
}
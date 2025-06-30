import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage'
import Menu from './components/Menu/Menu';
import DataManager from './products/data-manager/DataManager';
import Monitoring from './products/monitoring/Monitoring';
import PILA from './products/PILA/PILA';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import Plugins from './plugins/Plugins';
import About from './components/About/About';



function AppRoutes({}) {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/data-manager" element={<DataManager />} />
      <Route path="/products/monitoring" element={<Monitoring />} />
      <Route path="/products/PILA" element={<PILA />} />
      <Route path="/plugins" element={<Plugins />} />
    </Routes>
  );
}

function AppWrapper() {
  
  return (
    <BrowserRouter basename="/ROKKA-Website-Dev/">
      <Menu 
        // aboutState={aboutState}
        // setAboutState={setAboutState}
      />
      <AppRoutes />
      <About />
    </BrowserRouter>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with your real loading logic)
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <AppWrapper />;
}
import React, { createContext, useContext, useEffect, useState } from 'react';

const DOMReadyContext = createContext(false);

export const useDOMReady = () => {
  return useContext(DOMReadyContext);
};

export const DOMReadyProvider = ({ children }) => {
  const [isDOMReady, setIsDOMReady] = useState(false);

  useEffect(() => {
    // Check if DOM is already ready
    if (document.readyState === 'complete') {
      setIsDOMReady(true);
      return;
    }

    // Wait for DOM to be ready
    const handleDOMContentLoaded = () => {
      setIsDOMReady(true);
    };

    // If document is still loading, wait for it
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      // DOM is interactive, wait for full load
      window.addEventListener('load', handleDOMContentLoaded);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.removeEventListener('load', handleDOMContentLoaded);
    };
  }, []);

  return (
    <DOMReadyContext.Provider value={isDOMReady}>
      {children}
    </DOMReadyContext.Provider>
  );
};

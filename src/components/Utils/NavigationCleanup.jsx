import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import contextManager from './WebGLContextManager';

/**
 * Navigation cleanup hook - handles WebGL resource cleanup during route changes
 */
export function useNavigationCleanup() {
  const location = useLocation();
  const previousLocationRef = useRef(location.pathname);
  const cleanupTimeoutRef = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousLocationRef.current;

    // If we're navigating away from a page, schedule cleanup
    if (previousPath !== currentPath) {
      // Silently track navigation
      // console.log(`Navigation: ${previousPath} -> ${currentPath}`);
      
      // Scroll to top on every navigation
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
      // Clear any pending cleanup
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }

      // Schedule cleanup of previous page resources
      cleanupTimeoutRef.current = setTimeout(() => {
        // Get context stats before cleanup
        const statsBefore = contextManager.getStats();
        // Silently track cleanup stats
        // console.log('Context stats before navigation cleanup:', statsBefore);
        
        // Force cleanup of inactive contexts
        contextManager.forceCleanup();
        
        // Get context stats after cleanup
        const statsAfter = contextManager.getStats();
        // Silently track cleanup results
        // console.log('Context stats after navigation cleanup:', statsAfter);
        
        // Log cleanup results
        if (statsBefore.activeContexts > statsAfter.activeContexts) {
          console.log(`✅ Cleaned up ${statsBefore.activeContexts - statsAfter.activeContexts} WebGL contexts`);
        }
      }, 500); // Small delay to ensure page transition is complete
    }

    previousLocationRef.current = currentPath;

    return () => {
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  // Emergency cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }
      // Force cleanup on component unmount
      contextManager.forceCleanup();
    };
  }, []);
}

/**
 * Page-specific cleanup hook for monitoring page
 */
export function useMonitoringPageCleanup() {
  const location = useLocation();
  const isMonitoringPage = location.pathname === '/products/monitoring';
  
  useEffect(() => {
    if (!isMonitoringPage) {
      // We're leaving the monitoring page - cleanup monitoring-specific resources
      console.log('Leaving monitoring page - cleaning up monitoring resources');
      
      // Cleanup specific monitoring contexts
      const contexts = contextManager.getStats().contexts;
      contexts.forEach(contextId => {
        if (contextId.includes('monitoring')) {
          contextManager.cleanupContext(contextId);
        }
      });
    }
  }, [isMonitoringPage]);
}

/**
 * Page-specific cleanup hook for home page
 */
export function useHomePageCleanup() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    if (isHomePage) {
      // We're entering the home page - reset scroll position and prepare for GSAP
      console.log('Entering home page - resetting scroll and preparing animations');
      
      // Reset scroll position immediately
      window.scrollTo(0, 0);
      
      // Force scroll to top with smooth behavior after a short delay
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 50);
      
      // Ensure ScrollTrigger is refreshed
      if (window.ScrollTrigger) {
        setTimeout(() => {
          window.ScrollTrigger.refresh();
        }, 100);
      }
    }
  }, [isHomePage]);
  
  // Cleanup on leaving home page
  useEffect(() => {
    if (!isHomePage) {
      console.log('Leaving home page - cleaning up home page resources');
      
      // Kill any active ScrollTrigger instances
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger && trigger.trigger.id === 'hero-section') {
            trigger.kill();
          }
        });
      }
    }
  }, [isHomePage]);
}

export default {
  useNavigationCleanup,
  useMonitoringPageCleanup,
  useHomePageCleanup
};

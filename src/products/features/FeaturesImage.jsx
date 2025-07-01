import { useEffect, useRef } from "react";

// Import page icons
import dataManagerIcon from '../../../static/svg/Products/DataManager/Data_Manager_B.svg';
import monitoringIcon from '../../../static/svg/Products/Monitoring/Monitoring_Icon_B.svg';
import PILAIcon from '../../../static/svg/Products/PILA/PILA_Icon_B.svg';

export default function FeaturesImage({ data, index }) {
  const imageRef = useRef(null);

  // Generate page-specific class name based on current URL path
  const getPageSpecificClass = (index) => {
    const currentPath = window.location.pathname;
    const featureNumber = index + 1;
    
    if (currentPath.includes('/data-manager')) {
      return `data-manager-feature-${featureNumber}`;
    } else if (currentPath.includes('/monitoring')) {
      return `monitoring-feature-${featureNumber}`;
    } else if (currentPath.includes('/PILA')) {
      return `pila-feature-${featureNumber}`;
    } else if (currentPath.includes('/plugins')) {
      return `plugins-feature-${featureNumber}`;
    }
    
    // Fallback for unknown pages
    return data.imageClass || 'image-default';
  };

  // Get page title and icon based on current URL path
  const getPageHeaderInfo = () => {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/data-manager')) {
      return { title: 'Data Manager', icon: dataManagerIcon };
    } else if (currentPath.includes('/monitoring')) {
      return { title: 'Monitoring', icon: monitoringIcon };
    } else if (currentPath.includes('/PILA')) {
      return { title: 'PILA', icon: PILAIcon };
    } else if (currentPath.includes('/plugins')) {
      return { title: 'Plugins', icon: null }; // No icon for plugins
    }
    
    // Fallback
    return { title: 'Features', icon: null };
  };

  useEffect(() => {
    const handleImageLoad = () => {
      if (imageRef.current) {
        imageRef.current.style.opacity = 1;
        
        // Apply page-specific class first, then fallback to data.imageClass
        const pageSpecificClass = getPageSpecificClass(index);
        const imageClass = pageSpecificClass;
        
        imageRef.current.className = `feature-image ${imageClass}`;
      }
    };

    const imgElement = imageRef.current;
    if (imgElement && imgElement.complete) {
      handleImageLoad();
    } else if (imgElement) {
      imgElement.addEventListener('load', handleImageLoad);
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener('load', handleImageLoad);
      }
    };
  }, [data.imageClass, index]);

  const headerInfo = getPageHeaderInfo();

  return (
    <div className="features-image seeker-section">
      <div className="features-image-header">
        <h2 className="features-image-title">{headerInfo.title}</h2>
        {headerInfo.icon && (
          <img 
            src={headerInfo.icon} 
            alt={`${headerInfo.title} icon`} 
            className="features-image-icon" 
          />
        )}
      </div>
      <img 
        ref={imageRef} 
        src={data.image} 
        alt={`${data.title} image`} 
        className="feature-image image-default"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import FeaturesNavigation from "./FeaturesNavigation";
import FeaturesImage from "./FeaturesImage";
import FeatureCard from "./FeatureCard";
import * as THREE from "three";

import '../../styles/features/FeaturesContainer.scss';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesContainer({
  id,
  data,
  amplitude = 1,
  setAmplitude,
  frequency = 0.426,
  setFrequency,
  maxDistance = 0.5,
  setMaxDistance,
  // isMobile = false,
  // setIsMobile,
  cameraZ = 1.85,
  setCameraZ,
  geoComplexity = 136,
  meshType = new THREE.IcosahedronGeometry(100, geoComplexity),
}) {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Create a mapping of anchor names to feature indices
  const getFeatureIndexFromAnchor = (anchor) => {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/plugins')) {
      const pluginAnchors = {
        'api': 0,                              // API
        'ai-driven-call-center': 1,            // AI Driven Call Center
        'ecosystem-analyzer': 2,               // Ecosystem Analyzer
        'mobile-command': 3,                   // Mobile Command
        'distribution-pad': 4,                 // Distribution Pad
        'parliament-regulation-dashboard': 5,   // Parliament Regulation Dashboard
        'hate-speech-detector': 6              // Hate Speech Detector
      };
      return pluginAnchors[anchor] !== undefined ? pluginAnchors[anchor] : 0;
    }
    
    // Add more mappings for other pages if needed
    // if (currentPath.includes('/data-manager')) { ... }
    // if (currentPath.includes('/monitoring')) { ... }
    // if (currentPath.includes('/PILA')) { ... }
    
    return 0;
  };

  // Handle anchor navigation
  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the # symbol
    if (hash) {
      const targetIndex = getFeatureIndexFromAnchor(hash);
      setActiveIndex(targetIndex);
      
      // Scroll to the features container
      if (wrapperRef.current) {
        wrapperRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pin seeker-wrapper and handle scroll-driven tab switch (desktop only)
  useEffect(() => {
    const menu = document.querySelector('.menu-container');
    if (isMobile) return;

    let ctx = gsap.context(() => {
      // Pin the wrapper
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${data.length * window.innerHeight}`,
        pin: true,
        scrub: true,
      });

      // Feature change on scroll
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${data.length * window.innerHeight}`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.floor(progress * data.length);
          setActiveIndex(Math.min(idx, data.length - 1));
        },
        onEnter: () => {
          gsap.to(menu, {
            x: 330,
          })
        },
        onLeave: () => {
          gsap.to(menu, {
            x: 0,
          });
        },
        onEnterBack: () => {
          gsap.to(menu, {
            x: 330,
          });
        },
        onLeaveBack: () => {
          gsap.to(menu, {
            x: 0,
          });
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [data.length, isMobile]);

  // Click-to-change support (always enabled)
  const handleNavClick = (idx) => setActiveIndex(idx);

  return (
    <div className="features-container" id={id}>
      <div className="seeker-wrapper" ref={wrapperRef}>
        <FeaturesNavigation
          data={data}
          globalIndex={activeIndex}
          setGlobalIndex={handleNavClick}
        />
        <FeatureCard
          data={data[activeIndex]}
          index={activeIndex}
          isMobile={isMobile}
        />
         <FeaturesImage
          data={data[activeIndex]}
          index={activeIndex}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
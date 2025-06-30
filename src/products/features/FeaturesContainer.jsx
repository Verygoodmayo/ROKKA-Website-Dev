import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
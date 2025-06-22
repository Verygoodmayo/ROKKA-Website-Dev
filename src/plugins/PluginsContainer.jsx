import PluginsItem from "./PluginsItem";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function PluginsContainer ({data}) {

    const wrapperRef = useRef(null);
    const [isMobile , setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

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
          // setCameraZ(1)
          // setFrequency(0.426);
          // setAmplitude(1);
          // setMaxDistance(0.5);
        },
        onLeave: () => {
          gsap.to(menu, {
            x: 0,
          });
          // setCameraZ(0.5)
          // setFrequency(2.426);
          // setAmplitude(0.1);
          // setMaxDistance(3.5);
        },
        onEnterBack: () => {
          gsap.to(menu, {
            x: 330,
          });
          // setCameraZ(1)
          // setFrequency(0.426);
          // setAmplitude(1);
          // setMaxDistance(0.5);
        },
        onLeaveBack: () => {
          gsap.to(menu, {
            x: 0,
          });
          // setCameraZ(1.85)
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [data.length, isMobile]);

  // Click-to-change support (always enabled)
  const handleNavClick = (idx) => setActiveIndex(idx);

    return (
        <div className="plugins-container">
            <div className="nav-container">
              {data.map((item, index) => (
                    <div
                        key={index}
                        className="nav-item"
                        // data={item}
                        // isActive={index === activeIndex}
                        // onClick={() => handleNavClick(index)}
                    >
                      {item.title}
                    </div>
                ))}
            </div>
            <div className="content-wrapper" ref={wrapperRef}>
                {data.map((item, index) => (
                    <PluginsItem
                        key={index}
                        data={item}
                        // isActive={index === activeIndex}
                        // onClick={() => handleNavClick(index)}
                    />
                ))}
            </div>
        </div>
    )
}
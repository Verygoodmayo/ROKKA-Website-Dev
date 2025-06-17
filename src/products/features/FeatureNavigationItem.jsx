import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollForMore from "../../components/ScrollforMore"; // Adjust the import path as necessary

export default function FeaturesNavigationItem({ title, index, globalIndex, setGlobalIndex }) {
  const isActive = globalIndex === index;
  const itemRef = useRef();

  useEffect(() => {
    if (!itemRef.current) return;
    if (isActive) {
      // Animate to active state
      gsap.to(itemRef.current, {
        flex: 1,
        alignItems: "flex-end",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(itemRef.current.children[1], {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }, '<');
    } else {
      // Animate to inactive state
      gsap.to(itemRef.current, {
        flex: 0,
        alignItems: "center",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={itemRef}
      className={`feature-navigation-item${isActive ? " active" : ""}`}
      onClick={() => setGlobalIndex(index)}
      style={{
        cursor: "pointer",
        transition: "box-shadow 0.3s, border-radius 0.3s",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span className="index">{index + 1}</span>
      {!isActive && <h2 className="title">{title}</h2>}
      {isActive && <h2 className="title active">{title}</h2>}
      {/* {isActive && <div className="scroll-for-more">{"Scroll for More"}</div>} */}
      {isActive && <ScrollForMore />}
    </div>
  );
}
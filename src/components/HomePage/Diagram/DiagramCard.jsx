import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import IcoBufferMesh from "../../Sketchs/IcoBufferMesh";
import * as THREE from "three";

export default function DiagramCard({ keyName, title, categories, description, isOpportunities, defaultIndex = 0, meshType = new THREE.BoxGeometry(50, 50, 50, 50, 100, 100, 100), geoComplexity = 136 }) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [fadeState, setFadeState] = useState("in");
    const descRef = useRef();

    // Animate fade in/out
    useGSAP(() => {
        if (fadeState === "in") {
            gsap.fromTo(descRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" });
        } else {
            gsap.to(descRef.current, { opacity: 0, duration: 0.3, ease: "power1.in" });
        }
    }, [fadeState, activeIndex]);

    const handleCategoryClick = (index) => {
        if (index === activeIndex) return;
        setFadeState("out");
        setTimeout(() => {
            setActiveIndex(index);
            setFadeState("in");
        }, 300); // match fade out duration
    };

    return (
        <div 
            key={keyName}
            className={`diagram-card${isOpportunities ? " opportunities-card" : ""}`}
        >
            <div className="header-wrapper">
                <div className="title">{title}</div>
                <div className="categories">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`category${activeIndex === index ? " active" : ""}`}
                            onClick={() => handleCategoryClick(index)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="description">
                <p ref={descRef}>{description[activeIndex]}</p>
            </div>
            <Canvas key={1} className="card-sketch-container">
                <IcoBufferMesh meshType={meshType} geoComplexity={geoComplexity}></IcoBufferMesh>
            </Canvas>
        </div>
    );
}
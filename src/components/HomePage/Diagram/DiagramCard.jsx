import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import IcoBufferMesh from "../../Sketchs/IcoBufferMesh";
import CameraController from "../../Sketchs/CameraController";
import * as THREE from "three";

export default function DiagramCard({ 
    keyName, 
    title, 
    categories, 
    description, 
    isOpportunities, 
    defaultIndex = 0, 
    selectedIndex,
    onSelectionChange,
    meshType = new THREE.BoxGeometry(50, 50, 50, 50, 100, 100, 100), 
    geoComplexity = 136,
    // Shader control props
    shaderProps = {}
}) {
    const [activeIndex, setActiveIndex] = useState(selectedIndex !== undefined ? selectedIndex : defaultIndex);
    const [fadeState, setFadeState] = useState("in");
    const descRef = useRef();

    // Update activeIndex when selectedIndex prop changes
    useEffect(() => {
        if (selectedIndex !== undefined && selectedIndex !== activeIndex) {
            setActiveIndex(selectedIndex);
        }
    }, [selectedIndex]);

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
            // Call the parent's selection change handler if provided
            if (onSelectionChange) {
                onSelectionChange(categories[index], index);
            }
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
                <CameraController 
                    position={shaderProps.cameraPosition || [0, 0, 0.25]}
                    lookAt={shaderProps.cameraLookAt || [0, 0, 0]}
                    fov={shaderProps.cameraFov || 75}
                    near={shaderProps.cameraNear || 0.1}
                    far={shaderProps.cameraFar || 1000}
                />
                <IcoBufferMesh 
                    meshType={meshType} 
                    geoComplexity={geoComplexity}
                    {...shaderProps}
                />
            </Canvas>
        </div>
    );
}
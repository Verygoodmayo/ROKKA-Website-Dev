import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import IcoBufferMesh from "../../Sketchs/IcoBufferMesh";
import CameraController from "../../Sketchs/CameraController";
import WebGLErrorBoundary from "../../Utils/WebGLErrorBoundary";
import { UniversalCanvas, useWebGLManager } from "../../Utils/UniversalWebGLManager";
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
                onSelectionChange(index);
            }
        }, 300);
    };

    const fallbackComponent = (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.05)',
            color: '#666',
            fontSize: '12px'
        }}>
            <div style={{ textAlign: 'center' }}>
                <p>🎨 Loading visualization...</p>
            </div>
        </div>
    );

    const handleContextReady = ({ gl, scene, camera, manager, canvasId }) => {
        console.log(`DiagramCard: WebGL context ready for ${canvasId}`);
        
        // Register scene resources
        manager.registerResource(canvasId, scene, 'scene');
        manager.registerResource(canvasId, camera, 'camera');
        manager.registerResource(canvasId, meshType, 'geometry');
    };

    return (
        <div className="diagram-card">
            <div className="header">
                <h3>{title}</h3>
                <div className="categories">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`category-btn ${activeIndex === index ? 'active' : ''}`}
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
            <WebGLErrorBoundary>
                <UniversalCanvas
                    id={`diagram-card-${keyName}`}
                    className="card-sketch-container"
                    fallbackComponent={fallbackComponent}
                    autoRecover={true}
                    recoveryDelay={1500}
                    onContextReady={handleContextReady}
                    webglOptions={{
                        maxTextures: 8,
                        pixelRatio: Math.min(window.devicePixelRatio, 2),
                        outputColorSpace: THREE.SRGBColorSpace,
                        clearColor: 0x000000,
                        clearAlpha: 0,
                        checkShaderErrors: false
                    }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                        preserveDrawingBuffer: false,
                        failIfMajorPerformanceCaveat: false,
                    }}
                >
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
                </UniversalCanvas>
            </WebGLErrorBoundary>
        </div>
    );
}

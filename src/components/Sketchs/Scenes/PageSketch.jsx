import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import IcoBufferMesh from "../Meshes/IcoBufferMesh";
import ParkBufferMesh from "../Meshes/ParkBufferMesh";
import CameraController from "../Controllers/CameraController";
import { WebGLErrorBoundary } from "../../Utils";

/**
 * Global page sketch component that can be used across different pages
 * with page-level control over scene, animation, shader, and camera parameters
 */
export default function PageSketch({
    // Geometry configuration
    geoComplexity = 100,
    meshType = new THREE.IcosahedronGeometry(100, geoComplexity),
    useParkModel = false, // NEW: Option to use Park Model instead of IcoBufferMesh
    
    // Mesh positioning
    meshPosition = [0, 0, 0], // [x, y, z] position for the mesh
    meshRotation = [0, -2.1, 0], // [x, y, z] rotation for the mesh (default park rotation)
    
    // Canvas configuration
    className = "sketch-container",
    id = "page-sketch",
    
    // All IcoBufferMesh shader props
    particleColor = [0.1, 0.1, 1.0],
    frequency = 0.175,
    amplitude = 3.5,
    maxDistance = 2.85,
    timeSpeed = 0.5,
    noiseScale = 1.0,
    noiseDensity = 1.0,
    particleSize = 1.0,
    colorIntensity = 1.0,
    mouseInfluenceStrength = 1.0,
    // Mouse click control parameters
    clickInfluenceStrength = 2.0,
    clickWaveSpeed = 3.0,
    clickDecayRate = 0.8,
    noiseOctaves = 3.0,
    noiseLacunarity = 2.0,
    noiseGain = 0.5,
    turbulenceStrength = 1.0,
    flowDirection = 0.0,
    waveSpeed = 1.0,
    distortionStrength = 1.0,
    
    // Camera configuration
    cameraPosition = [0, 0, 0.25],
    cameraLookAt = [0, 0, 0],
    cameraFov = 75,
    cameraNear = 0.1,
    cameraFar = 1000,
    
    // GUI configuration
    showDatGui = false, // Enable/disable dat.gui controls
    
    // Legacy props support (for backward compatibility)
    isMobile = false,
    cameraZ = 0.25
}) {
    // Use refs for GUI parameters to avoid re-renders
    const guiParamsRef = useRef({
        frequency,
        amplitude,
        maxDistance,
        timeSpeed
    });

    const guiRef = useRef(null);
    const meshRef = useRef(null);

    // Use a force update mechanism without re-rendering the whole component
    const [, forceUpdate] = useState({});
    const triggerUpdate = useCallback(() => {
        forceUpdate({});
    }, []);

    // Initialize dat.gui
    useEffect(() => {
        if (!showDatGui) return;

        // Create GUI only if it doesn't exist
        if (!guiRef.current) {
            guiRef.current = new dat.GUI({ autoPlace: false });
            
            // Create a container for the GUI
            const guiContainer = document.createElement('div');
            guiContainer.style.position = 'fixed';
            guiContainer.style.top = '10px';
            guiContainer.style.right = '10px';
            guiContainer.style.zIndex = '1000';
            guiContainer.appendChild(guiRef.current.domElement);
            document.body.appendChild(guiContainer);

            // Add controls for the key shader parameters
            const gui = guiRef.current;
            
            gui.add(guiParamsRef.current, 'frequency', 0.01, 1.0, 0.01)
                .name('Frequency')
                .onChange((value) => {
                    guiParamsRef.current.frequency = value;
                    triggerUpdate();
                });
                
            gui.add(guiParamsRef.current, 'amplitude', 0.1, 10.0, 0.1)
                .name('Amplitude')
                .onChange((value) => {
                    guiParamsRef.current.amplitude = value;
                    triggerUpdate();
                });
                
            gui.add(guiParamsRef.current, 'maxDistance', 0.1, 10.0, 0.05)
                .name('Max Distance')
                .onChange((value) => {
                    guiParamsRef.current.maxDistance = value;
                    triggerUpdate();
                });
                
            gui.add(guiParamsRef.current, 'timeSpeed', 0.1, 5.0, 0.1)
                .name('Time Speed')
                .onChange((value) => {
                    guiParamsRef.current.timeSpeed = value;
                    triggerUpdate();
                });
        }

        // Cleanup function
        return () => {
            if (guiRef.current) {
                document.body.removeChild(guiRef.current.domElement.parentNode);
                guiRef.current.destroy();
                guiRef.current = null;
            }
        };
    }, [showDatGui, triggerUpdate]);

    // Memoize the current parameters to use
    const currentParams = useMemo(() => {
        if (!showDatGui) {
            return { frequency, amplitude, maxDistance, timeSpeed };
        }
        return guiParamsRef.current;
    }, [showDatGui, frequency, amplitude, maxDistance, timeSpeed, forceUpdate]);

    // Handle legacy cameraZ prop for backward compatibility
    const finalCameraPosition = cameraZ !== 0.25 
        ? [cameraPosition[0], cameraPosition[1], cameraZ] 
        : cameraPosition;

    return (
        <WebGLErrorBoundary>
            <Canvas 
                className={className}
                id={id}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                }}
                dpr={[1, 2]}
                camera={{ position: finalCameraPosition, fov: cameraFov, near: cameraNear, far: cameraFar }}
            >
            <CameraController 
                position={finalCameraPosition}
                lookAt={cameraLookAt}
                fov={cameraFov}
                near={cameraNear}
                far={cameraFar}
            />
            
            {/* Conditionally render Park Model or Ico Mesh */}
            {useParkModel ? (
                <ParkBufferMesh
                    ref={meshRef}
                    geoComplexity={geoComplexity}
                    meshType={meshType}
                    meshPosition={meshPosition}
                    meshRotation={meshRotation}
                    // Shader props - use current params (gui or regular props)
                    particleColor={particleColor}
                    frequency={currentParams.frequency}
                    amplitude={currentParams.amplitude}
                    maxDistance={currentParams.maxDistance}
                    timeSpeed={currentParams.timeSpeed}
                    noiseScale={noiseScale}
                    noiseDensity={noiseDensity}
                    particleSize={particleSize}
                    colorIntensity={colorIntensity}
                    mouseInfluenceStrength={mouseInfluenceStrength}
                    clickInfluenceStrength={clickInfluenceStrength}
                    clickWaveSpeed={clickWaveSpeed}
                    clickDecayRate={clickDecayRate}
                    noiseOctaves={noiseOctaves}
                    noiseLacunarity={noiseLacunarity}
                    noiseGain={noiseGain}
                    turbulenceStrength={turbulenceStrength}
                    flowDirection={flowDirection}
                    waveSpeed={waveSpeed}
                    distortionStrength={distortionStrength}
                />
            ) : (
                <IcoBufferMesh
                    ref={meshRef}
                    geoComplexity={geoComplexity}
                    meshType={meshType}
                    meshPosition={meshPosition}
                    meshRotation={[0, 0, 0]} // Ico doesn't need rotation by default
                    // Shader props - use current params (gui or regular props)
                    particleColor={particleColor}
                    frequency={currentParams.frequency}
                    amplitude={currentParams.amplitude}
                    maxDistance={currentParams.maxDistance}
                    timeSpeed={currentParams.timeSpeed}
                    noiseScale={noiseScale}
                    noiseDensity={noiseDensity}
                    particleSize={particleSize}
                    colorIntensity={colorIntensity}
                    mouseInfluenceStrength={mouseInfluenceStrength}
                    clickInfluenceStrength={clickInfluenceStrength}
                    clickWaveSpeed={clickWaveSpeed}
                    clickDecayRate={clickDecayRate}
                    noiseOctaves={noiseOctaves}
                    noiseLacunarity={noiseLacunarity}
                    noiseGain={noiseGain}
                    turbulenceStrength={turbulenceStrength}
                    flowDirection={flowDirection}
                    waveSpeed={waveSpeed}
                    distortionStrength={distortionStrength}
                />
            )}
        </Canvas>
        </WebGLErrorBoundary>    
    );
}

import Footer from '../../components/Footer/Footer'
import FeaturesContainer from '../features/FeaturesContainer'
import HeroSection from './HeroSection'
import MonitoringSketch from './MonitoringSketch'
import * as THREE from 'three'
import { useState } from 'react'
import { monitoringFeatures } from '../../data/monitoringFeatures'
import { useMonitoringPageCleanup } from '../../components/Utils/NavigationCleanup'

// Default settings only for FeaturesContainer compatibility
const defaultSettings = {
    frequency: 0.026,
    amplitude: 0.01,
    maxDistance: 0.5,
    isMobile: false,
    cameraZ: 0,
    meshType: new THREE.IcosahedronGeometry(100, 20),
    geoComplexity: 20,
};

export default function Monitoring() {
    // Add monitoring-specific cleanup
    useMonitoringPageCleanup();
    
    // Simplified monitoring scene controls
    const sceneControls = {
        // Core animation controls
        frequency: 0.025,
        amplitude: 3.5,
        maxDistance: 10.5,
        timeSpeed: 1.0,
        
        // Advanced noise controls for chaos-to-order effect
        noiseScale: 1.0,
        noiseDensity: 1.0,
        noiseOctaves: 3.0,
        noiseLacunarity: 1.8,
        noiseGain: 0.4,
        turbulenceStrength: 2.0,
        flowDirection: 35.0,
        waveSpeed: 1.2,
        distortionStrength: 1.3,
        
        // Visual controls
        particleSize: 10.0,             // Bigger particles to see the mesh
        colorIntensity: 3.0,
        
        // Distance fade controls
        nearFadeDistance: 40.0,         // Distance where particles start to fade (closer = more visible)
        farFadeDistance: 160.0,         // Distance where particles become fully transparent
        
        // Mouse interaction controls for chaos-to-order
        mouseInfluenceStrength: 2.0,
        mouseOrderRadius: 0.52,          // Slightly smaller radius for more precise control
        mouseOrderStrength: 0.9,         // Strong order effect
        chaosStrength: 3.0,              // Increase chaos for more contrast
        
        // Mesh positioning (center at origin)
        meshPositionX: -0.5,  // Center the mesh
        meshPositionY: 0.1,
        meshPositionZ: 0.4,
        
        // Mesh rotation controls (factored out)
        meshRotationX: 0.3,  // Tilt toward camera (pitch up)
        meshRotationY: 0.1,  // Slight rotation for better angle
        meshRotationZ: 0.2,
        
        // Camera position (move back to see full model)
        cameraPositionX: -1.5,
        cameraPositionY: 0.1,
        cameraPositionZ: 1.5,  // Move camera further back to see the whole model  // Much closer since model is scaled down by /100
    };
    
    // Common rotation presets you can use:
    // 
    // Front view (default):
    // meshRotationX: 0, meshRotationY: 0, meshRotationZ: 0
    //
    // Side view:
    // meshRotationX: 0, meshRotationY: Math.PI/2, meshRotationZ: 0
    //
    // Tilted view:
    // meshRotationX: 0.2, meshRotationY: 0.3, meshRotationZ: 0
    //
    // Dramatic angled view:
    // meshRotationX: 0.3, meshRotationY: 0.8, meshRotationZ: 0.1
    
    // Legacy state variables for backward compatibility with FeaturesContainer
    const [geoComplexity, setGeoComplexity] = useState(defaultSettings.geoComplexity);
    const [meshType, setMeshType] = useState(defaultSettings.meshType);
    const [frequency, setFrequency] = useState(defaultSettings.frequency);
    const [amplitude, setAmplitude] = useState(defaultSettings.amplitude);
    const [maxDistance, setMaxDistance] = useState(defaultSettings.maxDistance);
    const [isMobile, setIsMobile] = useState(defaultSettings.isMobile);
    const [cameraZ, setCameraZ] = useState(defaultSettings.cameraZ);

    return (
        <>
            <HeroSection />
            <FeaturesContainer
                key={1}
                data={monitoringFeatures}
                amplitude={amplitude}
                setAmplitude={setAmplitude}
                frequency={frequency}
                setFrequency={setFrequency}
                maxDistance={maxDistance}
                setMaxDistance={setMaxDistance}
                isMobile={isMobile}
                setIsMobile={setIsMobile}
                cameraZ={cameraZ}
                setCameraZ={setCameraZ}
                geoComplexity={geoComplexity}
                meshType={meshType}
            />
            <Footer />
            <MonitoringSketch 
                {...sceneControls}
                particleColor={[0.1, 0.1, 0.9]}  // Blue particles for better visibility on light background
            />
        </>
    )
}
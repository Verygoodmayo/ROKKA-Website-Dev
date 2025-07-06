import Footer from '../../components/Footer/Footer'
import FeaturesContainer from '../features/FeaturesContainer'
import HeroSection from './HeroSection'
import * as THREE from 'three'
import { PageSketch } from '../../components/Sketchs'
import { useState } from 'react'
import { pilaFeatures } from '../../data/pilaFeatures'

// Legacy state variables for backward compatibility with FeaturesContainer
const defaultSettings = {
    frequency: 1.426,
    amplitude: 0.01,
    maxDistance: 0.5,
    isMobile: false,
    cameraZ: 1.85,
    meshType: new THREE.IcosahedronGeometry(100, 80), // Standard ico geometry with reasonable complexity
    geoComplexity: 20, // Reduced complexity for better performance
};

// PILA-specific shader configuration
const pilaShaderConfig = {
    // Core animation controls
    frequency: 1.175,
    amplitude: 3.5,
    maxDistance: 2.85,
    timeSpeed: 0.8,
    
    // Visual controls
    particleColor: [1.0, 1.0, 1.0], // Warm orange-ish for PILA theme
    particleSize: 3.0, // Medium particle size
    colorIntensity: 1.0,
    mouseInfluenceStrength: 1.0,
    
    // Mouse click controls for PILA
    clickInfluenceStrength: 2.5,   // Moderate click waves
    clickWaveSpeed: 3.5,           // Medium wave propagation
    clickDecayRate: 0.9,           // Balanced decay
    
    // Camera configuration for PILA
    cameraPosition: [0, 0, 2],  // Move camera further back to see the Ico geometry
    cameraLookAt: [0, 0, 0],       // Center focus
    cameraFov: 75,                 // Standard field of view
    
    // Noise controls for PILA-specific feel
    noiseScale: 1.0,
    noiseDensity: 1.0,
    noiseOctaves: 3.0,
    noiseLacunarity: 2.0,
    noiseGain: 0.5,
    turbulenceStrength: 1.0,
    flowDirection: 0.0,            // No directional bias
    waveSpeed: 1.0,
    distortionStrength: 1.0
};

export default function PILA() {

  // Legacy state variables for backward compatibility with FeaturesContainer
  const [geoComplexity, setGeoComplexity] = useState(20);
  const [meshType, setMeshType] = useState(defaultSettings.meshType);
  const [frequency, setFrequency] = useState(defaultSettings.frequency);
  const [amplitude, setAmplitude] = useState(defaultSettings.amplitude);
  const [maxDistance, setMaxDistance] = useState(defaultSettings.maxDistance);
  const [isMobile, setIsMobile] = useState(defaultSettings.isMobile);
  const [cameraZ, setCameraZ] = useState(defaultSettings.cameraZ);

  // PILA page-specific shader configuration
  const [pilaConfig, setPilaConfig] = useState(pilaShaderConfig);

  return (
    <>
      <HeroSection></HeroSection>
      <FeaturesContainer
        key={1}
        data={pilaFeatures}
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
      ></FeaturesContainer>
      <Footer></Footer>
      <PageSketch 
        // Canvas configuration
        className="sketch-container"
        id="pila-sketch"
        
        // Geometry configuration
        geoComplexity={geoComplexity}
        meshType={meshType}
        useParkModel={false} // Use Ico geometry for PILA
        
        // Mesh positioning
        meshPosition={[0, 0, 0]}
        meshRotation={[0, 0, 0]}
        
        // GUI configuration
        showDatGui={false}
        
        // Spread all PILA-specific shader configuration as individual props
        particleColor={pilaConfig.particleColor}
        frequency={pilaConfig.frequency}
        amplitude={pilaConfig.amplitude}
        maxDistance={pilaConfig.maxDistance}
        timeSpeed={pilaConfig.timeSpeed}
        noiseScale={pilaConfig.noiseScale}
        noiseDensity={pilaConfig.noiseDensity}
        particleSize={pilaConfig.particleSize}
        colorIntensity={pilaConfig.colorIntensity}
        mouseInfluenceStrength={pilaConfig.mouseInfluenceStrength}
        clickInfluenceStrength={pilaConfig.clickInfluenceStrength}
        clickWaveSpeed={pilaConfig.clickWaveSpeed}
        clickDecayRate={pilaConfig.clickDecayRate}
        noiseOctaves={pilaConfig.noiseOctaves}
        noiseLacunarity={pilaConfig.noiseLacunarity}
        noiseGain={pilaConfig.noiseGain}
        turbulenceStrength={pilaConfig.turbulenceStrength}
        flowDirection={pilaConfig.flowDirection}
        waveSpeed={pilaConfig.waveSpeed}
        distortionStrength={pilaConfig.distortionStrength}
        cameraPosition={pilaConfig.cameraPosition}
        cameraLookAt={pilaConfig.cameraLookAt}
        cameraFov={pilaConfig.cameraFov}
      />
    </>
  )
}
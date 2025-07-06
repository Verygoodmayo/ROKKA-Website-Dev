import Footer from '../../components/Footer/Footer'
import FeaturesContainer from '../features/FeaturesContainer'
import HeroSection from './HeroSection'
import * as THREE from 'three'
import { PageSketch } from '../../components/Sketchs'
import { useState } from 'react'
import { pilaFeatures } from '../../data/pilaFeatures'

// PILA-specific shader configuration with enhanced mouse interaction
const pilaShaderConfig = {
    // Core animation controls - Static mesh with minimal base movement
    frequency: 0.05,           // Very low frequency for almost static base
    amplitude: 0.1,             // Very low amplitude for subtle movement
    maxDistance: 0.8,           // Reduced max distance for contained effect
    timeSpeed: 0.1,             // Very slow time progression for static feel
    
    // Visual controls
    particleColor: [1.2, 1.8, 1.0], // Cool cyan for PILA theme
    particleSize: 2.5,          // Slightly larger particles for visibility
    colorIntensity: 1.2,        // Enhanced color vibrancy
    
    // Enhanced mouse interaction for curl noise attraction
    mouseInfluenceStrength: 3.5, // Strong mouse influence
    mouseOrderRadius: 0.4,      // Larger influence radius around cursor
    mouseOrderStrength: 2.0,    // Strong ordering effect near cursor
    chaosStrength: 1.0,         // Base chaos level
    
    // Mouse click controls disabled for focus on mouse movement
    clickInfluenceStrength: 0.0,   
    clickWaveSpeed: 0.0,           
    clickDecayRate: 1.0,           
    
    // Camera configuration for PILA - Close-up shot of the mesh
    cameraPosition: [0, 0, 0.3],  // Very close to the mesh for cinematic close-up
    cameraLookAt: [0, 0, 0],      // Center focus on mesh
    cameraFov: 85,                // Wider field of view for close-up depth
    
    // Enhanced noise controls for pronounced curl effect
    noiseScale: 1.0,            // Larger noise scale for broader patterns
    noiseDensity: 1.5,          // Higher density for more detail
    noiseOctaves: 4.0,          // More octaves for complex patterns
    noiseLacunarity: 2.0,       // Standard lacunarity
    noiseGain: 0.6,             // Higher gain for more prominent noise layers
    turbulenceStrength: 2.5,    // Enhanced turbulence for pronounced curl
    flowDirection: 0.0,         // No directional bias - let mouse control flow
    waveSpeed: 0.8,             // Moderate wave speed
    distortionStrength: 1.8     // Strong distortion for visible curl effect
};

export default function PILA() {
  // PILA page-specific shader configuration
  const [pilaConfig] = useState(pilaShaderConfig);

  // Default Ico geometry configuration - High detail for close-up shot
  const meshType = new THREE.IcosahedronGeometry(100, 120); // Higher detail for close-up
  const geoComplexity = 80; // Higher complexity for better close-up quality

  return (
    <>
      <HeroSection></HeroSection>
      <FeaturesContainer
        key={1}
        data={pilaFeatures}
        // Legacy props for FeaturesContainer compatibility
        amplitude={pilaConfig.amplitude}
        frequency={pilaConfig.frequency}
        maxDistance={pilaConfig.maxDistance}
        isMobile={false}
        cameraZ={pilaConfig.cameraPosition[2]}
        geoComplexity={geoComplexity}
        meshType={meshType}
      ></FeaturesContainer>
      <Footer></Footer>
      <PageSketch 
        // Canvas configuration
        className="sketch-container"
        id="pila-sketch"
        
        // Geometry configuration - Use default Ico geometry
        geoComplexity={geoComplexity}
        meshType={meshType}
        useParkModel={false} // Important: Use Ico geometry, not Park model
        
        // Mesh positioning - Keep mesh centered and stationary
        meshPosition={[0, 0, 0]}
        meshRotation={[0, 0, 0]}
        
        // GUI configuration
        showDatGui={false}
        
        // Enhanced PILA-specific shader configuration for mouse-attracted curl noise
        particleColor={pilaConfig.particleColor}
        frequency={pilaConfig.frequency}
        amplitude={pilaConfig.amplitude}
        maxDistance={pilaConfig.maxDistance}
        timeSpeed={pilaConfig.timeSpeed}
        noiseScale={pilaConfig.noiseScale}
        noiseDensity={pilaConfig.noiseDensity}
        particleSize={pilaConfig.particleSize}
        colorIntensity={pilaConfig.colorIntensity}
        
        // Enhanced mouse interaction settings
        mouseInfluenceStrength={pilaConfig.mouseInfluenceStrength}
        mouseOrderRadius={pilaConfig.mouseOrderRadius}
        mouseOrderStrength={pilaConfig.mouseOrderStrength}
        chaosStrength={pilaConfig.chaosStrength}
        
        // Disabled click effects to focus on mouse movement
        clickInfluenceStrength={pilaConfig.clickInfluenceStrength}
        clickWaveSpeed={pilaConfig.clickWaveSpeed}
        clickDecayRate={pilaConfig.clickDecayRate}
        
        // Enhanced noise settings for pronounced curl effect
        noiseOctaves={pilaConfig.noiseOctaves}
        noiseLacunarity={pilaConfig.noiseLacunarity}
        noiseGain={pilaConfig.noiseGain}
        turbulenceStrength={pilaConfig.turbulenceStrength}
        flowDirection={pilaConfig.flowDirection}
        waveSpeed={pilaConfig.waveSpeed}
        distortionStrength={pilaConfig.distortionStrength}
        
        // Camera settings
        cameraPosition={pilaConfig.cameraPosition}
        cameraLookAt={pilaConfig.cameraLookAt}
        cameraFov={pilaConfig.cameraFov}
      />
    </>
  )
}
import Footer from '../../components/Footer/Footer'
import FeaturesContainer from '../features/FeaturesContainer'
import HeroSection from './HeroSection'
import * as THREE from 'three'
import DataManagerSketchContainer from './DataManagerSketch'
import { useState } from 'react'
import { dataManagerFeatures } from '../../data/dataManagerFeatures'
import resetPage from '../../components/Utils/resetPage'

const defaultSettings = {
    frequency: 1.426,
    amplitude: 0.01,
    maxDistance: 0.5,
    isMobile: false,
    cameraZ: 1.85,
    meshType: new THREE.OctahedronGeometry(100,236),
    geoComplexity: 136,
};

export default function DataManager() {

  // State variables for the sketch parameters
  const [geoComplexity, setGeoComplexity] = useState(136);
  const [meshType, setMeshType] = useState(defaultSettings.meshType);
  const [frequency, setFrequency] = useState(defaultSettings.frequency);
  const [amplitude, setAmplitude] = useState(defaultSettings.amplitude);
  const [maxDistance, setMaxDistance] = useState(defaultSettings.maxDistance);
  const [isMobile, setIsMobile] = useState(defaultSettings.isMobile);
  const [cameraZ, setCameraZ] = useState(defaultSettings.cameraZ);

  resetPage();

  return (
    <>
      <HeroSection></HeroSection>
      <FeaturesContainer
        key={1}
        data={dataManagerFeatures}
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
      <DataManagerSketchContainer
        geoComplexity={geoComplexity}
        meshType={meshType}
        frequency={frequency}
        setFrequency={setFrequency}
        amplitude={amplitude}
        setAmplitude={setAmplitude}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        cameraZ={cameraZ}
        setCameraZ={setCameraZ}
      ></DataManagerSketchContainer>
    </>
  )
}
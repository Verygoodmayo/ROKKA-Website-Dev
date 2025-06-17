import Footer from '../../components/Footer/Footer'
import '../../styles/pages/data_manager/data_manager.scss'
import FeaturesContainer from '../features/FeaturesContainer'
import HeroSection from './HeroSection'
import * as THREE from 'three'

import feature1_svg from '../../../static/svg/Features/Data_Manager/Prediction_Models.svg'
import feature2_svg from '../../../static/svg/Features/Data_Manager/Database_Aggregation.svg'
import feature3_svg from '../../../static/svg/Features/Data_Manager/Segmentation.svg'
import feature4_svg from '../../../static/svg/Features/Data_Manager/Visualization.svg'
import DataManagerSketchContainer from './DataManagerSketch'
import { useState } from 'react'

const feature1 = {
  title: "Prediction Models",
  description: "Build complex predictive models with simple clicks. No data science degree needed - just select your data and let our AI do the heavy lifting. From basic forecasting to advanced predictions, everything happens without writing a single line of code.",
  image: feature1_svg,
  byNeed: {
    political: {title: "Political Need", description: "Description of political need."},
    social: {title: "Intelligence Need", description: "Description of social need."},
    commercial: {title: "Commercial Need", description: "Description of economic need."},
    research: {title: "Research Need", description: "Description of environmental need."},
  }
}

const feature2  = {
  title: "Database Aggregation",
  description: "Connect and manage multiple data sources through an intuitive interface. No SQL, no database language - just point, click, and unify your data sources instantly.",
  image: feature2_svg,
  byNeed: {
    political: {title: "Political Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
    social: {title: "Intelligence Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
    commercial: {title: "Commercial Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
    research: {title: "Research Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
  }
}

const feature3  = {
  title: "Segmentation",
  description: "Create and manage sophisticated audience segments effortlessly. Combine automatic pattern discovery with powerful filtering - group users by behavior, preferences, or any custom criteria.",
  image: feature3_svg,
  byNeed: {
    political: {title: "Political Need", description: "Description of political need."},
    social: {title: "Intelligence Need", description: "Description of social need."},
    commercial: {title: "Commercial Need", description: "Description of economic need."},
    research: {title: "Research Need", description: "Description of environmental need."},
  }
}

const feature4  = {
  title: "Visualisation",
  description: "See your database clearly, instantly. Our system automatically mirrors your data in clear, easy-to-understand visual formats. No complex setup needed - your information is instantly transformed into intuitive visualizations that make sense. Direct reflection of your data, just easier to understand.",
  image: feature4_svg,
  byNeed: {
    political: {title: "Political Need", description: "Description of political need."},
    social: {title: "Intelligence Need", description: "Description of social need."},
    commercial: {title: "Commercial Need", description: "Description of economic need."},
    research: {title: "Research Need", description: "Description of environmental need."},
  }
}

const pageData = [
  feature1,
  feature2,
  feature3,
  feature4,
]

const defaultSettings = {
    frequency: 1.426,
    amplitude: 0.01,
    maxDistance: 0.5,
    isMobile: false,
    cameraZ: 1.85,
    meshType: new THREE.OctahedronGeometry(100,236),
    geoComplexity: 136,
};

export default function Monitoring() {

  // State variables for the sketch parameters
  const [geoComplexity, setGeoComplexity] = useState(136);
  const [meshType, setMeshType] = useState(defaultSettings.meshType);
  const [frequency, setFrequency] = useState(defaultSettings.frequency);
  const [amplitude, setAmplitude] = useState(defaultSettings.amplitude);
  const [maxDistance, setMaxDistance] = useState(defaultSettings.maxDistance);
  const [isMobile, setIsMobile] = useState(defaultSettings.isMobile);
  const [cameraZ, setCameraZ] = useState(defaultSettings.cameraZ);

  return (
    <>
      <HeroSection></HeroSection>
      <FeaturesContainer
        key={1}
        data={pageData}
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
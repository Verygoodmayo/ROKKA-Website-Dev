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

import PILA_feature1_svg from '../../../static/svg/Features/PILA/RAG.svg'
import PILA_feature2_svg from '../../../static/svg/Features/PILA/Action_Items.svg'
import PILA_feature3_svg from '../../../static/svg/Features/PILA/Mobile.svg'
import PILA_feature4_svg from '../../../static/svg/Features/PILA/Agents.svg'

const feature1 = {
  title: "RAG",
  description: "Our system uses RAG - Retrieval Augmented Generation - which means it first retrieves precise information from your data, then generates clear answers based on that real information. Unlike standard chatbots that make up responses, PILA finds actual data and turns it into meaningful insights. Think of it as a smart librarian for your data - it knows exactly where to look, what to pull, and how to use it.",
  image: PILA_feature1_svg,
  byNeed: {
    political: {title: "Political Need", description: "Description of political need."},
    social: {title: "Intelligence Need", description: "Description of social need."},
    commercial: {title: "Commercial Need", description: "Description of economic need."},
    research: {title: "Research Need", description: "Description of environmental need."},
  }
}

const feature2  = {
  title: "Action Items",
  description: "PILA doesn't just analyze data - it transforms insights into actionable steps. The system  identifies key points requiring attention and turning your insights into practical action plans. Every analysis becomes a strategic roadmap, eliminating the gap between understanding and execution.",
  image: PILA_feature2_svg,
  byNeed: {
    political: {title: "Political Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
    social: {title: "Intelligence Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
    commercial: {title: "Commercial Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
    research: {title: "Research Need", description: "Predictive models help researchers identify potential outcomes, streamline their studies, and allocate resources more effectively, ultimately leading to more accurate and impactful findings."},
  }
}

const feature3  = {
  title: "PILA Mobile App",
  description: "Stay connected to your data insights anywhere, anytime. PILA's mobile app keeps you in constant conversation with your data - whether you're in a meeting, commuting, or working remotely.  Simply speak or type your questions, and PILA responds with precise insights.",
  image: PILA_feature3_svg,
  byNeed: {
    political: {title: "Political Need", description: "Description of political need."},
    social: {title: "Intelligence Need", description: "Description of social need."},
    commercial: {title: "Commercial Need", description: "Description of economic need."},
    research: {title: "Research Need", description: "Description of environmental need."},
  }
}

const feature4  = {
  title: "Agents",
  description: "At PILA's core lies a multi-agent architecture - the foundation of its unique capabilities. Each agent brings unique capabilities - from data cleaning to statistical analysis  - creating a powerful analytical team at your disposal. These agents collaborate seamlessly to break down complex queries into specialized tasks, ensuring thorough and accurate analysis across all dimensions of your data.",
  image: PILA_feature4_svg,
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
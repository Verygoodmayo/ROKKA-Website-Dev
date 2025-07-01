import Footer from "../components/Footer/Footer";
import HeroSection from "./HeroSection";
import PluginsContainer from "./PluginsContainer";
import FeaturesContainer from '../products/features/FeaturesContainer';
import PageSketch from '../components/Sketchs/PageSketch';

import '../styles/pages/plugins/plugins.scss'

import plugins_feature_svg1 from '../../static/svg/Features/Plugins/API.svg';
import plugins_feature_svg2 from '../../static/svg/Features/Plugins/CallCenter.svg';
import plugins_feature_svg3 from '../../static/svg/Features/Plugins/Ecosystem.svg';
import plugins_feature_svg4 from '../../static/svg/Features/Plugins/MobileCommand.svg';
import plugins_feature_svg5 from '../../static/svg/Features/Plugins/DistributionPad.svg';
import plugins_feature_svg6 from '../../static/svg/Features/Plugins/PRD.svg';
import plugins_feature_svg7 from '../../static/svg/Features/Plugins/HateSpeech.svg';

const pluginItem1 = {
    title: "API",
    description: "Our extensive API integration network means your system can seamlessly connect with a wide range of external tools and platforms. We connect with your existing tools and workflows, enhancing your data's potential while simplifying your operations. It's about making what you already have work better for you, not asking you to start over.",
    image: plugins_feature_svg1,
    imageClass: "image-portrait", // Custom image sizing
}

const pluginItem2 = {
    title: "AI Driven Call Center",
    description: "Transform your telephone surveys into powerful data engines. Our AI-driven system turns traditional phone surveys into dynamic, intelligent conversations that capture richer, more accurate data. The smart questionnaire system adapts in real-time based on responses, ensuring you get the most valuable insights from every call while keeping conversations natural and engaging. All data is automatically structured and analyzed, feeding directly into your analytics pipeline for immediate insights. It's the evolution of phone surveys - more efficient, more insightful, and more responsive to both surveyors and respondents.",
    image: plugins_feature_svg2,
    imageClass: "image-landscape", // Custom image sizing
}

const pluginItem3 = {
    title: "Ecosystem Analyzer",
    description: "Transform your telephone surveys into powerful data engines. Our AI-driven system turns traditional phone surveys into dynamic, intelligent conversations that capture richer, more accurate data. The smart questionnaire system adapts in real-time based on responses, ensuring you get the most valuable insights from every call while keeping conversations natural and engaging. All data is automatically structured and analyzed, feeding directly into your analytics pipeline for immediate insights. It's the evolution of phone surveys - more efficient, more insightful, and more responsive to both surveyors and respondents.",
    image: plugins_feature_svg3,
    imageClass: "image-square", // Custom image sizing
}

const pluginItem4 = {
    title: "Mobile Command",
    description: "Transform your telephone surveys into powerful data engines. Our AI-driven system turns traditional phone surveys into dynamic, intelligent conversations that capture richer, more accurate data. The smart questionnaire system adapts in real-time based on responses, ensuring you get the most valuable insights from every call while keeping conversations natural and engaging. All data is automatically structured and analyzed, feeding directly into your analytics pipeline for immediate insights. It's the evolution of phone surveys - more efficient, more insightful, and more responsive to both surveyors and respondents.",
    image: plugins_feature_svg4,
    imageClass: "image-landscape", // Custom image sizing
}

const pluginItem5 = {
    title: "Distribution Pad",
    description: "Transform your telephone surveys into powerful data engines. Our AI-driven system turns traditional phone surveys into dynamic, intelligent conversations that capture richer, more accurate data. The smart questionnaire system adapts in real-time based on responses, ensuring you get the most valuable insights from every call while keeping conversations natural and engaging. All data is automatically structured and analyzed, feeding directly into your analytics pipeline for immediate insights. It's the evolution of phone surveys - more efficient, more insightful, and more responsive to both surveyors and respondents.",
    image: plugins_feature_svg5,
    imageClass: "image-portrait", // Custom image sizing
}

const pluginItem6 = {
    title: "Parliment Regulation Dashbaord",
    description: "Transform your telephone surveys into powerful data engines. Our AI-driven system turns traditional phone surveys into dynamic, intelligent conversations that capture richer, more accurate data. The smart questionnaire system adapts in real-time based on responses, ensuring you get the most valuable insights from every call while keeping conversations natural and engaging. All data is automatically structured and analyzed, feeding directly into your analytics pipeline for immediate insights. It's the evolution of phone surveys - more efficient, more insightful, and more responsive to both surveyors and respondents.",
    image: plugins_feature_svg6,
    imageClass: "image-square", // Custom image sizing
}

const pluginItem7 = {
    title: "Hate Speech Detector",
    description: "Transform your telephone surveys into powerful data engines. Our AI-driven system turns traditional phone surveys into dynamic, intelligent conversations that capture richer, more accurate data. The smart questionnaire system adapts in real-time based on responses, ensuring you get the most valuable insights from every call while keeping conversations natural and engaging. All data is automatically structured and analyzed, feeding directly into your analytics pipeline for immediate insights. It's the evolution of phone surveys - more efficient, more insightful, and more responsive to both surveyors and respondents.",
    image: plugins_feature_svg7,
    imageClass: "image-landscape", // Custom image sizing
}

const pluginsData = [
    pluginItem1,
    pluginItem2,
    pluginItem3,
    pluginItem4,
    pluginItem5,
    pluginItem6,
    pluginItem7
]

export default function Plugins() {

    return (
        <>
        <HeroSection></HeroSection>
        <PageSketch
            // Canvas configuration
            className="sketch-container"
            id="plugins-sketch"
            
            // Geometry configuration
            geoComplexity={100}
            useParkModel={false} // Use IcoBufferMesh for plugins
            
            // Mesh positioning
            meshPosition={[0, 0, 0]}
            meshRotation={[0, 0, 0]}
            
            // Visual controls - Blue particles for plugins
            particleColor={[0.1, 0.1, 1.0]} // Blue color
            particleSize={1.0}
            colorIntensity={1.0}
            
            // Core animation controls
            frequency={0.175}
            amplitude={3.5}
            maxDistance={2.85}
            timeSpeed={0.5}
            
            // Mouse interaction
            mouseInfluenceStrength={0.0}
            clickInfluenceStrength={2.0}
            clickWaveSpeed={3.0}
            clickDecayRate={0.8}
            
            // Noise controls
            noiseScale={1.0}
            noiseDensity={1.0}
            noiseOctaves={3.0}
            noiseLacunarity={2.0}
            noiseGain={0.5}
            turbulenceStrength={1.0}
            flowDirection={0.0}
            waveSpeed={1.0}
            distortionStrength={1.0}
            
            // Camera configuration
            cameraPosition={[0, 0, 0.25]}
            cameraLookAt={[0, 0, 0]}
            cameraFov={75}
            
            // GUI configuration
            showDatGui={false}
        />
        {/* <PluginsContainer data={pluginsData}></PluginsContainer> */}
        <FeaturesContainer id={'plugins-features'} data={pluginsData}></FeaturesContainer>
        <Footer></Footer>
        </>
    );

}
import Footer from "../components/Footer/Footer";
import HeroSection from "./HeroSection";
import PluginsContainer from "./PluginsContainer";
import FeaturesContainer from '../products/features/FeaturesContainer';
import PageSketch from '../components/Sketchs/PageSketch';
import { pluginsData } from '../data/pluginsData';

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
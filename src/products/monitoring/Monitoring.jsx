import Footer from '../../components/Footer/Footer'
import FeaturesContainer from '../features/FeaturesContainer'
import HeroSection from './HeroSection'
import * as THREE from 'three'

import '../../styles/pages/monitoring/monitoring.scss'

import moinitoring_feature1_svg from '../../../static/svg/Features/Monitoring/Objective.svg'
import moinitoring_feature2_svg from '../../../static/svg/Features/Monitoring/AnySource.svg'
import moinitoring_feature3_svg from '../../../static/svg/Features/Monitoring/Tracker.svg'
import moinitoring_feature4_svg from '../../../static/svg/Features/Monitoring/PostAnalysis.svg'
import { useState } from 'react'
import PageSketch from '../../components/Sketchs/PageSketch'

const feature1 = {
  title: "Objective Oriented Approach",
  description: "Got a goal? Our monitoring understands your objectives and delivers precisely the insights that matter to you, filtering out everything else to keep you focused on what's important.",
  image: moinitoring_feature1_svg,
  imageClass: "image-portrait", // Custom image sizing
  byNeed: {
    political: {title: "Political Need", description: "Political operatives use objective-oriented monitoring to focus on campaign-specific goals such as voter sentiment analysis, opposition research, or issue tracking. Campaigns can tailor their monitoring to specific demographics, geographic regions, or policy topics that align with their electoral strategy, ensuring that social media intelligence directly supports campaign messaging and voter outreach efforts."},
    social: {title: "Intelligence Need", description: "Intelligence analysts employ objective-oriented monitoring to focus on specific threats, entities, or information requirements. By defining clear intelligence objectives, analysts can filter through vast amounts of social media data to identify relevant security threats, track specific individuals or organizations, or monitor emerging situations that could impact national security or organizational safety."},
    commercial: {title: "Commercial Need", description: "Businesses use objective-oriented monitoring to align social media intelligence with specific marketing goals, brand management objectives, or competitive analysis targets. Companies can focus on metrics that matter most to their bottom line - whether tracking brand sentiment, monitoring competitor activities, or measuring campaign effectiveness. This approach ensures that social media insights directly support business strategy and decision-making processes."},
    research: {title: "Research Need", description: "Researchers leverage objective-oriented monitoring to focus their data collection on specific research questions and hypotheses. This targeted approach ensures that social media analysis aligns with research objectives, whether studying public opinion trends, behavioral patterns, or communication dynamics. Researchers can filter out irrelevant noise and concentrate on data that directly addresses their scholarly inquiries, improving the validity and reliability of their findings."},
  }
}

const feature2  = {
  title: "Monitor Any Source",
  description: "Look beyond traditional data sources. Our technology scans and analyzes content across the entire web, finding valuable insights wherever they exist - from social media to specialized platforms.",
  image: moinitoring_feature2_svg,
  imageClass: "image-landscape", // Custom image sizing
  byNeed: {
    political: {title: "Political Need", description: "Political campaigns use comprehensive source monitoring to track public opinion across all digital channels where voters engage. This includes mainstream social media, local community forums, news comment sections, and emerging platforms popular with specific voter demographics. Comprehensive monitoring ensures campaigns understand the full spectrum of public discourse and can respond to emerging narratives regardless of where they originate."},
    social: {title: "Intelligence Need", description: "Intelligence professionals require comprehensive source monitoring to avoid blind spots in their information gathering. Threats and important intelligence can emerge from any platform, including encrypted messaging apps, dark web forums, specialized communities, or regional platforms. Multi-source monitoring ensures complete situational awareness and prevents critical intelligence from being missed due to platform limitations."},
    commercial: {title: "Commercial Need", description: "Businesses use multi-source monitoring to gain a complete view of their brand presence and customer conversations across the entire digital ecosystem. This includes monitoring review sites, forums, blogs, news outlets, and emerging platforms where customers might discuss products or services. Companies can identify new market opportunities, track brand mentions in unexpected contexts, and ensure comprehensive reputation management."},
    research: {title: "Research Need", description: "Academic researchers benefit from comprehensive source monitoring to ensure their studies capture diverse perspectives and avoid sampling bias. By monitoring beyond traditional platforms, researchers can access specialized communities, niche forums, and emerging platforms where specific demographics or interest groups congregate. This comprehensive approach enhances the generalizability and robustness of research findings across different digital environments."},
  }
}

const feature3  = {
  title: "Data Collection (Tracker)",
  description: "Follow specific influencers, thought leaders, or key figures that matter to your organization. Get real-time insights about what they're saying and how they're affecting your market.",
  image: moinitoring_feature3_svg,
  imageClass: "image-square", // Custom image sizing
  byNeed: {
    political: {title: "Political Need", description: "Political campaigns track key political figures, journalists, activists, and influential voices who shape public opinion and media narratives. This tracking helps campaigns anticipate opposition moves, identify media opportunities, build relationships with key influencers, and respond quickly to emerging political developments that could impact electoral outcomes."},
    social: {title: "Intelligence Need", description: "Intelligence analysts use tracking to monitor persons of interest, organizations, or developing situations that pose potential security concerns. Continuous tracking enables the identification of behavioral patterns, network connections, and emerging threats. This capability is crucial for threat assessment, counter-intelligence operations, and maintaining awareness of evolving security situations."},
    commercial: {title: "Commercial Need", description: "Companies employ tracking to monitor key influencers, brand ambassadors, competitors, and industry thought leaders who significantly impact their market space. By tracking these key figures, businesses can anticipate market trends, identify partnership opportunities, respond to competitive moves, and leverage influencer relationships for marketing purposes. This targeted tracking provides actionable intelligence for strategic business decisions."},
    research: {title: "Research Need", description: "Researchers use tracking capabilities to follow specific individuals, hashtags, or topics over extended periods, enabling longitudinal studies of social phenomena. This allows for the analysis of how opinions evolve, how information spreads through networks, and how key figures influence public discourse. Tracking provides the temporal data necessary for understanding causation and correlation in social media research."},
  }
}

const feature4  = {
  title: "Post Analysis",
  description: "Get instant analysis of every post as it appears, understanding its impact and relevance immediately. Plus, dive deeper with custom questions about any aspect of your data - from broad trends to specific posts. Generate strategic reports or get immediate answers about what matters to you.",
  image: moinitoring_feature4_svg,
  imageClass: "image-landscape", // Custom image sizing
  byNeed: {
    political: {title: "Political Need", description: 'Campaigns create election-focused analytical questions that align with their specific electoral strategy and voter research needs. A campaign might ask "How do voters in key demographics respond to policy announcements?" or "What concerns are most frequently mentioned by undecided voters?" These custom queries direct analysis toward voter sentiment and political intelligence that directly supports campaign messaging, targeting decisions, and strategic positioning efforts.'},
    social: {title: "Intelligence Need", description: 'Analysts formulate intelligence-specific questions that focus on their particular security concerns and information requirements. An analyst might ask "What coordination patterns appear in suspect communications?" or "How are threat narratives evolving over time?" These targeted queries direct the analytical process toward security-relevant insights, enabling efficient processing of large data volumes while maintaining focus on mission-critical intelligence objectives.'},
    commercial: {title: "Commercial Need", description: 'Companies configure business-focused analytical questions that target their specific commercial intelligence needs. A tech company might ask "What features do users request most frequently?" while a retail brand could focus on "How do customers describe their shopping experience?" These custom queries guide the analysis toward actionable business insights relevant to their market position, customer base, and strategic objectives, ensuring the extracted data directly supports business decision-making processes.'},
    research: {title: "Research Need", description: 'Researchers define custom research questions that align with their specific academic hypotheses and theoretical frameworks. For instance, a sociologist might ask "What are the main themes in discussions about social mobility?" while a psychologist could focus on "How do users express emotional responses to life transitions?" These tailored analytical queries direct the AI to extract insights relevant to their scholarly objectives, enabling systematic examination of social media data while maintaining research rigor and focus on their particular area of study.'},
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
    meshType: new THREE.IcosahedronGeometry(100, 20), // Balanced complexity for good morphing
    geoComplexity: 20, // Balanced complexity that still looks smooth
};

// Monitoring-specific shader configuration
const monitoringShaderConfig = {
    // Core animation controls
    frequency: 0.02,
    amplitude: 0.002,
    maxDistance: 0.001,
    timeSpeed: 0.6,
    
    // Visual controls
    particleColor: [0.8, 0.9, 1.0], // Slightly blue-tinted white for monitoring theme
    particleSize: 4.0, // Much larger particles for better visibility
    colorIntensity: 1.0,
    mouseInfluenceStrength: 10.8,
    
    // Mouse click controls for monitoring
    clickInfluenceStrength: 3.0,   // Strong click waves for monitoring interaction
    clickWaveSpeed: 4.0,           // Fast wave propagation for responsive feel
    clickDecayRate: 1.2,           // Moderate decay for visible effect duration
    
    // Camera configuration for monitoring
    cameraPosition: [-100, 20, 50], // Park model viewing position (similar to home page)
    cameraLookAt: [0, 0, 0],       // Center focus
    cameraFov: 75,                 // Standard field of view
    
    // Noise controls for monitoring-specific feel
    noiseScale: 1.1,
    noiseDensity: 1.3,
    noiseOctaves: 4.0,
    noiseLacunarity: 2.1,
    noiseGain: 0.6,
    turbulenceStrength: 1.1,
    flowDirection: 180.0, // Downward flow for monitoring data stream effect
    waveSpeed: 0.9,
    distortionStrength: 1.2
};

export default function Monitoring() {

  // Legacy state variables for backward compatibility with FeaturesContainer
  const [geoComplexity, setGeoComplexity] = useState(defaultSettings.geoComplexity);
  const [meshType, setMeshType] = useState(defaultSettings.meshType);
  const [frequency, setFrequency] = useState(defaultSettings.frequency);
  const [amplitude, setAmplitude] = useState(defaultSettings.amplitude);
  const [maxDistance, setMaxDistance] = useState(defaultSettings.maxDistance);
  const [isMobile, setIsMobile] = useState(defaultSettings.isMobile);
  const [cameraZ, setCameraZ] = useState(defaultSettings.cameraZ);

  // Monitoring page-specific shader configuration
  const [monitoringConfig, setMonitoringConfig] = useState(monitoringShaderConfig);

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
      <PageSketch
        // Canvas configuration
        className="sketch-container"
        id="monitoring-sketch"
        
        // Geometry configuration
        geoComplexity={geoComplexity}
        meshType={meshType}
        useParkModel={true} // Enable Park Model for monitoring
        
        // Mesh positioning
        meshPosition={[50, 0, 0]} // Translate X by 50
        meshRotation={[0, -2.1, 0]} // Keep default park rotation
        
        // GUI configuration
        showDatGui={false} // Hide dat.gui controls
        
        // Apply monitoring-specific shader configuration
        {...monitoringConfig}
      />
    </>
  )
}
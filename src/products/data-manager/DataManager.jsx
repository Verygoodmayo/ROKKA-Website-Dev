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
    political: {title: "Political Need", description: "Harness the power of predictive analytics for political decision-making. Our platform enables campaign strategists, policy makers, and political analysts to forecast election outcomes, analyze voter sentiment trends, and predict the impact of policy decisions. Track public opinion shifts, identify key demographic patterns, and optimize campaign messaging strategies using advanced machine learning models trained on political data."},
    intelligence: {title: "Intelligence Need", description: "Transform vast amounts of open-source information into actionable intelligence insights. Perfect for security analysts, researchers, and intelligence professionals who need to monitor social movements, predict emerging threats, and analyze public sentiment across digital platforms. Our AI processes social media data, news sources, and public records to identify patterns and forecast potential developments in areas of interest."},
    commercial: {title: "Commercial Need", description: "Drive business growth through data-driven predictions. Whether you're forecasting sales trends, predicting customer behavior, analyzing market demand, or planning inventory levels, our platform delivers accurate commercial predictions. Ideal for business analysts, marketing teams, and executives who need to make strategic decisions based on reliable forecasting models without the complexity of traditional data science tools."},
    research: {title: "Research Need", description: "Accelerate academic and scientific research with powerful predictive modeling capabilities. Researchers across disciplines can analyze complex datasets, identify hidden patterns, test hypotheses, and generate predictive insights. From social science research to market studies, our platform democratizes access to advanced analytics tools traditionally available only to data science specialists."},
  }
}

const feature2  = {
  title: "Database Aggregation",
  description: "Connect and manage multiple data sources through an intuitive interface. No SQL, no database language - just point, click, and unify your data sources instantly.",
  image: feature2_svg,
  byNeed: {
    political: {title: "Political Need", description: "Transform scattered political data into strategic campaign advantages. Instead of juggling multiple voter databases and polling systems, campaigns get unified voter insights that reveal winning strategies. Identify key swing demographics faster by connecting voter behavior patterns across different data sources. Optimize campaign spending and messaging with complete voter profiles that would take months to compile manually, delivered instantly through automated data unification that eliminates information silos."},
    intelligence: {title: "Intelligence Need", description: "Transform fragmented intelligence gathering into comprehensive situational awareness. Instead of manually checking dozens of separate sources, analysts get unified data streams that reveal patterns invisible in isolated systems. Identify emerging threats faster by connecting dots across previously disconnected information sources. Gain complete intelligence pictures that would take weeks to assemble manually, delivered in minutes through automated data aggregation that eliminates blind spots and information gaps."},
    commercial: {title: "Commercial Need", description: "Transform disconnected business systems into unified market intelligence. Instead of struggling with data scattered across multiple platforms, businesses get complete customer and market views that drive revenue growth. Identify sales opportunities faster by connecting customer behavior patterns across all touchpoints. Make strategic decisions with comprehensive business insights that would require expensive consultants to compile, delivered automatically through seamless data integration that breaks down departmental silos."},
    research: {title: "Research Need", description: "Transform isolated research datasets into breakthrough discoveries. Instead of manually combining data from different studies and sources, researchers get unified analytical datasets that reveal hidden correlations. Accelerate research timelines by connecting findings across multiple data collection methods and timeframes. Generate publishable insights with comprehensive research datasets that would take months to manually compile, delivered instantly through intelligent data fusion that eliminates research bottlenecks."},
  }
}

const feature3  = {
  title: "Segmentation",
  description: "Create and manage sophisticated audience segments effortlessly. Combine automatic pattern discovery with powerful filtering - group users by behavior, preferences, or any custom criteria.",
  image: feature3_svg,
  byNeed: {
    political: {title: "Political Need", description: "DStop wasting campaign dollars on voter segments that'll never switch sides. Automatically segment your electorate to discover which demographic combinations actually swing elections, not just theoretical voter blocks. Identify the crucial undecided voter segments who determine outcomes while filtering out audiences who've already made up their minds. Turn campaign guesswork into data-driven victories by segmenting voters into personality-driven groups, knowing exactly which messages resonate with each audience segment through precision targeting that traditional polls can't deliver."},
    intelligence: {title: "Intelligence Need", description: "Cut through information overload by segmenting threats into actionable risk categories. Automatically separate genuine security risk segments from background noise while ensuring no real threats slip through various audience clusters. Segment individuals and groups into behavioral patterns and network connections that human analysts miss in massive datasets. Save extensive manual investigation time by instantly segmenting populations into concerning pattern combinations, allowing security teams to focus on high-priority audience segments where they'll have maximum protective impact."},
    commercial: {title: "Commercial Need", description: "Multiply your marketing ROI by segmenting customers into ready-to-buy audiences. Discover which customer segments and behavioral combinations predict high-value purchases, avoiding prospect segments who browse but never convert. Segment your market to identify the most profitable customer personalities before competitors do, protecting market share and pricing power. Eliminate marketing waste by segmenting audiences based on buying cycle stages, dramatically increasing conversion rates through behavioral audience segmentation."},
    research: {title: "Research Need", description: "Uncover research population segments that change how you interpret findings. Automatically segment participants into clusters that respond differently to interventions, revealing why some studies show conflicting results across different audience groups. Segment your research populations to find statistically significant patterns hidden when analyzing entire groups as single audiences. Accelerate peer review and publication by presenting clear participant segments with measurable differences instead of averaged results that obscure important audience variations."},
  }
}

const feature4  = {
  title: "Visualisation",
  description: "See your database clearly, instantly. Our system automatically mirrors your data in clear, easy-to-understand visual formats. No complex setup needed - your information is instantly transformed into intuitive visualizations that make sense. Direct reflection of your data, just easier to understand.",
  image: feature4_svg,
  byNeed: {
    political: {title: "Political Need", description: "Turn endless voter data into clear campaign insights you can actually use. See your electoral information transformed into visual formats that reveal patterns hiding in spreadsheets. Stop struggling with raw voter databases and start understanding what your data is telling you through automatic graphic representations. Make better campaign decisions when your information becomes immediately comprehensible instead of overwhelming."},
    intelligence: {title: "Intelligence Need", description: "Convert complex threat data into visual intelligence that makes sense immediately. See your information transformed into clear graphic formats that reveal what matters most in your datasets. Replace time-consuming data analysis with instant visual understanding of your intelligence information. Make faster security decisions when your data becomes immediately readable through automatic database visualization."},
    commercial: {title: "Commercial Need", description: "Turn confusing business data into insights you can act on right away. See your sales and customer information transformed into visual formats that show what's really happening in your business. Stop getting lost in spreadsheets and start understanding your business patterns through clear graphic representations of your database. Make confident decisions when your information becomes instantly comprehensible."},
    research: {title: "Research Need", description: "Convert complex research data into visual evidence that communicates clearly. See your datasets transformed into graphic formats that make your findings immediately understandable to any audience. Replace dense statistical reports with clear visual representations that show what your research discovered. Strengthen your research impact when your data becomes instantly accessible through automatic visualization."},
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

export default function DataManager() {

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
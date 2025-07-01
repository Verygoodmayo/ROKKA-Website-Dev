import Footer from "../components/Footer/Footer";
import HeroSection from "./HeroSection";
import PluginsContainer from "./PluginsContainer";
import FeaturesContainer from '../products/features/FeaturesContainer';

import '../styles/pages/plugins/plugins.scss'

import plugins_feature_svg1 from '../../static/svg/Features/Plugins/API.svg';
import plugins_feature_svg3 from '../../static/svg/Features/Plugins/Ecosystem.svg';
import plugins_feature_svg4 from '../../static/svg/Features/Plugins/MobileCommand.svg';
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
    image: "https://via.placeholder.com/150",
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
    image: "https://via.placeholder.com/150",
    imageClass: "image-portrait", // Custom image sizing
}

const pluginItem6 = {
    title: "Parliment Regulation Dashbaord",
    description: "Transform your telephone surveys into powerful data engines. Our AI-driven system turns traditional phone surveys into dynamic, intelligent conversations that capture richer, more accurate data. The smart questionnaire system adapts in real-time based on responses, ensuring you get the most valuable insights from every call while keeping conversations natural and engaging. All data is automatically structured and analyzed, feeding directly into your analytics pipeline for immediate insights. It's the evolution of phone surveys - more efficient, more insightful, and more responsive to both surveyors and respondents.",
    image: "https://via.placeholder.com/150",
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
        {/* <PluginsContainer data={pluginsData}></PluginsContainer> */}
        <FeaturesContainer id={'plugins-features'} data={pluginsData}></FeaturesContainer>
        <Footer></Footer>
        </>
    );

}
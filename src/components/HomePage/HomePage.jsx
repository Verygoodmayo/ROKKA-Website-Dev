import Menu from "../Menu/Menu";
import HomePageSketch from "./HomePageSketch";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ValuesSection from "./ValuesSection";
import Diagram from "./Diagram/Diagram";
import Footer from "../Footer/Footer";
import { useHomePageCleanup } from "../Utils/NavigationCleanup";

export default function HomePage() {
    // Add home page cleanup and navigation handling
    useHomePageCleanup();

    return (
        <>
        <HomePageSketch></HomePageSketch>
        <HeroSection></HeroSection>
        <AboutSection></AboutSection>
        <ValuesSection></ValuesSection>
        <Diagram></Diagram>
        <Footer></Footer>
        </>   
    )
}
import Menu from "../Menu/Menu";
import HomePageSketch from "./HomePageSketch";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ValuesSection from "./ValuesSection";
import Diagram from "./Diagram/Diagram";
import Footer from "../Footer/Footer";

export default function HomePage() {

    return (
        <>
        {/* Menu */}
        <Menu></Menu>
        <HomePageSketch></HomePageSketch>
        <HeroSection></HeroSection>
        <AboutSection></AboutSection>
        <ValuesSection></ValuesSection>
        <Diagram></Diagram>
        <Footer></Footer>
        </>   
    )
}
import Menu from "../Menu/Menu";
import HomePageSketch from "./HomePageSketch";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ValuesSection from "./ValuesSection";
import Diagram from "./Diagram/Diagram";
import Footer from "../Footer/Footer";

import '../../styles/pages/home_page/home_page.scss';

export default function HomePage() {

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
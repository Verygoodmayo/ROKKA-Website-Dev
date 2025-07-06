import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ModalBackgroundScene } from "../UI/ModalWindow";

export default function About() {
    const showHideAnimation = useRef();

    // About scene configuration
    const aboutSceneConfig = {
        particleColor: [0.1, 0.1, 0.9], // Blue particles
        frequency: 0.175,
        amplitude: 3.5,
        timeSpeed: 0.5,
        turbulenceStrength: 1.0,
        noiseOctaves: 3.0,
        flowDirection: 0.0,
        waveSpeed: 1.0
    };

    useGSAP(() => {
        showHideAnimation.current = gsap.timeline({paused: true});
        showHideAnimation.current.to(".about-container", { opacity: 1, x: '0%' });

        return () => showHideAnimation.current.kill();
    }, []);

    return (
        <div className="about-container">
            <div className="about-close" onClick={() => showHideAnimation.current.play(0)}>
                <div className="close-line"></div>
                <div className="close-line"></div>
            </div>
            <p className="header">About Us</p>
            <p className="body1">
                ROKKA was founded in 2017 after we identified a critical gap in the data analytics industry - organizations had access to powerful data but lacked a unified, accessible tool that could handle diverse analytical needs effectively. Born from years of real-world experience working with clients across various sectors, we witnessed how teams struggled with fragmented solutions, each requiring different expertise and workflows for different types of analysis. 
            </p>
            <p className="body1">
                Today, ROKKA operates globally with over twenty employees across Israel and around the world, combining expertise from data science, artificial intelligence, and user experience design. With years of satisfied clients across multiple industries, we've proven our approach works. Our mission is to create a single, powerful platform that's genuinely accessible to everyone - whether you're conducting intelligence analysis, business strategy, political research, or academic studies. Instead of juggling multiple specialized tools, ROKKA provides one comprehensive solution that adapts to your specific domain and delivers sophisticated analysis through intelligent interfaces that understand your needs and provide results without unnecessary complexity.
            </p>
            <ModalBackgroundScene 
                id="about-sketch" 
                config={aboutSceneConfig}
            />
        </div>
    )
}
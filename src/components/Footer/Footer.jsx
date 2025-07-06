import FooterItem from "./FooterItem";
import logotype_white from '../../../static/svg/Logotype/Logotype_White.svg'
import { Button } from "../UI";
import FooterSketch from "./Sketch/FooterSketch";
import FooterNavigationSection from "./FooterNavigationSection";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ModalWindow, LegalContent, PrivacyPolicyContent } from "../UI/ModalWindow";

const menuItems = {

}

export default function Footer() {
    const aboutTL = useRef();
    const [legalModalOpen, setLegalModalOpen] = useState(false);
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

    // Scene configurations for different modals
    const legalSceneConfig = {
        particleColor: [0.1, 0.1, 0.9], // Blue particles
        frequency: 0.15,
        amplitude: 2.8,
        timeSpeed: 0.6,
        turbulenceStrength: 1.2,
        noiseOctaves: 4.0,
        flowDirection: 45, // Different flow pattern
        waveSpeed: 1.2
    };

    const privacySceneConfig = {
        particleColor: [0.1, 0.1, 0.9], // Blue particles  
        frequency: 0.12,
        amplitude: 3.2,
        timeSpeed: 0.4,
        turbulenceStrength: 0.8,
        noiseOctaves: 3.0,
        flowDirection: -30, // Different flow pattern
        waveSpeed: 0.8
    };

    useGSAP(() => {
        aboutTL.current = gsap.timeline({ paused: true });
        aboutTL.current.to('.about-container', { opacity: 1, x: '0%', duration: 0.5, ease: 'power1.inOut' });
        return () => aboutTL.current.kill();
    }, []);

    return (
        <section
            className="footer"
        >
            <div className="main-section">
                <div className="info-section">
                    <div className="logotype-wrapper">
                        <Link to="/" className="logotype-link">
                            <img className="logotype-white" src={logotype_white}></img>
                        </Link>
                        <Button label={"Let's Talk"} isPrimary={false} Outline={true}></Button>
                    </div>
                    <div className="info-wrapper">
                        <p className="info">Yiga'al Alon 108, Tel Aviv-Jaffa</p>
                        <a className="info">info@ROKKA.ai</a>
                    </div>
                </div>
               <FooterNavigationSection></FooterNavigationSection>
            </div>
            <div className="bottom-section">
                <FooterItem 
                    label='Privacy Policy' 
                    onClick={() => setPrivacyModalOpen(true)}
                />
                <FooterItem 
                    label='Legal' 
                    onClick={() => setLegalModalOpen(true)}
                />
                <FooterItem 
                    label='About' 
                    onClick={() => aboutTL.current.play(0)}
                />
                <FooterItem label='Cookies Opt Out' />
            </div>

            <FooterSketch />
            
            {/* Legal Modal */}
            <ModalWindow
                title="Legal"
                isOpen={legalModalOpen}
                onClose={() => setLegalModalOpen(false)}
                sceneConfig={legalSceneConfig}
            >
                <LegalContent />
            </ModalWindow>
            
            {/* Privacy Policy Modal */}
            <ModalWindow
                title="Privacy Policy"
                isOpen={privacyModalOpen}
                onClose={() => setPrivacyModalOpen(false)}
                sceneConfig={privacySceneConfig}
            >
                <PrivacyPolicyContent />
            </ModalWindow>
        </section>
    )
}
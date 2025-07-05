import FooterItem from "./FooterItem";
import logotype_white from '../../../static/svg/Logotype/Logotype_White.svg'
import Button from "../Button.jsx";
import FooterSketch from "./Sketch/FooterSketch";
import FooterNavigationSection from "./FooterNavigationSection";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const menuItems = {

}

export default function Footer() {

    const aboutTL = useRef();

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
                <FooterItem label='Privacy Policy'></FooterItem>
                <FooterItem label='Legal'></FooterItem>
                <FooterItem label='About' onClick={
                    () => {
                        aboutTL.current.play(0);
                    }
                }></FooterItem>
                <FooterItem label='Cookies Opt Out'></FooterItem>
            </div>

            <FooterSketch></FooterSketch>
        </section>
    )
}
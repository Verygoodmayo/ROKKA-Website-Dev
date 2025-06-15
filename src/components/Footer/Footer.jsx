import FooterItem from "./FooterItem";
import logotype_white from '../../../static/svg/Logotype_White.svg'
import Button from "../Button";
import phoneSVG from '../../../static/svg/products/Phone.svg'
import FooterSketch from "./Sketch/FooterSketch";
import FooterNavigationSection from "./FooterNavigationSection";

const menuItems = {

}

export default function Footer() {

    return (
        <section
            className="footer"
        >
            <div className="main-section">
                <div className="info-section">
                    <div className="logotype-wrapper">
                        <img className="logotype-white" src={logotype_white}></img>
                        <Button label={"Let's Talk"} isPrimary={false} Outline={true} imgSrc={phoneSVG}></Button>
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
                <FooterItem label='About'></FooterItem>
                <FooterItem label='Cookies Opt Out'></FooterItem>
            </div>

            <FooterSketch></FooterSketch>
        </section>
    )
}
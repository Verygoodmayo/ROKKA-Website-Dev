import useIsMobile from "../Utils/UseIsMobile";
import logotype from '../../../static/png/Logotype.png';
import hamburgerIcon from '../../../static/svg/menu/hamburger.svg';
import MenuItem from "./MenuItem";
import { Link } from 'react-router-dom';
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MobileMenu() {
    const menuItemWrapper = useRef(null);
    const hamburgerIconRef = useRef(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("products"); // "products" or "byNeed"

    // GSAP animation for menu open/close
    useGSAP(() => {
        if (!menuItemWrapper.current) return;
        gsap.set(menuItemWrapper.current, { y: "-100%", display: "none" }); // default closed
        if (menuOpen) {
            gsap.to(menuItemWrapper.current, {
                y: 0,
                display: "block",
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(menuItemWrapper.current, {
                y: "-100%",
                display: "none",
                duration: 0.4,
                ease: "power2.in"
            });
        }
    }, [menuOpen]);

    // Toggle menu open/close
    const handleHamburgerClick = () => {
        setMenuOpen(open => !open);
    };

    // Toggle between sections
    const handleSectionToggle = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="menu-container mobile">
            <div className="header-wrapper">
                <Link key={1} to="/">
                    <img className="logotype" src={logotype} alt="Logotype" />
                </Link>
                <div ref={hamburgerIconRef} className="hamburger-icon-wrapper" onClick={handleHamburgerClick}>
                    <img className="hamburger-icon" src={hamburgerIcon} alt="Menu" />
                </div>
            </div>
            <div ref={menuItemWrapper} className="menu-items-wrapper">
                <div className="mobile-menu-tabs">
                    <span
                        className={`menu-tab ${activeSection === "products" ? "active" : ""}`}
                        onClick={() => handleSectionToggle("products")}
                    >
                        Products
                    </span>
                    <span
                        className={`menu-tab ${activeSection === "byNeed" ? "active" : ""}`}
                        onClick={() => handleSectionToggle("byNeed")}
                    >
                        By Need
                    </span>
                </div>
                {activeSection === "products" && (
                    <div className="products-section">
                        <div className="core-tech-section">
                            <p className="menu-item header">Core Technology</p>
                            <MenuItem label={'Data Manager'} link={'/products/data-manager'} />
                            <MenuItem label={'Monitoring'} link={'/products/monitoring'} />
                            <MenuItem label={'PILA'} link={'/products/PILA'} />
                        </div>
                        <div className="plugins-section">
                            <p className="menu-item header">Plugins</p>
                            <div className="inner-wrapper">
                                <div className="plugins-inner-wrapper">
                                    <MenuItem label={'Call Center'} />
                                    <MenuItem label={'Election Day'} />
                                    <MenuItem label={'Ecosystem Analyzer'} />
                                </div>
                                <div className="plugins-inner-wrapper">
                                    <MenuItem label={'API'} />
                                    <MenuItem label={'Parliment Regulation Dashboard'} />
                                    <MenuItem label={'Hate Speech Detector'} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeSection === "byNeed" && (
                    <div className="by-need-section">
                        <p className="menu-item header">By Need</p>
                        {/* Add your By Need menu items here */}
                        <MenuItem label={'Need 1'} />
                        <MenuItem label={'Need 2'} />
                    </div>
                )}
            </div>
        </div>
    );
}
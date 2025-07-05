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

    // GSAP animation for menu open/close
    useGSAP(() => {
        if (!menuItemWrapper.current) return;
        // gsap.set(menuItemWrapper.current, { y: "-100%", display: "none" }); // default closed
        if (menuOpen) {
            gsap.to(menuItemWrapper.current, {
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(menuItemWrapper.current, {
                y: "-100%",
                duration: 0.4,
                ease: "power2.in"
            });
        }
    }, [menuOpen]);

    // Toggle menu open/close
    const handleHamburgerClick = () => {
        setMenuOpen(open => !open);
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
                <div className="products-section">
                    <div className="core-tech-section">
                        <p className="menu-item header no-hover">Core Technology</p>
                        <MenuItem label={'Data Manager'} link={'/products/data-manager'} />
                        <MenuItem label={'Monitoring'} link={'/products/monitoring'} />
                        <MenuItem label={'PILA'} link={'/products/PILA'} />
                    </div>
                    <div className="plugins-section">
                        <p className="menu-item header no-hover">Plugins & Additional Products</p>
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
            </div>
        </div>
    );
}
import ROKKAFrame from "../ROKKAFrame/ROKKAFrame";
import MenuItem from "./MenuItem";
import logotype from '../../../static/png/Logotype.png'
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import ProductsMenu from "./ProductsMenu";
import { Link } from 'react-router-dom';
import useIsMobile from '../Utils/UseIsMobile';
import MobileMenu from "./MobileMenu";

export default function Menu () {
    const isMobile = useIsMobile();

    // Always call hooks!
    const [ProductsMenuState, changeProductsMenuState] = useState(false);
    const [menuState, chageMenuState] = useState(true);
    const [isProductsMenuHovered, setIsProductsMenuHovered] = useState(false);

    const menuContainer = useRef();
    const menuContent = useRef();
    const productsMenu = useRef();
    const menuItems = useRef([]);
    const menuAnimation = useRef();
    const productsMenuAnimation = useRef();
    const aboutTL = useRef();

    useLayoutEffect(() => {
        menuItems.current = document.querySelectorAll('.menu-item');
    });

    useGSAP(() => {
        if (isMobile) return;
        // Menu Animation
        menuAnimation.current = gsap.timeline({paused: true});
        menuItems.current.forEach((item, index) => {
            menuAnimation.current.to(item, {
                opacity: 0,
                scale: '0 0',
                width: '0px',
                duration: 0.25,
                ease: 'power1.inOut',
            },  index * 0.1)
        });
        // Start gap animation before the last menu item finishes
         menuAnimation.current.to(menuContent.current, {
            gap: '0px',
            duration: 0.35,
            ease: 'power1.inOut',
        }, '-=0.75'); // adjust this value for more/less overlap
        
        // Products Menu Animation
        productsMenuAnimation.current = gsap.timeline({ paused: true });
        productsMenuAnimation.current.to(productsMenu.current, {
            opacity: 0,
            duration: 0.35,
            ease: 'power1.inOut',
            onStart: () => {
                productsMenu.current.style.display = 'block';
                productsMenu.current.style.pointerEvents = 'none'; // Disable pointer events during animation
            },
            onReverseComplete: () => {
                productsMenu.current.style.display = 'block';
                productsMenu.current.style.pointerEvents = 'auto'; // Enable pointer events after reverse animation
            },
            onComplete: () => {
                productsMenu.current.style.display = 'none';
                productsMenu.current.style.pointerEvents = 'auto'; // Enable pointer events after animation
            }
        });

        aboutTL.current = gsap.timeline({ paused: true });
        aboutTL.current.to('.about-container', { opacity: 1, x: '0%', duration: 0.5, ease: 'power1.inOut' })
    changeProductsMenuState(false); // <-- Ensure menu is closed on load
    });

    if (isMobile) {
        return <MobileMenu />;
    }

    function handleMenuMouseEnter() {
        chageMenuState(true)
        if (!menuState) {
            menuAnimation.current && menuAnimation.current.reverse();
            chageMenuState(true);
        }
    }
    
    function handleMenuMouseLeave() {
        chageMenuState(false)
        setTimeout(() => {
            if (!isProductsMenuHovered) {
                menuAnimation.current && menuAnimation.current.play();
                productsMenuAnimation.current && productsMenuAnimation.current.play();
                chageMenuState(false);
            }
        }, 50);
    }

    function handleProductsMenuMouseEnter() {
        setIsProductsMenuHovered(true);
    }

    function handleProductsMenuMouseLeave() {
        setIsProductsMenuHovered(false);
        productsMenuAnimation.current && productsMenuAnimation.current.play(0);
        changeProductsMenuState(false);
        if (!isProductsMenuHovered) {
            menuAnimation.current && menuAnimation.current.play();
            chageMenuState(false)
        }
        
    }

    return (
        <div
            className="menu-container desktop"
            ref={menuContainer}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
        >
            <ROKKAFrame content={
    [
        <Link key={1} to="/">
            <img className="logotype" src={logotype} alt="Logotype" />
        </Link>,
        <MenuItem
            key={2}
            label={'Home'}
            link="/"
        ></MenuItem>,
        <MenuItem
            key={3}
            label={'Core Technology'}
            onClick={() => {
                if (productsMenu.current) {
                    productsMenu.current.style.display = 'block'; // Ensure visible before animating
                }
                productsMenuAnimation.current && productsMenuAnimation.current.progress(1).reverse();
                changeProductsMenuState(true);
            }}
        ></MenuItem>,
        <Link key={5} to="/plugins">
            <MenuItem key={4} label={'Plugins'}></MenuItem> 
        </Link>,
        <MenuItem key={4} label={'About'} onClick={() => {
            aboutTL.current.play(0)

        }}></MenuItem>,
    ]
}
contentRef={menuContent}
/>
            <ProductsMenu 
                menuRef={productsMenu}
                state={ProductsMenuState}
                changeState={changeProductsMenuState}
                onMouseEnter={handleProductsMenuMouseEnter}
                onMouseLeave={handleProductsMenuMouseLeave}
            />
        </div>
    );
}
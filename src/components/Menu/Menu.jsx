import ROKKAFrame from "../ROKKAFrame/ROKKAFrame";
import MenuItem from "./MenuItem";

import logotype from '../../../static/png/Logotype.png'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import ProductsMenu from "./ProductsMenu";

export default function Menu () {

    const isCollapsed = useState(false);

    const menuContainer = useRef();
    const menuContent = useRef();
    let menuItems

    let showHideAnimation;
    const menuItem1 = useRef()
    const menuItem2 = useRef()
    const menuItem3 = useRef()
    

    useLayoutEffect(() => {
         menuItems = document.querySelectorAll('.menu-item');
    })

    useGSAP(() => {
        console.log(menuItems)
        showHideAnimation = gsap.timeline({paused: true})
        menuItems.forEach((item, index) => {
                showHideAnimation.to(item, {
                opacity: 0,
                scale: '0 0',
                width: '0px',
                duration: 0.35,
                ease: 'power1.inOut',
            },  index * 0.1)
        })
       showHideAnimation.to(menuContent.current, {
            gap: '0px',
            duration: 0.35,
            ease: 'power1.inOut',
       }, '<')
        
    }, {dependencies: isCollapsed, scope: menuContainer})

    return (
        <>
        <div
            id="menu-container"
            ref={menuContainer}
            onMouseLeave={
                () => showHideAnimation.play()
            }
            onMouseEnter={
                () => showHideAnimation.reverse()
            }
        >
            <ROKKAFrame content={
               [
                <img key={1} className="logotype" src={logotype}></img>,
                <MenuItem ref={menuItem1} key={2} label={'Home'}></MenuItem>,
                <MenuItem ref={menuItem2} key={3} label={'Products'}></MenuItem>,
                <MenuItem ref={menuItem3} key={4} label={'By Need'}></MenuItem>,
                // <MenuItem label={'Home'}></MenuItem>
               ]
            }
            contentRef={menuContent}
            >
            </ROKKAFrame>
        </div>
        <ProductsMenu></ProductsMenu>
        </>
    )
}
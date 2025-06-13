import ROKKAFrame from "../ROKKAFrame/ROKKAFrame";
import MenuItem from "./MenuItem";

import logotype from '../../../static/png/Logotype.png'
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'

export default function Menu () {

    const isCollapsed = useState(false);

    const menuContainer = useRef();

    let showHideAnimation;
    const menuItem1 = useRef()
    const menuItem2 = useRef()
    const menuItem3 = useRef()
    const menuItems = [menuItem1, menuItem2, menuItem3]


    useGSAP(() => {

        showHideAnimation = gsap.timeline({paused: true})
        showHideAnimation.to('.menu-item', {
            opacity: 0,
            width: 0
        })
        showHideAnimation.to('.menu-item', {
            display: 'none',
            duration: 0
        })

        
    }, {dependencies: isCollapsed, scope: menuContainer})

    return (
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
            >
            </ROKKAFrame>
        </div>
        
    )
}
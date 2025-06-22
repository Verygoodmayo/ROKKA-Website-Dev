import { useState } from "react";
import ROKKAFrame from "../ROKKAFrame/ROKKAFrame";
import MenuItem from "./MenuItem";

export default function ProductsMenu({ menuRef, state, changeState, onMouseEnter, onMouseLeave }) {

    return (
        <div 
            className="products-menu" 
            ref={menuRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ display: state ? 'block' : 'none' }}
        >
            
            <ROKKAFrame content={
                [
                    <div key={1} className="core-tech-section sub-menu-section">
                        {/* <p className="menu-item menu-header">Core Technology</p> */}
                        <MenuItem label={'Data Manager'} link={'/products/data-manager'} />
                        <MenuItem label={'Monitoring'} link={'/products/monitoring'} />
                        <MenuItem label={'PILA'} link={'/products/PILA'} />
                    </div>,
                    // <div key={2} className="plugins-section sub-menu-section">
                    //     <p className="menu-item menu-header">Plugins</p>
                    //     <div className="plugins-inner-wrapper">
                    //         <MenuItem label={'Call Center'} link={'/plugins'}></MenuItem>
                    //         <MenuItem label={'Election Day'}></MenuItem>
                    //         <MenuItem label={'Ecosystem Analyzer'}></MenuItem>
                    //     </div>
                    //     <div className="plugins-inner-wrapper">
                    //         <MenuItem label={'API'}></MenuItem>
                    //         <MenuItem label={'Parliment Regulation Dashboard'}></MenuItem>
                    //         <MenuItem label={'Hate Speech Detector'}></MenuItem>
                    //     </div>
                    // </div>,
                ]
            }></ROKKAFrame>
        </div>
    )
}
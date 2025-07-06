import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ModalBackgroundScene from "./ModalBackgroundScene";

export default function ModalWindow({ 
    title,
    children,
    isOpen,
    onClose,
    // Three.js scene configuration
    sceneConfig = {
        particleColor: [0.1, 0.1, 0.9], // Default blue particles
        frequency: 0.175,
        amplitude: 3.5,
        maxDistance: 2.85,
        timeSpeed: 0.5,
        meshType: 'icosahedron', // 'icosahedron', 'box', etc.
        geoComplexity: 100
    },
    // Animation configuration
    animationConfig = {
        duration: 0.5,
        ease: 'power1.inOut',
        slideDirection: 'right' // 'right', 'left', 'top', 'bottom'
    }
}) {
    const modalRef = useRef();
    const showHideAnimation = useRef();

    useGSAP(() => {
        const slideTransform = {
            'right': '150%',
            'left': '-150%', 
            'top': '-150%',
            'bottom': '150%'
        };

        const slideAxis = {
            'right': 'x',
            'left': 'x',
            'top': 'y', 
            'bottom': 'y'
        };

        showHideAnimation.current = gsap.timeline({ paused: true });
        
        // Set initial position
        gsap.set(modalRef.current, { 
            opacity: 0,
            [slideAxis[animationConfig.slideDirection]]: slideTransform[animationConfig.slideDirection]
        });

        // Animation timeline
        showHideAnimation.current.to(modalRef.current, { 
            opacity: 1, 
            [slideAxis[animationConfig.slideDirection]]: '0%',
            duration: animationConfig.duration, 
            ease: animationConfig.ease 
        });

        return () => showHideAnimation.current.kill();
    }, [animationConfig]);

    useEffect(() => {
        if (isOpen) {
            showHideAnimation.current.play(0);
        } else {
            showHideAnimation.current.reverse();
        }
    }, [isOpen]);

    const handleClose = () => {
        showHideAnimation.current.reverse();
        // Call onClose after animation completes
        setTimeout(() => {
            if (onClose) onClose();
        }, animationConfig.duration * 1000);
    };

    return (
        <div 
            ref={modalRef}
            className="modal-window-container"
        >
            <div className="modal-close" onClick={handleClose}>
                <div className="close-line"></div>
                <div className="close-line"></div>
            </div>
            
            <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
            </div>
            
            <div className="modal-content">
                {children}
            </div>
            
            <ModalBackgroundScene 
                id={`modal-sketch-${title?.toLowerCase().replace(/\s+/g, '-')}`}
                config={sceneConfig}
            />
        </div>
    );
}

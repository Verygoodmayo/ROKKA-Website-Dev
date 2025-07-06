import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import arrowRight from '../../../static/svg/UI/Arrow_Right.svg';
import arrowLeft from '../../../static/svg/UI/Arrow_Left.svg';

// Data
import { values } from '../../data/valuesData';

// Utils
import { useIsMobile } from '../Utils';

export default function ValuesSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // Track navigation direction
    const isMobile = useIsMobile();

    // Refs for animation
    const indexRef = useRef();
    const cardRef = useRef();
    const imageRef = useRef();

    // Animate transitions
    useGSAP(() => {
        // Animate index slide in - different for mobile vs desktop
        if (isMobile) {
            // Mobile: animate on Y axis (top/bottom)
            gsap.fromTo(indexRef.current, 
                { y: direction === 1 ? '-200%' : '200%' }, 
                { y: 0, duration: 0.8, ease: "power2.out" }
            );
        } else {
            // Desktop: animate on X axis (left/right)
            gsap.fromTo(indexRef.current, 
                { x: direction === 1 ? '-200%' : '200%' }, 
                { x: 0, duration: 0.8, ease: "power2.out" }
            );
        }

        // Animate card content
        gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" });

        // Animate image fade in
        gsap.fromTo(imageRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.9, ease: "power2.out" }
        );
    }, [current, isMobile]);

    // Navigation handler
    const handleNav = (dir) => {
        // Store direction for animation
        setDirection(dir);
        
        // Animate index out - different for mobile vs desktop
        if (isMobile) {
            // Mobile: animate on Y axis (top/bottom)
            gsap.to(indexRef.current, {
                y: dir === 1 ? '200%' : '-200%',
                duration: 0.5
            });
        } else {
            // Desktop: animate on X axis (left/right)
            gsap.to(indexRef.current, {
                x: dir === 1 ? '200%' : '-200%',
                duration: 0.5
            });
        }

        // Animate image fade out
        gsap.to(imageRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                setCurrent((prev) => (prev + dir + values.length) % values.length);
            }
        });
    };

    // Download SVG handler
    const handleDownload = () => {
        const svg = imageRef.current.querySelector('svg');
        if (!svg) return;
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);
        const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = values[current].imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div id="values-container" className="section">
            <div id="wrapper">
                <div id="header">
                    <h1 className="header adjust-single-line">Our Core Technology</h1>
                </div>
                <div id="content">
                    <div id="info">
                        <p>
                            Our main focus is to create technological tools to empower individuals and teams and give access to code only platforms to non technical folks.
                        </p>
                        <span id="index" ref={indexRef}>
                            {current + 1}
                        </span>
                    </div>
                    <div id="main">
                        <div className="value-nav" id="value-nav-left" onClick={() => handleNav(-1)}>
                            <img className="nav-image" src={arrowLeft} alt="Previous" />
                        </div>
                        <div id="main-wrapper" ref={cardRef}>
                            <h3>{values[current].title}</h3>
                            {values[current].description.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="value-nav" id="value-nav-right" onClick={() => handleNav(1)}>
                            <img className="nav-image" src={arrowRight} alt="Next" />
                        </div>
                    </div>
                    <div id="image">
                        <div className="value-image-container" ref={imageRef}>
                            <img src={values[current].image} alt={values[current].imageName} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
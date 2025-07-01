import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import arrowRight from '../../../static/svg/UI/Arrow_Right.svg';
import arrowLeft from '../../../static/svg/UI/Arrow_Left.svg';

import no_code_svg from '../../../static/svg/values/no_code.svg'
import manage_data_svg from '../../../static/svg/values/manage_data_simply.svg';
import reasoning_service_svg from '../../../static/svg/values/reasoning_as_a_service.svg';

// SASS
import '../../styles/pages/home_page/values_section.scss';

// Value data
const values = [
    {
        title: "Monitoring",
        description: "ROKKA's monitoring system revolutionizes how organizations track and understand their digital landscape. Unlike traditional monitoring tools that simply track keywords and count mentions, our system is objective-driven, understanding what success means for your specific goals and filtering the endless stream of online content accordingly. It transforms the overwhelming flood of digital information into strategic intelligence that matters to your mission, providing not just data, but insight that drives decision-making.",
        image: reasoning_service_svg,
        imageName: "monitoring-isometric.svg"
    },
    {
        title: "Data Manager",
        description: "The Data Manager serves as your intelligent data operation center, designed to eliminate the technical barriers that typically separate strategic thinkers from their data. It seamlessly integrates information from multiple sources - whether legacy databases, real-time feeds, or external APIs - and transforms complex analytical operations into simple, visual workflows. This isn't just about storing data; it's about creating a living, breathing analytical environment where your information becomes the foundation for predictive modeling, audience segmentation, and strategic planning.",
        image: manage_data_svg,
        imageName: "data-manager-isometric.svg"
    },
    {
        title: "PILA AI",
        description: "PILA AI represents a fundamental shift in how we interact with data and analysis. Rather than requiring users to learn complex query languages or analytical frameworks, PILA understands natural language questions and translates them into sophisticated analytical operations. It's built on advanced RAG technology that ensures every answer is grounded in your actual data, not generic responses. PILA doesn't just provide information - it serves as your analytical partner, understanding context, providing strategic recommendations, and transforming insights into actionable next steps.",
        image: no_code_svg,
        imageName: "pila-ai-isometric.svg"
    }
];

export default function ValuesSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // Track navigation direction

    // Refs for animation
    const indexRef = useRef();
    const cardRef = useRef();
    const imageRef = useRef();

    // Animate transitions
    useGSAP(() => {
        // Animate index slide in (corrected directions)
        // Right arrow (direction = 1): index slides in from left (was sliding out right)
        // Left arrow (direction = -1): index slides in from right (was sliding out left)
        gsap.fromTo(indexRef.current, 
            { x: direction === 1 ? '-200%' : '200%' }, 
            { x: 0, duration: 0.8, ease: "power2.out" }
        );

        // Animate card content
        gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" });

        // Animate image fade in
        gsap.fromTo(imageRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.9, ease: "power2.out" }
        );
    }, [current]);

    // Navigation handler
    const handleNav = (dir) => {
        // Store direction for animation
        setDirection(dir);
        
        // Animate index out (corrected directions)
        // Right arrow (dir = 1): index slides out right, then slides in from left
        // Left arrow (dir = -1): index slides out left, then slides in from right
        gsap.to(indexRef.current, {
            x: dir === 1 ? '200%' : '-200%',
            duration: 0.5
        });

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
                            <p>{values[current].description}</p>
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
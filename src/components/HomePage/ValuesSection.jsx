import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import arrowRight from '../../../static/svg/Arrow_Right.svg';
import arrowLeft from '../../../static/svg/Arrow_Left.svg';

// Value data
const values = [
    {
        title: "No Code",
        description: "Empower everyone to build and automate without writing a single line of code. Our platform democratizes technology, enabling users of all backgrounds to create powerful solutions with intuitive visual tools.",
        image: (
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                <rect x="30" y="30" width="120" height="120" rx="24" fill="#141cff"/>
                <rect x="50" y="50" width="80" height="80" rx="16" fill="#fff"/>
                <path d="M70 90h40M90 70v40" stroke="#141cff" strokeWidth="6" strokeLinecap="round"/>
                <rect x="60" y="60" width="20" height="20" rx="4" fill="#f7f5f5" stroke="#141cff" strokeWidth="2"/>
                <rect x="100" y="100" width="20" height="20" rx="4" fill="#f7f5f5" stroke="#141cff" strokeWidth="2"/>
            </svg>
        ),
        imageName: "no-code-isometric.svg"
    },
    {
        title: "Manage Data Simply",
        description: "Seamlessly organize, visualize, and control your data. We simplify complex data management, providing clear dashboards and smart automation so you can focus on insights, not infrastructure.",
        image: (
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                <rect x="30" y="60" width="120" height="60" rx="16" fill="#141cff"/>
                <rect x="50" y="80" width="80" height="20" rx="6" fill="#fff"/>
                <rect x="60" y="90" width="20" height="8" rx="2" fill="#f7f5f5" stroke="#141cff" strokeWidth="2"/>
                <rect x="100" y="90" width="20" height="8" rx="2" fill="#f7f5f5" stroke="#141cff" strokeWidth="2"/>
                <circle cx="90" cy="70" r="8" fill="#fff" stroke="#141cff" strokeWidth="2"/>
            </svg>
        ),
        imageName: "manage-data-isometric.svg"
    },
    {
        title: "Reasoning as a Service",
        description: "Leverage advanced AI to turn raw data into actionable intelligence. Our platform delivers automated reasoning, providing recommendations and insights that drive smarter decisions at every level.",
        image: (
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                <rect x="40" y="40" width="100" height="100" rx="20" fill="#141cff"/>
                <ellipse cx="90" cy="90" rx="36" ry="24" fill="#fff"/>
                <path d="M90 66v48M66 90h48" stroke="#141cff" strokeWidth="6" strokeLinecap="round"/>
                <circle cx="90" cy="90" r="10" fill="#f7f5f5" stroke="#141cff" strokeWidth="2"/>
                <rect x="80" y="120" width="20" height="10" rx="3" fill="#f7f5f5" stroke="#141cff" strokeWidth="2"/>
            </svg>
        ),
        imageName: "reasoning-service-isometric.svg"
    }
];

export default function ValuesSection() {
    const [current, setCurrent] = useState(0);

    // Refs for animation
    const indexRef = useRef();
    const cardRef = useRef();
    const imageRef = useRef();

    // Animate transitions
    useGSAP(() => {
        // Animate index
        gsap.fromTo(indexRef.current, { x: '150%' }, { x: 0, duration: 0.5, ease: "power2.out" });

        // Animate card content
        gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });

        // Animate image slide in
        gsap.fromTo(imageRef.current, { x:'200%' }, { x: 0, duration: 0.6, ease: "power2.out" });
    }, [current]);

    // Navigation handler
    const handleNav = (dir) => {
        // Animate out
        gsap.to([indexRef.current, imageRef.current], 
        {
            x: dir === 1 ? '200%' : '-200%',
            duration: 0.3,
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
                    <p>We Believe In</p>
                </div>
                <div id="content">
                    <div id="info">
                        <p>
                            We want to communicate three pillars for our company. These three values reflect onto our product and every project we participate in.
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
                            {values[current].image}
                            {/* <button
                                style={{
                                    marginTop: 12,
                                    background: "#141cff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    padding: "6px 16px",
                                    cursor: "pointer",
                                    fontFamily: "inherit"
                                }}
                                onClick={handleDownload}
                            >
                                Download SVG
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
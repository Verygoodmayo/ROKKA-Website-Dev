import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import arrowRight from '../../../static/svg/Arrow_Right.svg';
import arrowLeft from '../../../static/svg/Arrow_Left.svg';

import no_code_svg from '../../../static/svg/values/no_code.svg'
import manage_data_svg from '../../../static/svg/values/manage_data_simply.svg';
import reasoning_service_svg from '../../../static/svg/values/reasoning_as_a_service.svg';

// SASS
import '../../styles/pages/home_page/values_section.scss';

// Value data
const values = [
    {
        title: "No Code",
        description: "Empower everyone to build and automate without writing a single line of code. Our platform democratizes technology, enabling users of all backgrounds to create powerful solutions with intuitive visual tools.",
        image: no_code_svg,
        imageName: "no-code-isometric.svg"
    },
    {
        title: "Manage Data Simply",
        description: "Seamlessly organize, visualize, and control your data. We simplify complex data management, providing clear dashboards and smart automation so you can focus on insights, not infrastructure.",
        image: manage_data_svg,
        imageName: "manage-data-isometric.svg"
    },
    {
        title: "Reasoning as a Service",
        description: "Leverage advanced AI to turn raw data into actionable intelligence. Our platform delivers automated reasoning, providing recommendations and insights that drive smarter decisions at every level.",
        image: reasoning_service_svg,
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
                            <img src={values[current].image} alt={values[current].imageName} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
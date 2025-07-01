import DiagramCard from "./DiagramCard";
import DiagramNavigation from "./DiagramNavigation";
import * as THREE from "three";
import { useState, useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Data imports
import { fieldsData } from "./data/fieldsData";
import { rolesData } from "./data/rolesData";
import { technologiesData } from "./data/technologiesData";
import { opportunitiesData } from "./data/opportunitiesData";

// SASS
import '../../../styles/pages/home_page/diagram_section.scss';

export default function Diagram() {
    // State management
    const [selectedField, setSelectedField] = useState("Political"); // Default to Political
    const [selectedFieldIndex, setSelectedFieldIndex] = useState(2);
    const [selectedRole, setSelectedRole] = useState(rolesData["Political"].categories[0]);
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
    const [selectedTechnology, setSelectedTechnology] = useState(technologiesData.categories[0]);
    const [selectedTechnologyIndex, setSelectedTechnologyIndex] = useState(0);
    const [selectedOpportunity, setSelectedOpportunity] = useState(opportunitiesData["Political"][rolesData["Political"].categories[0]].categories[0]);
    const [selectedOpportunityIndex, setSelectedOpportunityIndex] = useState(0);

    // Shader configurations for each card type
    const shaderConfigs = {
        field: {
            // Core animation controls
            frequency: 0.175,
            amplitude: 3.5,
            maxDistance: 2.85,
            timeSpeed: 0.5,
            
            // Visual controls
            particleColor: [1.0, 1.0, 1.0], // White
            particleSize: 1.0,
            colorIntensity: 1.0,
            mouseInfluenceStrength: 0.0,
            
            // Mouse click controls
            clickInfluenceStrength: 2.0,
            clickWaveSpeed: 3.0,
            clickDecayRate: 0.8,
            
            // Camera configuration
            cameraPosition: [0, 0, 0.5],
            cameraLookAt: [0, 0, 0],
            cameraFov: 75,
            cameraNear: 0.1,
            cameraFar: 1000,
            
            // Noise controls
            noiseScale: 1.0,
            noiseDensity: 1.2,
            noiseOctaves: 3.0,
            noiseLacunarity: 2.0,
            noiseGain: 0.5,
            turbulenceStrength: 0.8,
            flowDirection: 0.0,
            waveSpeed: 1.0,
            distortionStrength: 1.0
        },
        role: {
            // Core animation controls
            frequency: 0.2,
            amplitude: 4.0,
            maxDistance: 3.0,
            timeSpeed: 0.3,
            
            // Visual controls
            particleColor: [1.0, 1.0, 1.0], // White
            particleSize: 1.1,
            colorIntensity: 1.0,
            mouseInfluenceStrength: 0.0,
            
            // Mouse click controls
            clickInfluenceStrength: 2.5,
            clickWaveSpeed: 3.5,
            clickDecayRate: 0.9,
            
            // Camera configuration
            cameraPosition: [0, 0, 0.5],
            cameraLookAt: [0, 0, 0],
            cameraFov: 75,
            cameraNear: 0.1,
            cameraFar: 1000,
            
            // Noise controls - more dynamic
            noiseScale: 1.2,
            noiseDensity: 0.8,
            noiseOctaves: 4.0,
            noiseLacunarity: 2.2,
            noiseGain: 0.6,
            turbulenceStrength: 1.2,
            flowDirection: 45.0,
            waveSpeed: 0.8,
            distortionStrength: 1.1
        },
        technology: {
            // Core animation controls
            frequency: 0.15,
            amplitude: 2.8,
            maxDistance: 2.5,
            timeSpeed: 0.7,
            
            // Visual controls
            particleColor: [1.0, 1.0, 1.0], // White
            particleSize: 0.9,
            colorIntensity: 1.0,
            mouseInfluenceStrength: 0.0,
            
            // Mouse click controls
            clickInfluenceStrength: 1.8,
            clickWaveSpeed: 4.0,
            clickDecayRate: 0.7,
            
            // Camera configuration
            cameraPosition: [0, 0, 0.5],
            cameraLookAt: [0, 0, 0],
            cameraFov: 75,
            cameraNear: 0.1,
            cameraFar: 1000,
            
            // Noise controls - precise/technical
            noiseScale: 0.8,
            noiseDensity: 1.5,
            noiseOctaves: 2.0,
            noiseLacunarity: 1.8,
            noiseGain: 0.4,
            turbulenceStrength: 0.6,
            flowDirection: 90.0,
            waveSpeed: 1.5,
            distortionStrength: 0.9
        },
        opportunities: {
            // Core animation controls
            frequency: 0.22,
            amplitude: 3.2,
            maxDistance: 2.7,
            timeSpeed: 0.4,
            
            // Visual controls
            particleColor: [0.1, 0.1, 1.0], // Blue
            particleSize: 1.05,
            colorIntensity: 1.0,
            mouseInfluenceStrength: 0.0,
            
            // Mouse click controls
            clickInfluenceStrength: 3.0,
            clickWaveSpeed: 2.5,
            clickDecayRate: 1.0,
            
            // Camera configuration
            cameraPosition: [0, 0, 0.5],
            cameraLookAt: [0, 0, 0],
            cameraFov: 75,
            cameraNear: 0.1,
            cameraFar: 1000,
            
            // Noise controls - complex/detailed
            noiseScale: 1.1,
            noiseDensity: 1.0,
            noiseOctaves: 5.0,
            noiseLacunarity: 2.5,
            noiseGain: 0.7,
            turbulenceStrength: 1.4,
            flowDirection: 270.0,
            waveSpeed: 0.6,
            distortionStrength: 1.3
        }
    };

    // Refs for GSAP animations
    const roleCardRef = useRef(null);
    const opportunityCardRef = useRef(null);

    // Handler for field selection changes
    const handleFieldChange = useCallback((fieldName, fieldIndex) => {
        if (fieldName === selectedField) return;

        // Animate out current content
        const timeline = gsap.timeline();
        
        timeline.to([roleCardRef.current?.querySelector('.description'), opportunityCardRef.current?.querySelector('.description')], {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });

        timeline.call(() => {
            // Update state after fade out
            setSelectedField(fieldName);
            setSelectedFieldIndex(fieldIndex);
            setSelectedRole(rolesData[fieldName].categories[0]);
            setSelectedRoleIndex(0);
            setSelectedOpportunity(getCurrentOpportunityData(fieldName, rolesData[fieldName].categories[0]).categories[0]);
            setSelectedOpportunityIndex(0);
        });

        // Animate in new content
        timeline.to([roleCardRef.current?.querySelector('.description'), opportunityCardRef.current?.querySelector('.description')], {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut"
        });
    }, [selectedField]);

    // Handler for role selection changes
    const handleRoleChange = useCallback((roleName, roleIndex) => {
        if (roleName === selectedRole) return;

        // Animate out current opportunity content
        const timeline = gsap.timeline();
        
        timeline.to(opportunityCardRef.current?.querySelector('.description'), {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });

        timeline.call(() => {
            setSelectedRole(roleName);
            setSelectedRoleIndex(roleIndex);
            setSelectedOpportunity(getCurrentOpportunityData(selectedField, roleName).categories[0]);
            setSelectedOpportunityIndex(0);
        });

        // Animate in new opportunity content
        timeline.to(opportunityCardRef.current?.querySelector('.description'), {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut"
        });
    }, [selectedRole, selectedField]);

    // Handler for technology selection changes
    const handleTechnologyChange = useCallback((technologyName, technologyIndex) => {
        setSelectedTechnology(technologyName);
        setSelectedTechnologyIndex(technologyIndex);
    }, []);

    // Handler for opportunity selection changes
    const handleOpportunityChange = useCallback((opportunityName, opportunityIndex) => {
        setSelectedOpportunity(opportunityName);
        setSelectedOpportunityIndex(opportunityIndex);
    }, []);

    // Get current data based on selections
    const getCurrentRoleData = () => ({
        categories: rolesData[selectedField].categories,
        descriptions: rolesData[selectedField].descriptions
    });

    const getCurrentOpportunityData = (field = selectedField, role = selectedRole) => {
        // Get opportunities for the specific field and role combination
        if (opportunitiesData[field] && opportunitiesData[field][role]) {
            return {
                categories: opportunitiesData[field][role].categories,
                descriptions: opportunitiesData[field][role].descriptions
            };
        }
        
        // Fallback: if role doesn't exist, use first available role for the field
        const availableRoles = Object.keys(opportunitiesData[field] || {});
        if (availableRoles.length > 0) {
            const firstRole = availableRoles[0];
            return {
                categories: opportunitiesData[field][firstRole].categories,
                descriptions: opportunitiesData[field][firstRole].descriptions
            };
        }
        
        // Final fallback
        return {
            categories: ["Default Opportunity"],
            descriptions: ["Opportunity data not available for this combination."]
        };
    };

    return (
        <section id='diagram-container' className="section">
            <div className="diagram-header-wrapper">
                <h1 className="header">Our Technology by Need</h1>
                <p className="diagram-intro">
                    Explore the different opportunities ROKKA's technology offers across Intelligence/OSInt, Commercial, Political, and Research fields. 
                    Use the diagram below to select a field, role, and technology to see how our solutions can empower your organization. 
                    Click on each category to view tailored descriptions and discover how ROKKA can help you achieve your goals.
                </p>
            </div>
            {/* <DiagramNavigation /> */}
            <div className="diagram-cards-wrapper">
                {/* Field Selection Card */}
                <DiagramCard
                    key="field-card"
                    keyName={0}
                    title="Select Field"
                    categories={fieldsData.categories}
                    description={fieldsData.descriptions}
                    isOpportunities={false}
                    defaultIndex={selectedFieldIndex}
                    selectedIndex={selectedFieldIndex}
                    onSelectionChange={handleFieldChange}
                    meshType={new THREE.IcosahedronGeometry(100, 80)}
                    shaderProps={shaderConfigs.field}
                />

                {/* Role Selection Card */}
                <div ref={roleCardRef}>
                    <DiagramCard
                        key={`role-card-${selectedField}`}
                        keyName={1}
                        title="Select Role"
                        categories={getCurrentRoleData().categories}
                        description={getCurrentRoleData().descriptions}
                        isOpportunities={false}
                        defaultIndex={selectedRoleIndex}
                        selectedIndex={selectedRoleIndex}
                        onSelectionChange={handleRoleChange}
                        meshType={new THREE.IcosahedronGeometry(100, 80)}
                        shaderProps={shaderConfigs.role}
                    />
                </div>

                {/* Technology Selection Card */}
                <DiagramCard
                    key="technology-card"
                    keyName={2}
                    title="Select Technology"
                    categories={technologiesData.categories}
                    description={technologiesData.descriptions}
                    isOpportunities={false}
                    defaultIndex={selectedTechnologyIndex}
                    selectedIndex={selectedTechnologyIndex}
                    onSelectionChange={handleTechnologyChange}
                    meshType={new THREE.IcosahedronGeometry(100, 80)}
                    shaderProps={shaderConfigs.technology}
                />

                {/* Opportunities Card */}
                <div ref={opportunityCardRef}>
                    <DiagramCard
                        key={`opportunity-card-${selectedField}-${selectedRole}`}
                        keyName={3}
                        title="Opportunities"
                        categories={getCurrentOpportunityData().categories}
                        description={getCurrentOpportunityData().descriptions}
                        isOpportunities={true}
                        defaultIndex={selectedOpportunityIndex}
                        selectedIndex={selectedOpportunityIndex}
                        onSelectionChange={handleOpportunityChange}
                        shaderProps={shaderConfigs.opportunities}
                        meshType={new THREE.IcosahedronGeometry(100, 80)}
                    />
                </div>
            </div>
        </section>
    );
}
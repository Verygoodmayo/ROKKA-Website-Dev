import * as THREE from 'three';
import vertex from '../../../static/glsl/sketchs/vertex.glsl';
import fragment from '../../../static/glsl/sketchs/fragment.glsl';
import IcoBufferGeometry from "./IcoBufferGeometry";
import { useEffect, useRef, useState, forwardRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const IcoBufferMesh = forwardRef(function IcoBufferMesh({
    geoComplexity = 100, 
    meshType = new THREE.IcosahedronGeometry(100, geoComplexity), 
    particleColor = [1.0, 1.0, 1.0], // RGB color array [r, g, b]
    
    // Mesh positioning props
    meshPosition = [0, 0, 0], // [x, y, z] position
    meshRotation = [0, 0, 0], // [x, y, z] rotation
    
    // Shader control props
    frequency = 0.175,
    amplitude = 3.5,
    maxDistance = 2.85,
    timeSpeed = 0.5,
    noiseScale = 1.0,
    noiseDensity = 1.0,
    particleSize = 1.0,
    colorIntensity = 1.0,
    mouseInfluenceStrength = 1.0,
    // Mouse click control parameters
    clickInfluenceStrength = 2.0,  // Strength of click wave effect
    clickWaveSpeed = 3.0,          // Speed of click wave propagation
    clickDecayRate = 0.8,          // How fast click effect fades
    // Additional noise control parameters
    noiseOctaves = 3.0,           // Number of noise layers for complexity
    noiseLacunarity = 2.0,        // How much detail is added with each octave
    noiseGain = 0.5,              // How much each octave contributes
    turbulenceStrength = 1.0,     // Strength of turbulence effect
    flowDirection = 0.0,          // Direction bias for flow (0-360 degrees)
    waveSpeed = 1.0,              // Speed of wave-like motion
    distortionStrength = 1.0      // Overall distortion intensity
}, ref) {
    const shaderMaterial = useRef();

     // Mouse state
    const mouse = useRef({ x: 0.5, y: 0.5 }); // normalized [0,1]
    const [mouseInfluence, setMouseInfluence] = useState(mouseInfluenceStrength);
    
    // Mouse click state
    const mouseClick = useRef({ x: 0.5, y: 0.5, time: 0.0, active: false });
    const [clickInfluence, setClickInfluence] = useState(clickInfluenceStrength);
    const [clickWave, setClickWave] = useState(clickWaveSpeed);
    const [clickDecay, setClickDecay] = useState(clickDecayRate);
    const currentTime = useRef(0); // Track current time for click events

    useFrame(({ clock }) => {
        // Add error handling for clock and shader material
        if (!clock || !shaderMaterial.current) {
            return;
        }
        
        currentTime.current = clock.elapsedTime; // Always track current time
        
        // Shader updates (always run to keep animation flowing)
        if (shaderMaterial.current && shaderMaterial.current.uniforms) {
            // Always update time - this should NEVER stop
            const newTime = clock.elapsedTime * timeSpeed;
            shaderMaterial.current.uniforms.u_time.value = newTime;
            shaderMaterial.current.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
            
            // Update mouse influence in real-time
            shaderMaterial.current.uniforms.u_mouseInfluence.value = mouseInfluence;
            
            // Update mouse click uniforms
            shaderMaterial.current.uniforms.u_mouseClick.value.set(
                mouseClick.current.x, 
                mouseClick.current.y, 
                mouseClick.current.time,
                mouseClick.current.active ? 1.0 : 0.0
            );
            
            // Update click parameters
            shaderMaterial.current.uniforms.u_clickInfluence.value = clickInfluence;
            shaderMaterial.current.uniforms.u_clickWaveSpeed.value = clickWave;
            shaderMaterial.current.uniforms.u_clickDecayRate.value = clickDecay;
            
            // Animate click effect over time
            if (mouseClick.current.active) {
                const elapsedSinceClick = clock.elapsedTime - mouseClick.current.time;
                if (elapsedSinceClick > 3.0) { // Reset after 3 seconds
                    mouseClick.current.active = false;
                }
            }
            
            // Update particle color in real-time
            shaderMaterial.current.uniforms.particleColor.value.set(
                particleColor[0], 
                particleColor[1], 
                particleColor[2]
            );
        }
    });

    useEffect(() => {
        function handleMouseMove(e) {
            // Ensure event and target exist
            if (!e || !e.target) return;
            
            try {
                // Normalize mouse position to [0,1]
                const rect = e.target.getBoundingClientRect();
                if (!rect) return;
                
                mouse.current.x = (e.clientX - rect.left) / rect.width;
                mouse.current.y = 1 - (e.clientY - rect.top) / rect.height; // invert y for GL coords
            } catch (error) {
                console.warn('Mouse move handler error:', error);
            }
        }
        
        function handleMouseClick(e) {
            // Ensure event and target exist
            if (!e || !e.target) return;
            
            try {
                // Only handle clicks on canvas elements (to avoid interference with other page interactions)
                if (!e.target.tagName || (e.target.tagName !== 'CANVAS' && !e.target.closest('canvas'))) {
                    return;
                }
                
                // Normalize click position to [0,1]
                const rect = e.target.getBoundingClientRect();
                if (!rect) return;
                
                mouseClick.current.x = (e.clientX - rect.left) / rect.width;
                mouseClick.current.y = 1 - (e.clientY - rect.top) / rect.height; // invert y for GL coords
                mouseClick.current.time = currentTime.current; // Use consistent timing
                mouseClick.current.active = true;
            } catch (error) {
                console.warn('Mouse click handler error:', error);
            }
        }
        
        // Only add event listeners if window is available
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('click', handleMouseClick);
        }
        
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('click', handleMouseClick);
            }
        };
    }, []); // No dependencies needed for mouse events

    // Update particle color when prop changes
    useEffect(() => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.particleColor) {
            shaderMaterial.current.uniforms.particleColor.value.set(
                particleColor[0], 
                particleColor[1], 
                particleColor[2]
            );
        }
    }, [particleColor]);

    // Update dat.gui controlled parameters when they change
    useEffect(() => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.frequency) {
            shaderMaterial.current.uniforms.frequency.value = frequency;
        }
    }, [frequency]);

    useEffect(() => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.amplitude) {
            shaderMaterial.current.uniforms.amplitude.value = amplitude;
        }
    }, [amplitude]);

    useEffect(() => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.maxDistance) {
            shaderMaterial.current.uniforms.maxDistance.value = maxDistance;
        }
    }, [maxDistance]);

    useEffect(() => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.u_time) {
            // Update the time speed multiplier - this affects how u_time progresses
            // Note: timeSpeed is typically applied in the useFrame loop
        }
    }, [timeSpeed]);

    return (
        <points
            ref={ref}
            position={meshPosition}
            rotation={meshRotation}
        >
            {/* Use standard geometry */}
            <IcoBufferGeometry meshType={meshType} />
            
            {/* Shader Material */}
            <shaderMaterial
                ref={shaderMaterial}
                uniforms={{
                    u_time: { value: 0. },
                    u_resolution: { value: new THREE.Vector2() },
                    frequency: { type: 'f', value: frequency },
                    amplitude: { type: 'f', value: amplitude },
                    maxDistance: { type: 'f', value: maxDistance },
                    noiseScale: { type: 'f', value: noiseScale },
                    noiseDensity: { type: 'f', value: noiseDensity },
                    particleSize: { type: 'f', value: particleSize },
                    colorIntensity: { type: 'f', value: colorIntensity },
                    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
                    u_mouseInfluence: { value: mouseInfluence },
                    // Mouse click uniforms
                    u_mouseClick: { value: new THREE.Vector4(0.5, 0.5, 0.0, 0.0) }, // x, y, time, active
                    u_clickInfluence: { value: clickInfluence },
                    u_clickWaveSpeed: { value: clickWave },
                    u_clickDecayRate: { value: clickDecay },
                    particleColor: { value: new THREE.Vector3(particleColor[0], particleColor[1], particleColor[2]) },
                    // Additional noise control parameters
                    noiseOctaves: { type: 'f', value: noiseOctaves },
                    noiseLacunarity: { type: 'f', value: noiseLacunarity },
                    noiseGain: { type: 'f', value: noiseGain },
                    turbulenceStrength: { type: 'f', value: turbulenceStrength },
                    flowDirection: { type: 'f', value: flowDirection },
                    waveSpeed: { type: 'f', value: waveSpeed },
                    distortionStrength: { type: 'f', value: distortionStrength }
                }}
                side={THREE.DoubleSide}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </points>
    );
});

export default IcoBufferMesh;

/*
PARTICLE COLOR CONNECTION FLOW - VERIFIED ✅

1. DIAGRAM.JSX (Source)
   └── shaderConfigs.{cardType}.particleColor: [r, g, b]
   
2. DIAGRAM.JSX (Distribution)
   └── <DiagramCard shaderProps={shaderConfigs.{cardType}} />
   
3. DIAGRAMCARD.JSX (Forwarding)
   └── <IcoBufferMesh {...shaderProps} />
   
4. ICOBUFFERMESH.JSX (Prop Handling)
   └── particleColor prop → THREE.Vector3 uniform
   └── Real-time updates via useFrame & useEffect
   
5. FRAGMENT.GLSL (Shader Usage)
   └── uniform vec3 particleColor → finalColor calculation
   
STATUS: All connections verified and working ✅

MOUSE CLICK INTERACTION FLOW - VERIFIED ✅

1. USER INTERACTION
   └── Mouse click event on canvas
   
2. ICOBUFFERMESH.JSX (Event Handling)
   └── handleMouseClick() captures click position & time
   └── mouseClick.current updates with normalized coordinates
   
3. SHADER UNIFORMS (Real-time Updates)
   └── u_mouseClick: vec4(x, y, time, active)
   └── u_clickInfluence, u_clickWaveSpeed, u_clickDecayRate
   
4. VERTEX.GLSL (Wave Effect Calculation)
   └── calculateClickEffect() creates expanding wave
   └── Distance-based intensity with time decay
   └── Applied to vertex positions for visual feedback
   
5. VISUAL RESULT
   └── Expanding wave effect from click point
   └── Particles pushed outward in ripple pattern
   └── Effect fades over time with configurable decay
   
STATUS: Click interaction fully implemented ✅
*/
import * as THREE from 'three';
import vertex from '../../../static/glsl/sketchs/vertex.glsl';
import fragment from '../../../static/glsl/sketchs/fragment.glsl';
import IcoBufferGeometry from "./IcoBufferGeometry";
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export default function IcoBufferMesh({
    geoComplexity = 100, 
    meshType = new THREE.IcosahedronGeometry(100, geoComplexity), 
    particleColor = [1.0, 1.0, 1.0], // RGB color array [r, g, b]
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
    // Additional noise control parameters
    noiseOctaves = 3.0,           // Number of noise layers for complexity
    noiseLacunarity = 2.0,        // How much detail is added with each octave
    noiseGain = 0.5,              // How much each octave contributes
    turbulenceStrength = 1.0,     // Strength of turbulence effect
    flowDirection = 0.0,          // Direction bias for flow (0-360 degrees)
    waveSpeed = 1.0,              // Speed of wave-like motion
    distortionStrength = 1.0      // Overall distortion intensity
}) {
    const shaderMaterial = useRef();

     // Mouse state
    const mouse = useRef({ x: 0.5, y: 0.5 }); // normalized [0,1]
    const [mouseInfluence, setMouseInfluence] = useState(mouseInfluenceStrength);

    useThree(({camera}) => {
       camera.position.z = 0.25
    })

    useFrame(({ clock }) => {
        if (shaderMaterial.current) {
            shaderMaterial.current.uniforms.u_time.value = clock.elapsedTime * timeSpeed;
            shaderMaterial.current.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
            
            // Update mouse influence in real-time
            shaderMaterial.current.uniforms.u_mouseInfluence.value = mouseInfluence;
            
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
            // Normalize mouse position to [0,1]
            const rect = e.target.getBoundingClientRect();
            mouse.current.x = (e.clientX - rect.left) / rect.width;
            mouse.current.y = 1 - (e.clientY - rect.top) / rect.height; // invert y for GL coords
            // shaderMaterial.current.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Update particle color when prop changes
    useEffect(() => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.particleColor) {
            shaderMaterial.current.uniforms.particleColor.value.set(
                particleColor[0], 
                particleColor[1], 
                particleColor[2]
            );
            
            // Debug: Log color updates (remove in production)
            console.log('🎨 Particle color updated:', particleColor);
        }
    }, [particleColor]);

    return (
        <points>
            {/* Replace with your geometry component or bufferGeometry */}
            <IcoBufferGeometry meshType={meshType}></IcoBufferGeometry>
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
}

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
*/
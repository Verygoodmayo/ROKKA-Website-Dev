import * as THREE from 'three';
import vertex from '../../../static/glsl/monitoring/vertex.glsl';
import fragment from '../../../static/glsl/monitoring/fragment.glsl';
import ParkGeometry from "../../components/HomePage/Sketch/ParkGeometry";
import { useEffect, useRef, useState, forwardRef, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const defaultProps = {
    frequency: 0.025,
    amplitude: 8.5,
    maxDistance: 10.5,
    isMobile: false,
    cameraZ: 150,
};

const MonitoringMesh = forwardRef(function MonitoringMesh({ 
    geoComplexity = 136,
    meshType = new THREE.IcosahedronGeometry(100, geoComplexity),
    
    // Mesh positioning
    meshPositionX = 0,
    meshPositionY = 0,
    meshPositionZ = 0,
    
    // Mesh rotation
    meshRotationX = 0,  // Rotation around X-axis (pitch)
    meshRotationY = 0,  // Rotation around Y-axis (yaw)
    meshRotationZ = 0,  // Rotation around Z-axis (roll)
    
    // Basic animation controls
    frequency = defaultProps.frequency,
    setFrequency,
    amplitude = defaultProps.amplitude,
    setAmplitude,
    maxDistance = defaultProps.maxDistance,
    setMaxDistance,
    timeSpeed = 0.5,
    
    // Advanced noise controls (matching IcoBufferMesh)
    noiseScale = 1.0,
    noiseDensity = 1.0,
    noiseOctaves = 3.0,
    noiseLacunarity = 2.0,
    noiseGain = 0.5,
    turbulenceStrength = 1.0,
    flowDirection = 0.0,
    waveSpeed = 1.0,
    distortionStrength = 1.0,
    
    // Visual controls
    particleSize = 2.0,
    colorIntensity = 1.0,
    particleColor = [1.0, 1.0, 1.0],
    
    // Distance fade controls
    nearFadeDistance = 50.0,
    farFadeDistance = 180.0,
    
    // Mouse interaction controls
    mouseInfluenceStrength = 1.0,
    mouseOrderRadius = 0.3,        // Radius of ordered area around mouse
    mouseOrderStrength = 0.8,      // How much order is applied near mouse
    chaosStrength = 2.0,           // How chaotic particles are away from mouse
    
    // Camera and device
    isMobile = defaultProps.isMobile,
    setIsMobile,
    cameraZ = defaultProps.cameraZ,
    setCameraZ
}, ref) {
    
    const shaderMaterial = useRef();
    const mouse = useRef({ x: 0.5, y: 0.5 }); // normalized [0,1]
    const currentTime = useRef(0);

    // Update mouse state
    const [mouseInfluence, setMouseInfluence] = useState(mouseInfluenceStrength);
    const [mouseOrder, setMouseOrder] = useState(mouseOrderRadius);
    const [mouseOrderStr, setMouseOrderStr] = useState(mouseOrderStrength);
    const [chaos, setChaos] = useState(chaosStrength);

    // Update state when props change
    useEffect(() => {
        setMouseInfluence(mouseInfluenceStrength);
        setMouseOrder(mouseOrderRadius);
        setMouseOrderStr(mouseOrderStrength);
        setChaos(chaosStrength);
    }, [mouseInfluenceStrength, mouseOrderRadius, mouseOrderStrength, chaosStrength]);

    useThree(({camera}) => {
        camera.position.z = cameraZ;
    });

    useFrame(({ clock, size }) => {
        currentTime.current = clock.elapsedTime;
        
        if (shaderMaterial.current) {
            // Always update time
            shaderMaterial.current.uniforms.u_time.value = clock.elapsedTime * timeSpeed;
            
            // Update resolution
            shaderMaterial.current.uniforms.u_resolution.value.set(size.width, size.height);
            
            // Update mouse position
            shaderMaterial.current.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
            
            // Update all advanced noise parameters
            shaderMaterial.current.uniforms.noiseScale.value = noiseScale;
            shaderMaterial.current.uniforms.noiseDensity.value = noiseDensity;
            shaderMaterial.current.uniforms.noiseOctaves.value = noiseOctaves;
            shaderMaterial.current.uniforms.noiseLacunarity.value = noiseLacunarity;
            shaderMaterial.current.uniforms.noiseGain.value = noiseGain;
            shaderMaterial.current.uniforms.turbulenceStrength.value = turbulenceStrength;
            shaderMaterial.current.uniforms.flowDirection.value = flowDirection;
            shaderMaterial.current.uniforms.waveSpeed.value = waveSpeed;
            shaderMaterial.current.uniforms.distortionStrength.value = distortionStrength;
            
            // Update mouse control parameters
            shaderMaterial.current.uniforms.u_mouseInfluence.value = mouseInfluence;
            shaderMaterial.current.uniforms.mouseOrderRadius.value = mouseOrder;
            shaderMaterial.current.uniforms.mouseOrderStrength.value = mouseOrderStr;
            shaderMaterial.current.uniforms.chaosStrength.value = chaos;
            
            // Update particle visual parameters
            shaderMaterial.current.uniforms.particleSize.value = particleSize;
            shaderMaterial.current.uniforms.colorIntensity.value = colorIntensity;
            shaderMaterial.current.uniforms.particleColor.value.set(1.0, 1.0, 1.0); // White particles
            
            // Update distance fade parameters
            shaderMaterial.current.uniforms.nearFadeDistance.value = nearFadeDistance;
            shaderMaterial.current.uniforms.farFadeDistance.value = farFadeDistance;
        }
        
        // Update legacy parameters with setters (for backward compatibility)
        if (frequency !== undefined && setFrequency) {
            setFrequency(frequency);
            if (shaderMaterial.current) {
                shaderMaterial.current.uniforms.frequency.value = frequency;
            }
        }
        if (amplitude !== undefined && setAmplitude) {
            setAmplitude(amplitude);
            if (shaderMaterial.current) {
                shaderMaterial.current.uniforms.amplitude.value = amplitude;
            }
        }
        if (maxDistance !== undefined && setMaxDistance) {
            setMaxDistance(maxDistance);
            if (shaderMaterial.current) {
                shaderMaterial.current.uniforms.maxDistance.value = maxDistance;
            }
        }
        if (isMobile !== undefined && setIsMobile) {
            setIsMobile(isMobile);
            if (shaderMaterial.current) {
                shaderMaterial.current.uniforms.isMobile.value = isMobile;
            }
        }
        if (cameraZ !== undefined && setCameraZ) {
            setCameraZ(cameraZ);
        }
    });

    // Mouse event handlers
    useEffect(() => {
        function handleMouseMove(e) {
            // Get the canvas element
            const canvas = document.querySelector('#monitoring-sketch canvas');
            if (!canvas) return;
            
            // Normalize mouse position to [0,1]
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = (e.clientX - rect.left) / rect.width;
            mouse.current.y = 1 - (e.clientY - rect.top) / rect.height; // invert y for GL coords
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Update shader uniforms when props change
    useEffect(() => {
        if (shaderMaterial.current) {
            shaderMaterial.current.uniforms.noiseScale.value = noiseScale;
            shaderMaterial.current.uniforms.noiseDensity.value = noiseDensity;
            shaderMaterial.current.uniforms.noiseOctaves.value = noiseOctaves;
            shaderMaterial.current.uniforms.noiseLacunarity.value = noiseLacunarity;
            shaderMaterial.current.uniforms.noiseGain.value = noiseGain;
            shaderMaterial.current.uniforms.turbulenceStrength.value = turbulenceStrength;
            shaderMaterial.current.uniforms.flowDirection.value = flowDirection;
            shaderMaterial.current.uniforms.waveSpeed.value = waveSpeed;
            shaderMaterial.current.uniforms.distortionStrength.value = distortionStrength;
        }
    }, [noiseScale, noiseDensity, noiseOctaves, noiseLacunarity, noiseGain, turbulenceStrength, flowDirection, waveSpeed, distortionStrength]);

    useEffect(() => {
        if (shaderMaterial.current) {
            shaderMaterial.current.uniforms.mouseOrderRadius.value = mouseOrderRadius;
            shaderMaterial.current.uniforms.mouseOrderStrength.value = mouseOrderStrength;
            shaderMaterial.current.uniforms.chaosStrength.value = chaosStrength;
        }
    }, [mouseOrderRadius, mouseOrderStrength, chaosStrength]);

    useEffect(() => {
        if (shaderMaterial.current) {
            shaderMaterial.current.uniforms.particleSize.value = particleSize;
            shaderMaterial.current.uniforms.colorIntensity.value = colorIntensity;
            shaderMaterial.current.uniforms.particleColor.value.set(1.0, 1.0, 1.0); // White particles
            shaderMaterial.current.uniforms.nearFadeDistance.value = nearFadeDistance;
            shaderMaterial.current.uniforms.farFadeDistance.value = farFadeDistance;
        }
    }, [particleSize, colorIntensity, particleColor, nearFadeDistance, farFadeDistance]);

    // Component initialization
    useEffect(() => {
        // MonitoringMesh component ready
    }, []);

    return (
        <points 
            ref={ref} 
            position={[meshPositionX, meshPositionY, meshPositionZ]}
            rotation={[meshRotationX, meshRotationY, meshRotationZ]}
        >
            {/* Use ParkGeometry (same as HomePage) with fallback */}
            <Suspense fallback={<icosahedronGeometry args={[100, 20]} />}>
                <ParkGeometry />
            </Suspense>
            {/* Restore shader material */}
            <shaderMaterial
                ref={shaderMaterial}
                uniforms={{
                    // Time and resolution
                    u_time: { value: 0. },
                    u_resolution: { value: new THREE.Vector2() },
                    
                    // Basic animation controls
                    frequency: { type: 'f', value: frequency },
                    amplitude: { type: 'f', value: amplitude },
                    maxDistance: { type: 'f', value: maxDistance },
                    
                    // Advanced noise controls
                    noiseScale: { type: 'f', value: noiseScale },
                    noiseDensity: { type: 'f', value: noiseDensity },
                    noiseOctaves: { type: 'f', value: noiseOctaves },
                    noiseLacunarity: { type: 'f', value: noiseLacunarity },
                    noiseGain: { type: 'f', value: noiseGain },
                    turbulenceStrength: { type: 'f', value: turbulenceStrength },
                    flowDirection: { type: 'f', value: flowDirection },
                    waveSpeed: { type: 'f', value: waveSpeed },
                    distortionStrength: { type: 'f', value: distortionStrength },
                    
                    // Visual controls
                    particleSize: { type: 'f', value: particleSize },
                    colorIntensity: { type: 'f', value: colorIntensity },
                    particleColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) }, // White particles
                    
                    // Distance fade controls
                    nearFadeDistance: { type: 'f', value: nearFadeDistance },
                    farFadeDistance: { type: 'f', value: farFadeDistance },
                    
                    // Mouse interaction
                    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
                    u_mouseInfluence: { value: mouseInfluence },
                    mouseOrderRadius: { type: 'f', value: mouseOrder },
                    mouseOrderStrength: { type: 'f', value: mouseOrderStr },
                    chaosStrength: { type: 'f', value: chaos },
                    
                    // Legacy/Device
                    isMobile: { type: 'bool', value: isMobile },
                    uPositions: { value: null } // Keep for shader compatibility
                }}
                side={THREE.DoubleSide}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </points>
    );
});

export default MonitoringMesh;
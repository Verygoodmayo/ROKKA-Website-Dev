import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertex from '../../../static/glsl/sketchs/vertex.glsl';
import fragment from '../../../static/glsl/sketchs/fragment.glsl';
import ParkGeometry from "../../components/HomePage/Sketch/ParkGeometry";
import WebGLErrorBoundary from "../../components/Utils/WebGLErrorBoundary";
import { UniversalCanvas, useWebGLManager } from "../../components/Utils/UniversalWebGLManager";

function MonitoringMesh({
    // Chaos-to-order effect configuration
    frequency = 0.426,
    amplitude = 1.0,
    maxDistance = 0.5,
    timeSpeed = 0.8,
    
    // Advanced noise controls for chaos-to-order effect
    noiseScale = 1.2,
    noiseDensity = 1.0,
    noiseOctaves = 4.0,
    noiseLacunarity = 2.0,
    noiseGain = 0.5,
    turbulenceStrength = 2.8,
    flowDirection = 45.0,
    waveSpeed = 1.8,
    distortionStrength = 1.8,
    
    // Visual controls
    particleColor = [0.2, 0.6, 1.0],
    particleSize = 3.0,
    colorIntensity = 1.2,
    
    // Mouse interaction controls for chaos-to-order
    mouseInfluenceStrength = 2.0,
    mouseOrderRadius = 0.25,
    mouseOrderStrength = 0.9,
    chaosStrength = 3.5,
    
    // Mesh positioning and rotation controls
    meshPosition = [0, 0, 0],
    meshRotation = [0, 0, 0],
}) {
    const { manager } = useWebGLManager();
    const shaderMaterial = useRef();
    const mouse = useRef({ x: 0.5, y: 0.5 });
    const mouseClick = useRef({ x: 0.5, y: 0.5, time: 0.0, active: false });
    const geometryRef = useRef();
    const meshRef = useRef();
    const { size } = useThree();

    console.log('MonitoringMesh: Component rendering with props:', { frequency, amplitude, maxDistance });

    // Handle mouse movement for chaos-to-order effect
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!window) return;
            
            const rect = event.target.getBoundingClientRect ? event.target.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
            
            mouse.current.x = (event.clientX - rect.left) / rect.width;
            mouse.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
        };

        const handleMouseDown = (event) => {
            if (!window) return;
            
            const rect = event.target.getBoundingClientRect ? event.target.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
            
            mouseClick.current.x = (event.clientX - rect.left) / rect.width;
            mouseClick.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
            mouseClick.current.active = true;
            mouseClick.current.time = 0.0;
        };

        const handleMouseUp = () => {
            mouseClick.current.active = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Create shader material registration with chaos-to-order controls
    useEffect(() => {
        if (!shaderMaterial.current) return;

        const material = shaderMaterial.current;
        
        // Register material with WebGL manager
        manager.registerResource('monitoring-sketch', material, 'material');

        console.log('MonitoringMesh: Material registered and ready');
        console.log('MonitoringMesh: Uniforms available:', Object.keys(material.uniforms || {}));
    }, [manager]);

    // Animation loop
    useFrame((state) => {
        if (!shaderMaterial.current?.uniforms) return;

        const uniforms = shaderMaterial.current.uniforms;
        
        try {
            // Check if all required uniforms exist before updating
            if (!uniforms.u_time || !uniforms.u_mouse || !uniforms.u_mouseClick || !uniforms.u_resolution) {
                return; // Skip this frame if uniforms aren't ready
            }
            
            // Update time
            if (uniforms.u_time) {
                uniforms.u_time.value = state.clock.elapsedTime;
            }
            
            // Update mouse positions
            if (uniforms.u_mouse) {
                uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
            }
            
            // Update mouse click with fade out
            if (uniforms.u_mouseClick) {
                if (mouseClick.current.active) {
                    mouseClick.current.time += state.clock.getDelta();
                    uniforms.u_mouseClick.value.set(
                        mouseClick.current.x,
                        mouseClick.current.y,
                        mouseClick.current.time,
                        1.0
                    );
                } else {
                    // Fade out click effect
                    const currentIntensity = uniforms.u_mouseClick.value.w;
                    uniforms.u_mouseClick.value.w = Math.max(0, currentIntensity - state.clock.getDelta() * 2);
                }
            }
            
            // Update resolution if changed
            if (uniforms.u_resolution && uniforms.u_resolution.value) {
                if (uniforms.u_resolution.value.x !== size.width || uniforms.u_resolution.value.y !== size.height) {
                    uniforms.u_resolution.value.set(size.width, size.height);
                }
            }
        } catch (error) {
            console.warn('MonitoringMesh: Error updating uniforms:', error);
        }
    });

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (shaderMaterial.current) {
                manager.registerResource('monitoring-sketch', shaderMaterial.current, 'material');
            }
            if (geometryRef.current) {
                manager.registerResource('monitoring-sketch', geometryRef.current, 'geometry');
            }
        };
    }, [manager]);

    return (
        <mesh ref={meshRef} position={meshPosition} rotation={meshRotation}>
            <ParkGeometry ref={geometryRef} />
            <shaderMaterial
                ref={shaderMaterial}
                uniforms={{
                    // Core animation uniforms
                    u_time: { value: 0.0 },
                    u_frequency: { value: frequency },
                    u_amplitude: { value: amplitude },
                    u_maxDistance: { value: maxDistance },
                    u_timeSpeed: { value: timeSpeed },
                    
                    // Advanced noise uniforms for chaos-to-order
                    u_noiseScale: { value: noiseScale },
                    u_noiseDensity: { value: noiseDensity },
                    u_noiseOctaves: { value: noiseOctaves },
                    u_noiseLacunarity: { value: noiseLacunarity },
                    u_noiseGain: { value: noiseGain },
                    u_turbulenceStrength: { value: turbulenceStrength },
                    u_flowDirection: { value: flowDirection },
                    u_waveSpeed: { value: waveSpeed },
                    u_distortionStrength: { value: distortionStrength },
                    
                    // Visual uniforms
                    u_particleColor: { value: new THREE.Vector3(...particleColor) },
                    u_particleSize: { value: particleSize },
                    u_colorIntensity: { value: colorIntensity },
                    
                    // Mouse interaction uniforms
                    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
                    u_mouseClick: { value: new THREE.Vector4(0.5, 0.5, 0.0, 0.0) },
                    u_mouseInfluenceStrength: { value: mouseInfluenceStrength },
                    u_mouseOrderRadius: { value: mouseOrderRadius },
                    u_mouseOrderStrength: { value: mouseOrderStrength },
                    u_chaosStrength: { value: chaosStrength },
                    
                    // Screen uniforms
                    u_resolution: { value: new THREE.Vector2(size.width, size.height) }
                }}
                vertexShader={vertex}
                fragmentShader={fragment}
                transparent={true}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

// Simplified monitoring sketch using UniversalCanvas
export default function MonitoringSketch(props) {
    const { 
        // Camera settings
        cameraFov = 75,
        cameraNear = 0.1,
        cameraFar = 1000,
        cameraPosition = [0, 0, 5],
        cameraLookAt = [0, 0, 0],
        
        // Animation settings
        frequency = 0.426,
        amplitude = 1.0,
        maxDistance = 0.5,
        timeSpeed = 0.8,
        
        // Visual settings
        particleColor = [0.2, 0.6, 1.0],
        particleSize = 3.0,
        colorIntensity = 1.2,
        
        // Other props
        ...restProps
    } = props;

    const fallbackComponent = (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#fff',
            fontSize: '16px',
            zIndex: 1000
        }}>
            <div style={{ textAlign: 'center' }}>
                <p>🎨 Monitoring visualization loading...</p>
                <p style={{ fontSize: '14px', opacity: 0.7 }}>
                    If this persists, try refreshing the page
                </p>
            </div>
        </div>
    );

    const handleContextReady = ({ gl, scene, camera, manager, canvasId }) => {
        console.log(`MonitoringSketch: WebGL context ready for ${canvasId}`);
        console.log('GL capabilities:', gl.capabilities);
        console.log('Scene children:', scene.children.length);
        
        // Register scene resources
        manager.registerResource(canvasId, scene, 'scene');
        manager.registerResource(canvasId, camera, 'camera');
    };

    return (
        <WebGLErrorBoundary>
            <UniversalCanvas
                id="monitoring-sketch"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'auto'
                }}
                fallbackComponent={fallbackComponent}
                autoRecover={true}
                recoveryDelay={3000}
                onContextReady={handleContextReady}
                webglOptions={{
                    maxTextures: 8,
                    pixelRatio: Math.min(window.devicePixelRatio, 2),
                    outputColorSpace: THREE.SRGBColorSpace,
                    clearColor: 0x000000,
                    clearAlpha: 0,
                    checkShaderErrors: false
                }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "default",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                    stencil: false,
                    depth: true,
                }}
            >
                <Suspense fallback={null}>
                    <PerspectiveCamera
                        makeDefault
                        fov={cameraFov}
                        aspect={typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1}
                        near={cameraNear}
                        far={cameraFar}
                        position={cameraPosition}
                        onUpdate={(camera) => {
                            camera.lookAt(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]);
                        }}
                    />
                    
                    <MonitoringMesh
                        frequency={frequency}
                        amplitude={amplitude}
                        maxDistance={maxDistance}
                        timeSpeed={timeSpeed}
                        particleColor={particleColor}
                        particleSize={particleSize}
                        colorIntensity={colorIntensity}
                        {...restProps}
                    />
                </Suspense>
            </UniversalCanvas>
        </WebGLErrorBoundary>
    );
}

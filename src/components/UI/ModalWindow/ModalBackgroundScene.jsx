import { Canvas } from "@react-three/fiber";
import { IcoBufferMesh } from "../../Sketchs";
import { CameraController } from "../../Sketchs";
import { WebGLErrorBoundary } from "../../Utils";
import * as THREE from "three";

export default function ModalBackgroundScene({ 
    id, 
    config = {}
}) {
    // Default configuration based on DiagramCard pattern
    const defaultConfig = {
        // Visual controls
        particleColor: [0.1, 0.1, 0.9], // Blue particles
        particleSize: 1.0,
        colorIntensity: 1.0,
        
        // Animation controls
        frequency: 0.175,
        amplitude: 3.5,
        maxDistance: 2.85,
        timeSpeed: 0.5,
        
        // Noise controls
        noiseScale: 1.0,
        noiseDensity: 1.0,
        noiseOctaves: 3.0,
        noiseLacunarity: 2.0,
        noiseGain: 0.5,
        turbulenceStrength: 1.0,
        flowDirection: 0.0,
        waveSpeed: 1.0,
        distortionStrength: 1.0,
        
        // Mouse interaction (minimal for decorative background)
        mouseInfluenceStrength: 0.5,
        mouseOrderRadius: 0.3,
        mouseOrderStrength: 1.0,
        chaosStrength: 1.0,
        
        // Click effects disabled for modal background
        clickInfluenceStrength: 0.0,
        clickWaveSpeed: 0.0,
        clickDecayRate: 1.0,
        
        // Geometry
        meshType: 'icosahedron',
        geoComplexity: 100,
        
        // Camera
        cameraPosition: [0, 0, 0.25],
        cameraLookAt: [0, 0, 0],
        cameraFov: 75,
        cameraNear: 0.1,
        cameraFar: 1000
    };

    // Merge with provided config
    const finalConfig = { ...defaultConfig, ...config };

    // Create mesh type based on config
    const getMeshType = () => {
        switch (finalConfig.meshType) {
            case 'box':
                return new THREE.BoxGeometry(50, 50, 50, 50, 100, 100, 100);
            case 'icosahedron':
            default:
                return new THREE.IcosahedronGeometry(100, finalConfig.geoComplexity);
        }
    };

    return (
        <WebGLErrorBoundary>
            <Canvas 
                id={id}
                className="modal-background-scene"
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                }}
                onCreated={({ gl }) => {
                    if (!gl || !gl.domElement) {
                        console.error('WebGL context initialization failed in ModalBackgroundScene');
                        return;
                    }
                    
                    try {
                        gl.domElement.addEventListener('webglcontextlost', (event) => {
                            console.warn('WebGL context lost in ModalBackgroundScene');
                            event.preventDefault();
                        });
                        
                        gl.domElement.addEventListener('webglcontextrestored', () => {
                            console.log('WebGL context restored in ModalBackgroundScene');
                        });
                    } catch (error) {
                        console.error('Error adding WebGL event listeners in ModalBackgroundScene:', error);
                    }
                }}
            >
                <CameraController 
                    position={finalConfig.cameraPosition}
                    lookAt={finalConfig.cameraLookAt}
                    fov={finalConfig.cameraFov}
                    near={finalConfig.cameraNear}
                    far={finalConfig.cameraFar}
                />
                <IcoBufferMesh 
                    meshType={getMeshType()}
                    geoComplexity={finalConfig.geoComplexity}
                    // Shader props
                    particleColor={finalConfig.particleColor}
                    particleSize={finalConfig.particleSize}
                    colorIntensity={finalConfig.colorIntensity}
                    frequency={finalConfig.frequency}
                    amplitude={finalConfig.amplitude}
                    maxDistance={finalConfig.maxDistance}
                    timeSpeed={finalConfig.timeSpeed}
                    noiseScale={finalConfig.noiseScale}
                    noiseDensity={finalConfig.noiseDensity}
                    noiseOctaves={finalConfig.noiseOctaves}
                    noiseLacunarity={finalConfig.noiseLacunarity}
                    noiseGain={finalConfig.noiseGain}
                    turbulenceStrength={finalConfig.turbulenceStrength}
                    flowDirection={finalConfig.flowDirection}
                    waveSpeed={finalConfig.waveSpeed}
                    distortionStrength={finalConfig.distortionStrength}
                    // Mouse interaction
                    mouseInfluenceStrength={finalConfig.mouseInfluenceStrength}
                    mouseOrderRadius={finalConfig.mouseOrderRadius}
                    mouseOrderStrength={finalConfig.mouseOrderStrength}
                    chaosStrength={finalConfig.chaosStrength}
                    // Click effects (disabled)
                    clickInfluenceStrength={finalConfig.clickInfluenceStrength}
                    clickWaveSpeed={finalConfig.clickWaveSpeed}
                    clickDecayRate={finalConfig.clickDecayRate}
                />
            </Canvas>
        </WebGLErrorBoundary>
    );
}

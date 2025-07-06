import React, { Suspense } from 'react';
import { UniversalCanvas } from "../../components/Utils/WebGL/UniversalWebGLManager";
import * as THREE from 'three';

function SimpleTestMesh() {
    return (
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" />
        </mesh>
    );
}

// Simple test version to check if Three.js is loading
export default function MonitoringSketchTest() {
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
                <p>🔧 Testing Three.js loading...</p>
                <p style={{ fontSize: '14px', opacity: 0.7 }}>
                    If this persists, there may be a WebGL issue
                </p>
            </div>
        </div>
    );

    const handleContextReady = ({ gl, scene, camera, manager, canvasId }) => {
        console.log(`MonitoringSketchTest: WebGL context ready for ${canvasId}`);
        console.log('GL capabilities:', gl.capabilities);
        console.log('GL extensions:', gl.getExtension ? 'Available' : 'Not available');
    };

    return (
        <UniversalCanvas
            id="monitoring-sketch-test"
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
            recoveryDelay={1000}
            onContextReady={handleContextReady}
            webglOptions={{
                maxTextures: 4,
                pixelRatio: 1,
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
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                
                <SimpleTestMesh />
                
                <perspectiveCamera 
                    makeDefault 
                    position={[0, 0, 5]} 
                    fov={75} 
                    aspect={window.innerWidth / window.innerHeight}
                    near={0.1} 
                    far={1000} 
                />
            </Suspense>
        </UniversalCanvas>
    );
}

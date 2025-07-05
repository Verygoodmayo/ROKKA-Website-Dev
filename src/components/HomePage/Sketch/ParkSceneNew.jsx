import { Suspense } from "react";
import ParkModel from "./ParkModel";
import ParkSceneCamera from "./ParkSceneCamera";
import WebGLErrorBoundary from "../../Utils/WebGLErrorBoundary";
import { UniversalCanvas, useWebGLManager } from "../../Utils/UniversalWebGLManager";

export default function ParkScene() {
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
            background: 'rgba(0, 0, 0, 0.1)',
            color: '#666',
            fontSize: '14px',
            zIndex: -1,
            pointerEvents: 'none'
        }}>
            <div style={{ textAlign: 'center' }}>
                <p>🏞️ Loading homepage visualization...</p>
            </div>
        </div>
    );

    const handleContextReady = ({ gl, scene, camera, manager, canvasId }) => {
        console.log(`ParkScene: WebGL context ready for ${canvasId}`);
        
        // Register scene resources
        manager.registerResource(canvasId, scene, 'scene');
        manager.registerResource(canvasId, camera, 'camera');
    };

    return (
        <WebGLErrorBoundary>
            <UniversalCanvas
                id="home-page-sketch"
                className="sketch-container"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}
                fallbackComponent={fallbackComponent}
                autoRecover={true}
                recoveryDelay={2000}
                onContextReady={handleContextReady}
                webglOptions={{
                    maxTextures: 16,
                    pixelRatio: Math.min(window.devicePixelRatio, 2),
                    outputColorSpace: 'srgb',
                    clearColor: 0x000000,
                    clearAlpha: 0,
                    checkShaderErrors: false
                }}
                resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                }}
            >
                <Suspense fallback={null}>
                    <ParkSceneCamera />
                    <ParkModel />
                </Suspense>
            </UniversalCanvas>
        </WebGLErrorBoundary>
    );
}

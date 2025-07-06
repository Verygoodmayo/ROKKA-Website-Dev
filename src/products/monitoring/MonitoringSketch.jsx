import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MonitoringMesh from "./MonitoringMesh";
import MonitoringSceneCamera from "./MonitoringSceneCamera";
import { WebGLErrorBoundary } from "../../components/Utils";

export default function MonitoringSketch({
    // Extract camera and mesh position props
    cameraPositionX,
    cameraPositionY,
    cameraPositionZ,
    meshPositionX,
    meshPositionY,
    meshPositionZ,
    // Extract mesh rotation props
    meshRotationX,
    meshRotationY,
    meshRotationZ,
    // Pass through all other props to MonitoringMesh
    ...props
}) {
    return (
        <WebGLErrorBoundary>
            <Canvas
                id='monitoring-sketch'
                className='sketch-container'
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'auto'  // Enable pointer events
                }}
                resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
                gl={{
                    antialias: true,
                    alpha: true,  // Restore transparent background
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                }}
            >
                <Suspense fallback={null}>
                    <MonitoringSceneCamera 
                        cameraPositionX={cameraPositionX}
                        cameraPositionY={cameraPositionY}
                        cameraPositionZ={cameraPositionZ}
                        meshPositionX={meshPositionX}
                        meshPositionY={meshPositionY}
                        meshPositionZ={meshPositionZ}
                    />
                    <MonitoringMesh 
                        meshPositionX={meshPositionX}
                        meshPositionY={meshPositionY}
                        meshPositionZ={meshPositionZ}
                        meshRotationX={meshRotationX}
                        meshRotationY={meshRotationY}
                        meshRotationZ={meshRotationZ}
                        {...props} 
                    />
                </Suspense>
            </Canvas>
        </WebGLErrorBoundary>
    )
}

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParkModel from "./ParkModel";
import ParkSceneCamera from "./ParkSceneCamera";
import { WebGLErrorBoundary } from "../../Utils";

export default function ParkScene () {

    return (
        <WebGLErrorBoundary>
            <Canvas
                id='home-page-sketch'
                className='sketch-container'
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}
                resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
                frameloop="always"
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                    stencil: false,
                    depth: true,
                }}
            >
                <Suspense fallback={null}>
                    <ParkSceneCamera></ParkSceneCamera>
                    <ParkModel />
                </Suspense>
            </Canvas>
        </WebGLErrorBoundary>
    )
}
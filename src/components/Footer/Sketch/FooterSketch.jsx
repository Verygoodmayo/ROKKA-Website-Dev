import { Canvas } from "@react-three/fiber";
import FooterSketchMesh from "./FooterSketchMesh";
import { WebGLErrorBoundary } from "../../Utils";

export default function FooterSketch ({id, color = [1., 1., 1.]}) {

    return (
        <WebGLErrorBoundary>
            <Canvas 
                id={id} 
                className="footer-sketch"
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                }}
            >
                <FooterSketchMesh color={color} />
            </Canvas>
        </WebGLErrorBoundary>
    )

}
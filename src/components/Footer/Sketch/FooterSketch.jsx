import { Canvas } from "@react-three/fiber";
import FooterSketchMesh from "./FooterSketchMesh";

export default function FooterSketch () {

    return (

        <Canvas
            className="footer-sketch"
        >
            <FooterSketchMesh></FooterSketchMesh>
        </Canvas>

    )

}
import { Canvas } from "@react-three/fiber";
import FooterSketchMesh from "./FooterSketchMesh";

export default function FooterSketch ({id, color = [1., 1., 1.]}) {

    return (
        <Canvas id={id} className="footer-sketch">
            <FooterSketchMesh color={color} />
        </Canvas>
    )

}
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

import IcoBufferMesh from "../../components/Sketchs/IcoBufferMesh";
import DataManagerSketch from "./IcoBufferMesh";
// import { GUI } from 'dat.gui'; // Uncomment if you want to use GUI for debugging

export default function HeroSectionSketch() {

    return (
        <Canvas className="sketch-container">
            <DataManagerSketch></DataManagerSketch>
        </Canvas>    
    )

}
import { Canvas } from "@react-three/fiber";
import ParkModel from "./ParkModel";

import ParkSceneCamera from "./ParkSceneCamera";

export default function ParkScene () {

    return (
        <Canvas
            id='home-page-sketch'
            className='sketch-container'
        >
            <ParkSceneCamera></ParkSceneCamera>
            <ParkModel />
            {/* <OrbitControls 
                enableDamping={false}
            /> */}
        </Canvas>
    )
}
import { Canvas } from "@react-three/fiber";
import ParkModel from "./ParkModel";

import ParkSceneCamera from "./ParkSceneCamera";

export default function ParkScene () {

    return (
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
        >
            <ParkSceneCamera></ParkSceneCamera>
            <ParkModel />
            {/* <OrbitControls 
                enableDamping={false}
            /> */}
        </Canvas>
    )
}
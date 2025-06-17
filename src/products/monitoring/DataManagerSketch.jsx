import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import DataManagerSketch from "./IcoBufferMesh";
// import { GUI } from 'dat.gui'; // Uncomment if you want to use GUI for debugging

export default function DataManagerSketchContainer({
    geoComplexity = 136,
    meshType = new THREE.IcosahedronGeometry(100, geoComplexity),
    frequency = 0.426,
    setFrequency,
    amplitude = 1,
    setAmplitude,
    maxDistance = 0.5,
    setMaxDistance,
    isMobile = false,
    setIsMobile,
    cameraZ = 1.85,
    setCameraZ
}) {

    // Uncomment if you want to use GUI for debugging
    // const gui = new GUI();
    // gui.add({ frequency }, 'frequency', -1, 1, 0.001).onChange(setFrequency).name('Frequency');
    // gui.add({ amplitude }, 'amplitude', -2, 2, 0.01).onChange(setAmplitude).name('Amplitude');
    // gui.add({ maxDistance }, 'maxDistance', -4, 4, 0.01).onChange(setMaxDistance).name('Max Distance');  

    return (
        <Canvas 
            className="sketch-container"
            id="data-manager-sketch"
        >
            <DataManagerSketch
                geoComplexity={geoComplexity}
                meshType={meshType}
                frequency={frequency}
                setFrequency={setFrequency}
                amplitude={amplitude}
                setAmplitude={setAmplitude}
                maxDistance={maxDistance}
                setMaxDistance={setMaxDistance}
                isMobile={isMobile}
                setIsMobile={setIsMobile}
                cameraZ={cameraZ}
                setCameraZ={setCameraZ}
            ></DataManagerSketch>
        </Canvas>    
    )

}
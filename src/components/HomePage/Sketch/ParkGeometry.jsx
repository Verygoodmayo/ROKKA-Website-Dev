import { useRef, useMemo, Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import modelSrc from '../../../../static/glb/ParkModel.glb?url'

export default function ParkGeometry() {
    const bufferGeometry = useRef();

    // console.log('ParkGeometry: Model source:', modelSrc);

    // 1. Load the model ONCE
    const gltf = useLoader(GLTFLoader, modelSrc);

    // 2. Extract geometry data ONCE using useMemo
    const { positions, reference } = useMemo(() => {
        // Find the mesh with geometry
        const mesh = gltf.scene.children.find(child => child.geometry);
        if (!mesh) return { positions: new Float32Array(), reference: new Float32Array() };

        const positionArray = mesh.geometry.attributes.position.array;
        const count = mesh.geometry.attributes.position.count;
        const positions = new Float32Array(count * 3);
        const reference = new Float32Array(count * 2);

        for (let i = 0; i < count; i++) {
            let x = positionArray[i * 3 + 0] / 100;
            let y = positionArray[i * 3 + 1] / 100;
            let z = positionArray[i * 3 + 2] / 100;

            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            reference[i * 2 + 0] = (i % count) / count;
            reference[i * 2 + 1] = ~~(i / count) / count;
        }
        return { positions, reference };
    }, [gltf]);

    // 3. Render geometry using the memoized arrays
    return (
        <bufferGeometry ref={bufferGeometry}>
            <bufferAttribute
                attach='attributes-position'
                count={positions.length / 3}
                array={positions}
                itemSize={3}
            />
            <bufferAttribute
                attach='attributes-reference'
                name='reference'
                array={reference}
                count={reference.length / 2}
                itemSize={2}
            />
        </bufferGeometry>
    );
}
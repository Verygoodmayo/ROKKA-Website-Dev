
import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import modelSrc from '../../../../static/glb/ParkModel.glb?url'


export default function ParkGeometry() {
    
    let positions, reference, model, count,
        positionArray

    const bufferGeometry = useRef()

    SetUp()
    function SetUp() {
        model = loadModel()

        positionArray = model.props.object.children[0].geometry.attributes.position.array
        count = model.props.object.children[0].geometry.attributes.position.count
        positions = new Float32Array(count * 3);
        reference = new Float32Array(count * 2);
        fillPositions()
        // console.log(positions)
    }

    function loadModel() {
            const gltf = useLoader(GLTFLoader, modelSrc)
            return <primitive object={gltf.scene} />
    } 

    function fillPositions() {
        // Fill Positions

        for (let i = 0; i < count; i++) {

            let x  = positionArray[i * 3 + 0] / 100
            let y  = positionArray[i * 3 + 1] / 100
            let z  = positionArray[i * 3 + 2] / 100

            positions[i * 3 + 0] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            reference[i * 2 + 0] = (i % count)/count
            reference[i * 2 + 1] = ~ ~ ( i / count ) / count;
            }
    }

    return (
        <bufferGeometry
            ref={bufferGeometry}
        >
                <bufferAttribute
                    attach='attributes-position'
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                ></bufferAttribute>
                <bufferAttribute
                    attach='attributes-reference'
                    name='reference'
                    array={reference}
                    count={reference.length / 2}
                    itemSize={2}
                ></bufferAttribute>
            </bufferGeometry>
    )
}
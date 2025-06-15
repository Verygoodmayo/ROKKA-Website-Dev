import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import vertex from '../../../../static/glsl/footer/vertex.glsl'
import fragment from '../../../../static/glsl/footer/fragment.glsl'
import { useEffect, useMemo, useRef } from "react"

import { GUI } from 'dat.gui'

export default function FooterSketchMesh () {

    let model, count,
        positionArray

    // Refs
    const shaderMaterial = useRef();
    const bufferGeometry = useRef();

    useThree(({camera}) => {
       camera.position.z = 0
    })

    useFrame(({clock}) => {
        shaderMaterial.current.uniforms.u_time.value = clock.elapsedTime * 0.5
    })

    // useEffect(() => {
    //         const gui = new GUI()
    //         gui.add(shaderMaterial.current.uniforms.frequency, 'value', -1, 1,0.001).name('f')
    //         gui.add(shaderMaterial.current.uniforms.amplitude, 'value', -2, 2,0.01).name('a')
    //         gui.add(shaderMaterial.current.uniforms.maxDistance, 'value', -4, 4,0.01).name('maxD')
    //         gui.domElement.style.opacity = 0
    //         return () => {
    //         gui.destroy()
    //         }
    //     }, [])

    const { positions, reference } = useMemo(() => {
            const mesh = new THREE.IcosahedronGeometry(100, 136);
            // If no mesh is found, return empty arrays
            if (!mesh) return { positions: new Float32Array(), reference: new Float32Array() };
            const positionArray = mesh.attributes.position.array;
            const count = mesh.attributes.position.count;
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
    });

    return (

        <points>
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

            <shaderMaterial
                ref={shaderMaterial}
                uniforms={
                    {
                        u_time: {value: 0.},
                        u_resolution: {value: new THREE.Vector2()},
                        frequency: { type: 'f', value: 0.426 },
                        amplitude: { type: 'f', value: 1.68 },
                        maxDistance: { type: 'f', value: 2.14},
                        isMobile: {type: 'bool', value: false}
                    }
                }
                side={THREE.DoubleSide}
                vertexShader={vertex}
                fragmentShader={fragment}
                            >
            </shaderMaterial>
        </points>

    )
}
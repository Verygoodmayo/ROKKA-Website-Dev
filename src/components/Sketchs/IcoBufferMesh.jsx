import * as THREE from 'three';
import vertex from '../../../static/glsl/sketchs/vertex.glsl';
import fragment from '../../../static/glsl/sketchs/fragment.glsl';
import IcoBufferGeometry from "../../components/Sketchs/IcoBufferGeometry";
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import GUI from 'lil-gui'; // Use 'lil-gui' as 'dat.gui' is deprecated

export default function IcoBufferMesh({geoComplexity = 136, meshType = new THREE.IcosahedronGeometry(100, geoComplexity)}) {
    const shaderMaterial = useRef();

     // Mouse state
    const mouse = useRef({ x: 0.5, y: 0.5 }); // normalized [0,1]
    const [mouseInfluence, setMouseInfluence] = useState(1.0);

    useThree(({camera}) => {
       camera.position.z = 1
    })

    useFrame(({ clock }) => {
        if (shaderMaterial.current) {
            shaderMaterial.current.uniforms.u_time.value = clock.elapsedTime * 0.5;
        }
    });

    // GUI setup
    // useEffect(() => {
    //     if (!shaderMaterial.current) return;
    //     const gui = new GUI();
    //     gui.add(shaderMaterial.current.uniforms.frequency, 'value', -1, 1, 0.001).name('frequency');
    //     gui.add(shaderMaterial.current.uniforms.amplitude, 'value', -2, 2, 0.01).name('amplitude');
    //     gui.add(shaderMaterial.current.uniforms.maxDistance, 'value', -4, 4, 0.01).name('maxDistance');
    //     gui.domElement.style.opacity = 0.8;
    //     return () => gui.destroy();
    // }, []);

    useEffect(() => {
        function handleMouseMove(e) {
            // Normalize mouse position to [0,1]
            const rect = e.target.getBoundingClientRect();
            mouse.current.x = (e.clientX - rect.left) / rect.width;
            mouse.current.y = 1 - (e.clientY - rect.top) / rect.height; // invert y for GL coords
            // shaderMaterial.current.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <points>
            {/* Replace with your geometry component or bufferGeometry */}
            <IcoBufferGeometry geoComplexity={geoComplexity} meshType={meshType}></IcoBufferGeometry>
            {/* Shader Material */}
            <shaderMaterial
                ref={shaderMaterial}
                uniforms={{
                    u_time: { value: 0. },
                    u_resolution: { value: new THREE.Vector2() },
                    frequency: { type: 'f', value: 0.326 },
                    amplitude: { type: 'f', value: 6.6 },
                    maxDistance: { type: 'f', value: 2 },
                    isMobile: { type: 'bool', value: false },
                    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
                    u_mouseInfluence: { value: mouseInfluence }
                }}
                side={THREE.DoubleSide}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </points>
    );
}
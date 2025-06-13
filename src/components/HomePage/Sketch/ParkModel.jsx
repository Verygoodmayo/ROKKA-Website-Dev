import vertex from '../../../../static/glsl/home_page/vertex.glsl'
import fragment from '../../../../static/glsl/home_page/fragment.glsl'
import { useRef, useLayoutEffect, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { GUI } from 'dat.gui'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { DoubleSide, Vector2 } from 'three'

import ParkGeometry from './ParkGeometry';

export default function ParkModel() {

    // Refs
    const shaderMaterial = useRef();

    const camera = useThree(({camera}) => {
        return camera
    })

    // Render Loop
    useFrame(({clock}) => {
            shaderMaterial.current.uniforms.u_time.value = clock.elapsedTime;
    })

    useEffect(() => {
        const gui = new GUI()
        gui.add(shaderMaterial.current.uniforms.frequency, 'value', -1, 1,0.001)
        gui.add(shaderMaterial.current.uniforms.amplitude, 'value', -2, 2,0.01)
        gui.add(shaderMaterial.current.uniforms.maxDistance, 'value', -4, 4,0.01)
        gui.domElement.style.opacity = 0
        return () => {
        gui.destroy()
        }
    }, [])

    useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger)

    let ctx = gsap.context(() => {
    let timeline = gsap.timeline({
        paused: false,
        scrollTrigger:
        {
            trigger: '#hero-section',
            start: "top top+=1px",
            end: "bottom+=100vh top",
            // markers: true,
            scrub: 1
        }
     });

    timeline
        .set(camera.position, {
          x: -100,
          y: 20,
          z: 130,
        })
        .set(camera.rotation, {
          x: 0,
          y: 0.1,
          z: 0,
        })
        .from(shaderMaterial.current.uniforms.frequency, {
          value: 0.036,
          duration: 4
        })
        .from(shaderMaterial.current.uniforms.amplitude, {
          value: 2,
          duration: 4
        }, '<')
        .from(shaderMaterial.current.uniforms.maxDistance, {
          value: 0.32,
          duration: 4
        }, '<')
        

        .to(camera.position, {
        //   x: 0,
        //   y: -30,
          z: -0,
          duration: 15
        }, '<')

        .to(shaderMaterial.current.uniforms.frequency, {
          value: 0.036,
          duration: 5
        }, '>-7')
        .to(shaderMaterial.current.uniforms.amplitude, {
          value: 2.,
          duration: 5
        }, '<')
        .to(shaderMaterial.current.uniforms.maxDistance, {
          value: 0.32,
          duration: 5
        }, '<') 
    });

    return () => ctx.revert();
  });

    return (
        <points
            rotation={[
                0,
                -2.1,
                0]}
            position={[
                0,
                0,
                0]}
        >
           <ParkGeometry/>
            <shaderMaterial
                ref={shaderMaterial}
                uniforms={
                   {
                        u_time: {value: 0.},
                        u_resolution: {value: new Vector2()},
                        frequency: { type: 'f', value: 0.015 },
                        amplitude: { type: 'f', value: 1.89 },
                        maxDistance: { type: 'f', value: 2.14},
                        isMobile: {type: 'bool', value: false}
                    }
                }
                side={DoubleSide}
                vertexShader={vertex}
                fragmentShader={fragment}
                >
            </shaderMaterial>
        </points>
    )
}
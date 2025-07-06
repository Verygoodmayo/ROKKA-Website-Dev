import vertex from '../../../../static/glsl/home_page/vertex.glsl'
import fragment from '../../../../static/glsl/home_page/fragment.glsl'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';

import { DoubleSide, Vector2 } from 'three'

import ParkGeometry from './ParkGeometry';
import { useGSAP } from '@gsap/react';
import { useIsMobile } from '../../Utils';
import ParkModelAnimationController from './ParkModelAnimationController';

export default function ParkModel() {

    const isMobile = useIsMobile();
    const shaderMaterial = useRef();
    const { camera, size } = useThree();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const animationController = useRef(null);

    // Render Loop
    useFrame(({clock}) => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.u_time) {
            shaderMaterial.current.uniforms.u_time.value = clock.elapsedTime;
        }
    })

    // Initialize uniforms and camera - reset on navigation to home page
    useEffect(() => {
        if (isHomePage && shaderMaterial.current) {
            // Reset to initial state using animation controller if available
            if (animationController.current) {
                animationController.current.reset();
            } else {
                // Fallback: manual reset
                shaderMaterial.current.uniforms.frequency.value = 0.015;
                shaderMaterial.current.uniforms.amplitude.value = 1.89;
                shaderMaterial.current.uniforms.maxDistance.value = 2.14;
                shaderMaterial.current.uniforms.u_time.value = 0;
                shaderMaterial.current.uniforms.u_resolution.value.set(size.width, size.height);
                shaderMaterial.current.uniforms.isMobile.value = isMobile ? 1.0 : 0.0;
                
                // Reset camera to initial position
                camera.position.set(-100, 20, 130);
                camera.rotation.set(0, 0.1, 0);
            }
            
            console.log('Home page initialized - reset camera and uniforms');
        }
    }, [isHomePage, size.width, size.height, isMobile, camera]); // React to navigation and essential changes

    // Cleanup effect for component unmount or navigation away
    useEffect(() => {
        return () => {
            if (animationController.current) {
                animationController.current.cleanup();
                animationController.current = null;
            }
        };
    }, []);

    useGSAP(() => {
        // Only run GSAP animations on the home page
        if (!isHomePage) return;
        
        // Ensure shader material is ready before creating animations
        if (!shaderMaterial.current || !shaderMaterial.current.uniforms) {
            return;
        }

        // Cleanup existing animation controller
        if (animationController.current) {
            animationController.current.cleanup();
        }

        // Create new animation controller with multi-timeline architecture
        animationController.current = new ParkModelAnimationController(
            camera, 
            shaderMaterial.current, 
            {
                isMobile,
                triggerElement: '#park-model-animation-spacer',
                onUpdate: (self) => {
                    // Optional: Add custom update logic
                    // console.log('Animation progress:', self.progress);
                },
                onComplete: () => {
                    console.log('Park model animation sequence complete');
                }
            }
        );

        // Initialize the animation system
        const timelines = animationController.current.init();

        console.log('ParkModel: Multi-timeline animation system initialized', {
            cameraTimeline: timelines.camera,
            shaderTimeline: timelines.shader,
            rotationTimeline: timelines.rotation,
            masterTimeline: timelines.master
        });

        // Cleanup function
        return () => {
            if (animationController.current) {
                animationController.current.cleanup();
                animationController.current = null;
            }
        };
    }, [isHomePage, shaderMaterial.current, isMobile]); // Dependencies for re-initialization

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
                        isMobile: { type: 'f', value: isMobile ? 1.0 : 0.0 }
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
import vertex from '../../../../static/glsl/home_page/vertex.glsl'
import fragment from '../../../../static/glsl/home_page/fragment.glsl'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { DoubleSide, Vector2 } from 'three'

import ParkGeometry from './ParkGeometry';
import { useGSAP } from '@gsap/react';
import useIsMobile from '../../Utils/UseIsMobile';

export default function ParkModel() {

    const isMobile = useIsMobile();
    const shaderMaterial = useRef();
    const { camera, size } = useThree();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const initializedRef = useRef(false);

    // Render Loop
    useFrame(({clock}) => {
        if (shaderMaterial.current && shaderMaterial.current.uniforms.u_time) {
            shaderMaterial.current.uniforms.u_time.value = clock.elapsedTime;
        }
    })

    // Initialize uniforms and camera - reset on navigation to home page
    useEffect(() => {
        if (isHomePage && shaderMaterial.current) {
            // Reset shader uniforms to initial values
            shaderMaterial.current.uniforms.frequency.value = 0.015;
            shaderMaterial.current.uniforms.amplitude.value = 1.89;
            shaderMaterial.current.uniforms.maxDistance.value = 2.14;
            shaderMaterial.current.uniforms.u_time.value = 0;
            shaderMaterial.current.uniforms.u_resolution.value.set(size.width, size.height);
            shaderMaterial.current.uniforms.isMobile.value = isMobile ? 1.0 : 0.0;
            
            // Reset camera to initial position
            camera.position.set(-100, 20, 130);
            camera.rotation.set(0, 0.1, 0);
            
            console.log('Home page initialized - reset camera and uniforms');
        }
    }, [isHomePage, size.width, size.height, isMobile, camera]); // React to navigation and essential changes

    useGSAP(() => {
      // Only run GSAP animations on the home page
      if (!isHomePage) return;
      
      // Ensure shader material is ready before creating animations
      if (!shaderMaterial.current || !shaderMaterial.current.uniforms) {
        return;
      }

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      
      // Expose ScrollTrigger on window for cleanup hooks
      window.ScrollTrigger = ScrollTrigger;
      
      // Kill any existing ScrollTrigger instances for this trigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.id === 'hero-section') {
          trigger.kill();
        }
      });

      // Improved timing for smoother animations
      let firstSectionTime = 3;      // Increased for smoother transitions
      let cameraTransitionTime = 9; // Increased for smoother camera movement
      let secondSectionTime = 5;     // Increased for smoother final section
      
      let timeline = gsap.timeline({
          paused: false,
          scrollTrigger: {
              trigger: '#hero-section',
              start: "top top+=1px",
              end: "bottom+=100% top",
              scrub: 50,        // Reduced scrub for smoother animation (was 10)
              anticipatePin: 1,  // Helps with smooth pinning
              refreshPriority: 0,
              onUpdate: self => {
                // Optional: Add custom smooth easing
                if (self.progress > 0.95) {
                  self.progress = 1;
                }
              }
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
            duration: firstSectionTime,
            ease: "power2.out"    // Smoother easing
          })
          .from(shaderMaterial.current.uniforms.amplitude, {
            value: 2,
            duration: firstSectionTime,
            ease: "power2.out"    // Smoother easing
          }, '<')
          .from(shaderMaterial.current.uniforms.maxDistance, {
            value: 0.32,
            duration: firstSectionTime,
            ease: "power2.out"    // Smoother easing
          }, '<')
          

          .to(camera.position, {
          //   x: 0,
          //   y: -30,
            z: 20,
            duration: cameraTransitionTime,
            ease: "power2.inOut"  // Smoother camera movement
          }, '<')

          .to(shaderMaterial.current.uniforms.frequency, {
            value: 0.036,
            duration: secondSectionTime,
            ease: "power2.inOut"  // Smoother easing
          }, '>-=' + secondSectionTime)
          .to(shaderMaterial.current.uniforms.amplitude, {
            value: 2.,
            duration: secondSectionTime,
            ease: "power2.inOut"  // Smoother easing
          }, '<')
          .to(shaderMaterial.current.uniforms.maxDistance, {
            value: 0.32,
            duration: secondSectionTime,
            ease: "power2.inOut"  // Smoother easing
          }, '<') 
          .to(camera.rotation, {
          //   x: 0,
          //   y: -30,
            y: Math.PI,
            duration: secondSectionTime,
            ease: 'power1.inOut'  // Keep existing camera rotation easing
          }, '>-=' + secondSectionTime / 1.5 )

          return () => {
            timeline.scrollTrigger && timeline.scrollTrigger.kill();
            timeline.kill();
        };
    }, [isHomePage, shaderMaterial]); // Added isHomePage dependency

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
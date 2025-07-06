// Animation Timeline Controller for ParkModel
// Multi-timeline architecture for smooth, balanced animations

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export class ParkModelAnimationController {
    constructor(camera, shaderMaterial, options = {}) {
        this.camera = camera;
        this.shaderMaterial = shaderMaterial;
        this.options = {
            isMobile: false,
            triggerElement: '#hero-section',
            onUpdate: () => {},
            onComplete: () => {},
            ...options
        };

        // Timeline references
        this.timelines = {
            master: null,
            camera: null,
            shader: null,
            rotation: null
        };

        // Animation configuration
        this.config = {
            phases: {
                approach: { start: 0, end: 0.9, duration: 0.9 },      // 0-40%: Camera approach
                transition: { start: 0, end: 0.3, duration: 0.3 },   // 0-75%: Chaos to order (starts at same time as camera)
                rotation: { start: 0.5, end: 0.9, duration: 0.4 }      // 75-100%: Rotation & final chaos
            },
            shaderStates: {
                chaos: {
                    frequency: 0.036,
                    amplitude: 2.0,
                    maxDistance: 0.32
                },
                order: {
                    frequency: 0.015,
                    amplitude: 1.89,
                    maxDistance: 2.14
                }
            },
            cameraPositions: {
                start: { x: -100, y: 20, z: 130 },
                through: { x: -100, y: 20, z: 0 },
                view: { x: -100, y: 20, z: 0 },
                end: { x: -100, y: 20, z: 0 }
            }
        };

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
    }

    // Create camera movement timeline
    createCameraTimeline() {
        const tl = gsap.timeline({ paused: true });
        const { phases, cameraPositions } = this.config;
        
        // Set initial position
        tl.set(this.camera.position, {
            x: cameraPositions.start.x,
            y: cameraPositions.start.y,
            z: cameraPositions.start.z
        }, 0)
        .set(this.camera.rotation, {
            x: 0,
            y: 0.1,
            z: 0
        }, 0)
        
        // Phase 1: Camera flies through model (0-40%)
        .to(this.camera.position, {
            x: cameraPositions.through.x,
            y: cameraPositions.through.y,
            z: cameraPositions.through.z,
            duration: phases.approach.duration,
            ease: "power2.inOut"
        }, 0)
        
        // Phase 2: Position for order view (40-75%)
        .to(this.camera.position, {
            x: cameraPositions.view.x,
            y: cameraPositions.view.y,
            z: cameraPositions.view.z,
            duration: phases.transition.duration - phases.approach.duration,
            ease: "power2.inOut"
        }, phases.approach.end)
        
        // Phase 3: Final positioning (75-100%)
        .to(this.camera.position, {
            x: cameraPositions.end.x,
            y: cameraPositions.end.y,
            z: cameraPositions.end.z,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start);

        return tl;
    }

    // Create shader animation timeline
    createShaderTimeline() {
        const tl = gsap.timeline({ paused: true });
        const { phases, shaderStates } = this.config;
        
        // Phase 1: Start with chaos and IMMEDIATELY begin transition to order (0-75%) - STARTS WITH CAMERA
        tl.set(this.shaderMaterial.uniforms.frequency, { value: shaderStates.chaos.frequency }, 0)
        .set(this.shaderMaterial.uniforms.amplitude, { value: shaderStates.chaos.amplitude }, 0)
        .set(this.shaderMaterial.uniforms.maxDistance, { value: shaderStates.chaos.maxDistance }, 0)
        
        // Phase 2: Smooth transition to order (0-75%) - STARTS AT SAME TIME AS CAMERA MOVEMENT
        .to(this.shaderMaterial.uniforms.frequency, {
            value: shaderStates.order.frequency,
            duration: phases.transition.duration,
            ease: "power2.inOut"
        }, phases.transition.start)
        .to(this.shaderMaterial.uniforms.amplitude, {
            value: shaderStates.order.amplitude,
            duration: phases.transition.duration,
            ease: "power2.inOut"
        }, phases.transition.start)
        .to(this.shaderMaterial.uniforms.maxDistance, {
            value: shaderStates.order.maxDistance,
            duration: phases.transition.duration,
            ease: "power2.inOut"
        }, phases.transition.start)
        
        // Phase 3: Back to chaos (75-100%)
        .to(this.shaderMaterial.uniforms.frequency, {
            value: shaderStates.chaos.frequency,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start)
        .to(this.shaderMaterial.uniforms.amplitude, {
            value: shaderStates.chaos.amplitude,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start)
        .to(this.shaderMaterial.uniforms.maxDistance, {
            value: shaderStates.chaos.maxDistance,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start);

        return tl;
    }

    // Create rotation timeline
    createRotationTimeline() {
        const tl = gsap.timeline({ paused: true });
        const { phases } = this.config;
        
        // Camera rotation in Phase 3 (75-100%)
        tl.to(this.camera.rotation, {
            y: Math.PI * 1.5, // Rotate around Y axis
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start);

        return tl;
    }

    // Create master timeline that controls all others
    createMasterTimeline() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.options.triggerElement,
                start: "top bottom", // Start when spacer comes into view
                end: "bottom top",   // End when spacer exits view
                scrub: 3, // Slightly faster scrub for responsiveness
                anticipatePin: 1,
                refreshPriority: 0,
                onUpdate: (self) => {
                    // Update all sub-timelines based on master progress
                    const progress = self.progress;
                    
                    this.timelines.camera.progress(progress);
                    this.timelines.shader.progress(progress);
                    this.timelines.rotation.progress(progress);
                    
                    this.options.onUpdate(self);
                },
                onComplete: this.options.onComplete
            }
        });

        return tl;
    }

    // Initialize to the starting state of the animation
    initializeToStartState() {
        const { shaderStates, cameraPositions } = this.config;
        
        // Set camera to initial position
        this.camera.position.set(
            cameraPositions.start.x,
            cameraPositions.start.y,
            cameraPositions.start.z
        );
        this.camera.rotation.set(0, 0.1, 0);
        
        // Set shader uniforms to initial CHAOS state
        this.shaderMaterial.uniforms.frequency.value = shaderStates.chaos.frequency;
        this.shaderMaterial.uniforms.amplitude.value = shaderStates.chaos.amplitude;
        this.shaderMaterial.uniforms.maxDistance.value = shaderStates.chaos.maxDistance;
    }

    // Initialize all timelines
    init() {
        // Kill existing ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger && (trigger.trigger.id === 'hero-section' || trigger.trigger.id === 'park-model-animation-spacer')) {
                trigger.kill();
            }
        });

        // Set initial state before creating timelines
        this.initializeToStartState();

        // Create all timelines
        this.timelines.camera = this.createCameraTimeline();
        this.timelines.shader = this.createShaderTimeline();
        this.timelines.rotation = this.createRotationTimeline();
        this.timelines.master = this.createMasterTimeline();

        return this.timelines;
    }

    // Cleanup function
    cleanup() {
        Object.values(this.timelines).forEach(tl => {
            if (tl) {
                tl.scrollTrigger && tl.scrollTrigger.kill();
                tl.kill();
            }
        });
        
        // Clear references
        this.timelines = {
            master: null,
            camera: null,
            shader: null,
            rotation: null
        };
    }

    // Reset to initial state
    reset() {
        const { shaderStates, cameraPositions } = this.config;
        
        // Reset camera
        this.camera.position.set(
            cameraPositions.start.x,
            cameraPositions.start.y,
            cameraPositions.start.z
        );
        this.camera.rotation.set(0, 0.1, 0);
        
        // Reset shader uniforms to initial CHAOS state (not order!)
        this.shaderMaterial.uniforms.frequency.value = shaderStates.chaos.frequency;
        this.shaderMaterial.uniforms.amplitude.value = shaderStates.chaos.amplitude;
        this.shaderMaterial.uniforms.maxDistance.value = shaderStates.chaos.maxDistance;
    }
}

export default ParkModelAnimationController;

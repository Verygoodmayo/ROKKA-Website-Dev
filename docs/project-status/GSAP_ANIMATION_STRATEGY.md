/**
 * GSAP Multi-Timeline Animation Strategy for ParkModel
 * 
 * PROBLEM ANALYSIS:
 * - Current single timeline mixes camera movement, shader uniforms, and timing
 * - Chaos-to-order transition is not smooth
 * - Camera movement doesn't start from first scroll
 * - Timing is unbalanced between different animation phases
 * 
 * SOLUTION: Multi-Timeline Architecture
 * 
 * 1. SEPARATE TIMELINES FOR EACH ANIMATION ASPECT:
 *    - Camera Timeline: Pure camera movement and rotation
 *    - Shader Timeline: Pure shader uniform animations (chaos/order)
 *    - Master Timeline: Coordinates and synchronizes all timelines
 * 
 * 2. ANIMATION PHASES:
 *    Phase 1 (0-33%): Camera flies through model + Initial chaos
 *    Phase 2 (33-66%): Chaos to order transition + Camera positioning
 *    Phase 3 (66-100%): Camera rotation + Order back to chaos
 * 
 * 3. SCROLL TRIGGER SETUP:
 *    - Single scroll trigger controls master timeline
 *    - Master timeline controls progress of all sub-timelines
 *    - Better scrub control for smooth animation
 * 
 * 4. UNIFORM ANIMATION STRATEGY:
 *    - frequency: Controls wave frequency (higher = more chaos)
 *    - amplitude: Controls wave intensity (higher = more movement)
 *    - maxDistance: Controls effect radius (lower = more focused)
 * 
 * 5. CAMERA MOVEMENT STRATEGY:
 *    - Start: Far back (-100, 20, 130)
 *    - Phase 1: Fly through (0, 0, 20) - Close to model
 *    - Phase 2: Position for order view (0, -30, 50) - Good angle
 *    - Phase 3: Rotate around model while moving back
 * 
 * 6. TIMING DISTRIBUTION:
 *    - Phase 1: 40% of scroll (0-40%) - Camera approach
 *    - Phase 2: 35% of scroll (40-75%) - Chaos to order
 *    - Phase 3: 25% of scroll (75-100%) - Rotation and chaos return
 */

// IMPLEMENTATION STRUCTURE:

export const createAnimationTimelines = (camera, shaderMaterial, options = {}) => {
    const {
        isMobile = false,
        triggerElement = '#hero-section',
        onUpdate = () => {},
        onComplete = () => {}
    } = options;

    // Timeline References
    const timelines = {
        master: null,
        camera: null,
        shader: null,
        rotation: null
    };

    // Animation Phases Configuration
    const phases = {
        approach: { start: 0, end: 0.4, duration: 0.4 },      // 0-40%
        transition: { start: 0.4, end: 0.75, duration: 0.35 }, // 40-75%
        rotation: { start: 0.75, end: 1, duration: 0.25 }      // 75-100%
    };

    // Shader States
    const shaderStates = {
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
    };

    // Camera Positions
    const cameraPositions = {
        start: { x: -100, y: 20, z: 130 },
        through: { x: 0, y: 0, z: 20 },
        view: { x: 0, y: -30, z: 50 },
        end: { x: -50, y: 10, z: 80 }
    };

    // Create Individual Timelines
    const createCameraTimeline = () => {
        const tl = gsap.timeline({ paused: true });
        
        // Phase 1: Camera flies through model
        tl.to(camera.position, {
            x: cameraPositions.through.x,
            y: cameraPositions.through.y,
            z: cameraPositions.through.z,
            duration: phases.approach.duration,
            ease: "power2.inOut"
        }, 0)
        
        // Phase 2: Position for order view
        .to(camera.position, {
            x: cameraPositions.view.x,
            y: cameraPositions.view.y,
            z: cameraPositions.view.z,
            duration: phases.transition.duration,
            ease: "power2.inOut"
        }, phases.transition.start)
        
        // Phase 3: Final positioning with rotation
        .to(camera.position, {
            x: cameraPositions.end.x,
            y: cameraPositions.end.y,
            z: cameraPositions.end.z,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start);

        return tl;
    };

    const createShaderTimeline = () => {
        const tl = gsap.timeline({ paused: true });
        
        // Phase 1: Start with chaos
        tl.set(shaderMaterial.uniforms.frequency, { value: shaderStates.chaos.frequency }, 0)
        .set(shaderMaterial.uniforms.amplitude, { value: shaderStates.chaos.amplitude }, 0)
        .set(shaderMaterial.uniforms.maxDistance, { value: shaderStates.chaos.maxDistance }, 0)
        
        // Phase 2: Transition to order
        .to(shaderMaterial.uniforms.frequency, {
            value: shaderStates.order.frequency,
            duration: phases.transition.duration,
            ease: "power2.inOut"
        }, phases.transition.start)
        .to(shaderMaterial.uniforms.amplitude, {
            value: shaderStates.order.amplitude,
            duration: phases.transition.duration,
            ease: "power2.inOut"
        }, phases.transition.start)
        .to(shaderMaterial.uniforms.maxDistance, {
            value: shaderStates.order.maxDistance,
            duration: phases.transition.duration,
            ease: "power2.inOut"
        }, phases.transition.start)
        
        // Phase 3: Back to chaos
        .to(shaderMaterial.uniforms.frequency, {
            value: shaderStates.chaos.frequency,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start)
        .to(shaderMaterial.uniforms.amplitude, {
            value: shaderStates.chaos.amplitude,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start)
        .to(shaderMaterial.uniforms.maxDistance, {
            value: shaderStates.chaos.maxDistance,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start);

        return tl;
    };

    const createRotationTimeline = () => {
        const tl = gsap.timeline({ paused: true });
        
        // Camera rotation in Phase 3
        tl.to(camera.rotation, {
            y: Math.PI * 2,
            duration: phases.rotation.duration,
            ease: "power2.inOut"
        }, phases.rotation.start);

        return tl;
    };

    const createMasterTimeline = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                anticipatePin: 1,
                refreshPriority: 0,
                onUpdate: (self) => {
                    // Update all sub-timelines based on master progress
                    const progress = self.progress;
                    
                    timelines.camera.progress(progress);
                    timelines.shader.progress(progress);
                    timelines.rotation.progress(progress);
                    
                    onUpdate(self);
                },
                onComplete: onComplete
            }
        });

        return tl;
    };

    // Initialize all timelines
    const init = () => {
        timelines.camera = createCameraTimeline();
        timelines.shader = createShaderTimeline();
        timelines.rotation = createRotationTimeline();
        timelines.master = createMasterTimeline();

        return timelines;
    };

    // Cleanup function
    const cleanup = () => {
        Object.values(timelines).forEach(tl => {
            if (tl) {
                tl.scrollTrigger && tl.scrollTrigger.kill();
                tl.kill();
            }
        });
    };

    return {
        init,
        cleanup,
        timelines,
        phases,
        shaderStates,
        cameraPositions
    };
};

// USAGE EXAMPLE:
/*
const animationController = createAnimationTimelines(camera, shaderMaterial, {
    isMobile,
    triggerElement: '#hero-section',
    onUpdate: (self) => {
        console.log('Animation progress:', self.progress);
    },
    onComplete: () => {
        console.log('Animation complete');
    }
});

const timelines = animationController.init();

// Cleanup when component unmounts
return () => {
    animationController.cleanup();
};
*/

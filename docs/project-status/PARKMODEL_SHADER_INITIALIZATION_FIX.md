# ParkModel Shader Initialization Fix

## Issue Description
When the home page loads, the ParkModel was not displaying in the initial chaos state. While the camera position was correct, the shader uniforms were not being set to the proper initial state, causing the animation to start from the wrong visual state.

## Root Cause Analysis
The issue was in the `reset()` method of `ParkModelAnimationController.js`. The shader uniforms were being incorrectly initialized to the **order** state instead of the **chaos** state:

```javascript
// INCORRECT - was setting to order state
this.shaderMaterial.uniforms.frequency.value = shaderStates.order.frequency;
this.shaderMaterial.uniforms.amplitude.value = shaderStates.order.amplitude;
this.shaderMaterial.uniforms.maxDistance.value = shaderStates.order.maxDistance;
```

However, the animation timeline correctly starts with the chaos state:
```javascript
// CORRECT - timeline starts with chaos
tl.set(this.shaderMaterial.uniforms.frequency, { value: shaderStates.chaos.frequency }, 0)
.set(this.shaderMaterial.uniforms.amplitude, { value: shaderStates.chaos.amplitude }, 0)
.set(this.shaderMaterial.uniforms.maxDistance, { value: shaderStates.chaos.maxDistance }, 0)
```

## Solution Implemented

### 1. Fixed Reset Method
Updated the `reset()` method to properly initialize shader uniforms to the **chaos** state:

```javascript
// Reset shader uniforms to initial CHAOS state (not order!)
this.shaderMaterial.uniforms.frequency.value = shaderStates.chaos.frequency;
this.shaderMaterial.uniforms.amplitude.value = shaderStates.chaos.amplitude;
this.shaderMaterial.uniforms.maxDistance.value = shaderStates.chaos.maxDistance;
```

### 2. Added initializeToStartState Method
Created a dedicated method to ensure consistent initialization:

```javascript
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
```

### 3. Updated Initialization Flow
Modified the `init()` method to call `initializeToStartState()` before creating timelines:

```javascript
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
```

### 4. Enhanced Cleanup
Updated the ScrollTrigger cleanup to handle both the old and new trigger elements:

```javascript
// Kill existing ScrollTrigger instances
ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger && (trigger.trigger.id === 'hero-section' || trigger.trigger.id === 'park-model-animation-spacer')) {
        trigger.kill();
    }
});
```

## Animation States Comparison

### Chaos State (Initial - Correct)
- **Frequency**: 0.036 (higher frequency = more chaotic)
- **Amplitude**: 2.0 (higher amplitude = more displacement)
- **MaxDistance**: 0.32 (smaller max distance = more contained chaos)

### Order State (Should transition to)
- **Frequency**: 0.015 (lower frequency = more ordered)
- **Amplitude**: 1.89 (lower amplitude = less displacement)
- **MaxDistance**: 2.14 (larger max distance = more spread out)

## Expected Behavior Now

1. **Page Load**: ParkModel appears in chaos state (visually chaotic/displaced geometry)
2. **Scroll Start**: Animation begins with chaos state already visible
3. **Scroll Progress**: Smooth transition from chaos to order as user scrolls
4. **Scroll End**: Returns to chaos state during rotation phase

## Benefits

- ✅ **Consistent Visual State**: ParkModel always loads in the correct initial chaos state
- ✅ **Smooth Animation Flow**: No jarring jumps between states
- ✅ **Proper Timeline Synchronization**: Initial state matches timeline expectations
- ✅ **Better User Experience**: Animation feels more natural and intentional

## Testing Verification

- [x] Home page loads with ParkModel in chaos state
- [x] Camera position is correct (-100, 20, 130)
- [x] Shader uniforms match chaos values
- [x] Scroll animation transitions smoothly from chaos to order
- [x] Build successful with no errors

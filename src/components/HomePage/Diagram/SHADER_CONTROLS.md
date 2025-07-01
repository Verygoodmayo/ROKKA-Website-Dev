# Shader Controls Documentation

## Overview
The IcoBufferMesh component now accepts configurable shader parameters that allow you to control the visual appearance of the particle effects used as backgrounds in the diagram cards.

## Available Shader Parameters

### Core Noise Controls
- **`frequency`** (default: 0.175)
  - Controls the frequency of the noise pattern
  - Higher values = more detailed/busy patterns
  - Lower values = smoother, larger patterns

- **`amplitude`** (default: 3.5)
  - Controls the intensity of particle displacement
  - Higher values = more dramatic movement
  - Lower values = subtle movement

- **`maxDistance`** (default: 2.85)
  - Maximum distance particles can move from their original position
  - Controls the overall "spread" of the effect

### Advanced Noise Controls
- **`noiseScale`** (default: 1.0)
  - Scales the overall noise calculation
  - Affects the complexity of the pattern

- **`noiseDensity`** (default: 1.0)
  - Controls how dense/sparse the noise pattern appears
  - Higher values = more dense patterns
  - Lower values = more sparse patterns

- **`noiseOctaves`** (default: 3.0)
  - Number of noise layers combined for complexity
  - Higher values = more detailed, complex noise
  - Lower values = simpler, smoother noise
  - Range: 1.0 - 6.0 recommended

- **`noiseLacunarity`** (default: 2.0)
  - How much detail is added with each noise octave
  - Higher values = more dramatic detail addition
  - Lower values = subtle detail progression
  - Range: 1.5 - 3.0 recommended

- **`noiseGain`** (default: 0.5)
  - How much each octave contributes to the final result
  - Higher values = more influence from detail layers
  - Lower values = smoother, less chaotic patterns
  - Range: 0.3 - 0.8 recommended

- **`turbulenceStrength`** (default: 1.0)
  - Strength of turbulence/chaos in the pattern
  - Higher values = more chaotic, swirling motion
  - Lower values = calmer, more organized flow
  - Range: 0.5 - 2.0 recommended

- **`flowDirection`** (default: 0.0)
  - Direction bias for flow patterns (in degrees)
  - 0.0 = no directional bias
  - 90.0 = upward flow, 180.0 = leftward flow, etc.
  - Range: 0.0 - 360.0

- **`waveSpeed`** (default: 1.0)
  - Speed multiplier for wave-like motion
  - Higher values = faster wave propagation
  - Lower values = slower, more meditative waves
  - Range: 0.1 - 3.0 recommended

- **`distortionStrength`** (default: 1.0)
  - Overall strength of all distortion effects
  - Master control for visual intensity
  - Higher values = more dramatic effects
  - Lower values = subtle, refined effects
  - Range: 0.5 - 2.0 recommended

### Visual Controls
- **`particleSize`** (default: 1.0)
  - Controls the size of individual particles
  - Useful for creating different visual weights between cards

- **`colorIntensity`** (default: 1.0)
  - Controls the intensity of particle colors
  - Higher values = brighter/more vibrant
  - Lower values = more subdued

### Animation Controls
- **`timeSpeed`** (default: 0.5)
  - Controls the speed of animation
  - Higher values = faster animation
  - Lower values = slower, more subtle animation

### Interaction Controls
- **`mouseInfluenceStrength`** (default: 1.0)
  - Controls how much mouse movement affects the particles
  - 0.0 = no mouse influence
  - Higher values = stronger mouse interaction

- **`particleColor`** (default: [1.0, 1.0, 1.0])
  - RGB color array [r, g, b] to control particle color
  - Values from 0.0 to 1.0 for each color channel
  - Examples: [1.0, 1.0, 1.0] = white, [0.2, 0.6, 1.0] = blue, [1.0, 0.5, 0.2] = orange
  - Allows full control over particle color schemes

## Current Card Configurations

### Field Card
```javascript
field: {
    frequency: 0.175,
    amplitude: 3.5,
    maxDistance: 2.85,
    timeSpeed: 0.5,
    noiseScale: 1.0,
    noiseDensity: 1.2,
    particleSize: 1.0,
    colorIntensity: 1.0,
    mouseInfluenceStrength: 0.0,
    particleColor: [1.0, 1.0, 1.0], // Warm white
    // Advanced noise controls
    noiseOctaves: 3.0,
    noiseLacunarity: 2.0,
    noiseGain: 0.5,
    turbulenceStrength: 0.8,
    flowDirection: 0.0,
    waveSpeed: 1.0,
    distortionStrength: 1.0
}
```

### Role Card
```javascript
role: {
    frequency: 0.2,        // Slightly more detailed
    amplitude: 4.0,        // More dramatic movement
    maxDistance: 3.0,      // Larger spread
    timeSpeed: 0.3,        // Slower animation
    noiseScale: 1.2,       // More complex noise
    noiseDensity: 0.8,     // Less dense
    particleSize: 1.1,     // Slightly larger particles
    colorIntensity: 0.9,   // Slightly dimmer
    mouseInfluenceStrength: 0.0,
    particleColor: [0.95, 1.0, 0.98], // Cool white
    // Advanced noise controls
    noiseOctaves: 4.0,
    noiseLacunarity: 2.2,
    noiseGain: 0.6,
    turbulenceStrength: 1.2,
    flowDirection: 45.0,
    waveSpeed: 0.8,
    distortionStrength: 1.1
}
```

### Technology Card
```javascript
technology: {
    frequency: 0.15,       // Smoother pattern
    amplitude: 2.8,        // Less dramatic
    maxDistance: 2.5,      // Tighter spread
    timeSpeed: 0.7,        // Faster animation
    noiseScale: 0.8,       // Simpler noise
    noiseDensity: 1.5,     // More dense
    particleSize: 0.9,     // Smaller particles
    colorIntensity: 1.2,   // Brighter
    mouseInfluenceStrength: 0.0,
    particleColor: [0.2, 0.6, 1.0], // Blue/cyan color
    // Advanced noise controls
    noiseOctaves: 2.0,
    noiseLacunarity: 1.8,
    noiseGain: 0.4,
    turbulenceStrength: 0.6,
    flowDirection: 90.0,
    waveSpeed: 1.5,
    distortionStrength: 0.9
}
```

### Opportunities Card
```javascript
opportunities: {
    frequency: 0.22,       // Most detailed
    amplitude: 3.2,        // Moderate movement
    maxDistance: 2.7,      // Medium spread
    timeSpeed: 0.4,        // Slow animation
    noiseScale: 1.1,       // Complex noise
    noiseDensity: 1.0,     // Balanced density
    particleSize: 1.05,    // Slightly larger
    colorIntensity: 0.95,  // Balanced brightness
    mouseInfluenceStrength: 0.0,
    particleColor: [1.0, 0.85, 0.6], // Warm orange/gold
    // Advanced noise controls
    noiseOctaves: 5.0,
    noiseLacunarity: 2.5,
    noiseGain: 0.7,
    turbulenceStrength: 1.4,
    flowDirection: 270.0,
    waveSpeed: 0.6,
    distortionStrength: 1.3
}
```

## Usage Example

To modify shader parameters for a specific card, update the corresponding configuration in the `shaderConfigs` object in `Diagram.jsx`:

```javascript
const shaderConfigs = {
    field: {
        frequency: 0.2,        // Make it more detailed
        amplitude: 5.0,        // Make it more dramatic
        timeSpeed: 1.0,        // Make it faster
        particleColor: [0.8, 0.2, 1.0], // Purple particles
        // ... other parameters
    }
    // ... other cards
};
```

## Color Examples

Here are some example color configurations:
- **White**: `[1.0, 1.0, 1.0]`
- **Blue/Cyan**: `[0.2, 0.6, 1.0]`
- **Orange**: `[1.0, 0.5, 0.2]`
- **Purple**: `[0.8, 0.2, 1.0]`
- **Green**: `[0.2, 1.0, 0.4]`
- **Red**: `[1.0, 0.3, 0.3]`
- **Warm White**: `[1.0, 0.98, 0.95]`
- **Cool White**: `[0.95, 1.0, 0.98]`

## Design Philosophy

Each card type has a distinct visual personality with consistent color scheme:
- **Field Card**: Balanced and foundational with pure white particles (no mouse interaction)
- **Role Card**: Dynamic with more movement and pure white particles (no mouse interaction)  
- **Technology Card**: Sharp and precise with pure white particles (no mouse interaction)
- **Opportunities Card**: Detailed and engaging with blue particles (no mouse interaction)

The parameters are tuned to create visual hierarchy and help users distinguish between different types of content while maintaining overall cohesion. The color scheme emphasizes the opportunities card as the final destination with blue particles, while keeping all other cards uniform with white particles. Mouse interaction has been disabled for all cards to provide a clean, consistent experience.

## Implementation Status

✅ **Fully Implemented**: All shader controls are now implemented in both JavaScript and GLSL
✅ **Vertex Shader**: Enhanced with multi-octave noise, flow direction, mouse interaction, and turbulence
✅ **Fragment Shader**: Updated with color intensity and improved blue particle rendering
✅ **Real-time Control**: All parameters update in real-time from the Diagram component

## Recent Updates

### Latest: Particle Color Control (v2.0)
- ✅ **Replaced `blueParticles` boolean** with flexible `particleColor` RGB array
- ✅ **Full color control**: Each card can now have any color scheme
- ✅ **Enhanced visual distinction**: Each card type has unique colors
- ✅ **Simplified shader logic**: Single color uniform instead of conditional logic

### Vertex Shader Enhancements:
- ✅ Added multi-octave fractal brownian motion (FBM) noise
- ✅ Implemented flow direction control (0-360 degrees)
- ✅ Enhanced mouse interaction with configurable strength
- ✅ Added turbulence strength for chaos control
- ✅ Implemented wave speed for time-based animation
- ✅ Added distortion strength as master intensity control
- ✅ Particle size now properly controlled via uniform

### Fragment Shader Enhancements:
- ✅ Added color intensity control for brightness/contrast
- ✅ **NEW**: Direct RGB color control via `particleColor` uniform
- ✅ Added subtle gradient effects based on mouse position
- ✅ Enhanced color schemes for better visual distinction

## Technical Implementation

The shader system now uses:
1. **Multi-layered noise**: Combines curl noise with FBM for complex patterns
2. **Directional flow**: Flow direction creates biased movement patterns
3. **Mouse interaction**: Real-time response to mouse position
4. **Temporal animation**: Wave speed controls time-based evolution
5. **Scalable complexity**: Noise octaves add controllable detail levels

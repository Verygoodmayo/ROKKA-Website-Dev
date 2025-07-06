# PILA Mouse Coordinate System Resolution

## Problem Identified
The original mouse tracking system had a coordinate system mismatch between:
1. **Mouse Position Calculation**: Normalized coordinates [0,1] from canvas events
2. **Shader Coordinate Mapping**: Converting mouse position to 3D world space
3. **Vertex Screen Position**: Screen-space coordinates used for distance calculations

## Root Cause Analysis
The issue was in the vertex shader's approach to mapping mouse coordinates to 3D world space. The original implementation used:
- Simple screen-space distance calculation between vertex projection and mouse position
- Basic coordinate transformation that didn't account for camera projection properly
- Inconsistent coordinate systems between screen space and world space

## Solution Implemented

### 1. Enhanced Mouse Event Handling (IcoBufferMesh.jsx)
```javascript
// Improved canvas targeting and coordinate clamping
const canvas = e.target.closest('canvas') || document.querySelector('canvas');
const rect = canvas.getBoundingClientRect();
const normalizedX = (e.clientX - rect.left) / rect.width;
const normalizedY = 1 - (e.clientY - rect.top) / rect.height; // inverted for GL coords

// Clamped to [0,1] range to prevent coordinates outside canvas
mouse.current.x = Math.max(0, Math.min(1, normalizedX));
mouse.current.y = Math.max(0, Math.min(1, normalizedY));
```

### 2. Advanced Coordinate Mapping (vertex.glsl)
```glsl
// Advanced coordinate mapping using camera projection
// First, get the vertex position in screen space
vec4 screenPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
vec2 screenCoord = (screenPos.xy / screenPos.w) * 0.5 + 0.5; // Convert to [0,1] range

// Convert mouse position to normalized device coordinates [-1, 1]
vec2 mouseNDC = (u_mouse * 2.0) - 1.0;

// Calculate distance in screen space for order influence
float screenDistance = length(screenCoord - u_mouse);

// Create order influence based on screen distance
float orderInfluence = 1.0 - smoothstep(0.0, mouseOrderRadius, screenDistance);
orderInfluence = pow(orderInfluence, 2.0) * mouseOrderStrength;

// MOUSE ATTRACTION VECTOR - Using inverse projection for accurate 3D mapping
// Create a 3D position from mouse coordinates at the same Z-depth as the vertex
vec4 mouseClipPos = vec4(mouseNDC, screenPos.z / screenPos.w, 1.0);
vec4 mouseViewPos = inverse(projectionMatrix) * mouseClipPos;
mouseViewPos /= mouseViewPos.w;
vec4 mouseWorldPos = inverse(modelViewMatrix) * mouseViewPos;

// Calculate attraction toward mouse position
vec3 mouseDirection = normalize(mouseWorldPos.xyz - position);
float mouseDistance = length(mouseWorldPos.xyz - position);

// Create attraction force that pulls particles toward cursor
float attractionStrength = orderInfluence * 6.0; // Strong attraction
vec3 mouseAttraction = mouseDirection * attractionStrength * (1.0 / (1.0 + mouseDistance * 0.001));
```

## Key Improvements

### 1. **Proper Canvas Targeting**
- Target canvas element specifically rather than any event target
- Robust error handling for mouse events
- Coordinate clamping to prevent out-of-bounds values

### 2. **Accurate 3D Projection**
- Use inverse projection matrix to convert screen coordinates to world space
- Account for camera position and projection properly
- Maintain consistent coordinate system throughout the pipeline

### 3. **Enhanced Distance Calculations**
- Screen-space distance for order influence determination
- World-space distance for attraction force calculations
- Proper scaling factors that match the icosahedron geometry (radius ~100)

### 4. **Improved Attraction Force**
- Stronger attraction strength (6.0) for more dramatic effect
- Better distance falloff calculation (0.001 factor)
- More responsive mouse order radius (0.4)

## Results
The coordinate system now properly maps mouse position to 3D world space, ensuring:
- ✅ Mouse cursor position accurately corresponds to particle attraction
- ✅ Curl noise distortion is pulled toward the actual mouse location
- ✅ Effect is spatially intuitive and responsive
- ✅ No more coordinate system mismatch between screen and world space

## Technical Notes
- The solution uses inverse projection matrices for accurate coordinate transformation
- Both screen space and world space calculations are used for different aspects of the effect
- The approach is compatible with different camera positions and projections
- Performance impact is minimal as calculations are done per-vertex in the shader

## Configuration
Current PILA shader configuration optimized for mouse-attracted curl noise:
- `mouseOrderRadius: 0.4` - Larger influence radius
- `mouseOrderStrength: 2.0` - Strong ordering effect
- `chaosStrength: 1.0` - Balanced base chaos
- `mouseInfluenceStrength: 3.5` - Strong mouse influence

This implementation provides a robust, accurate mouse tracking system for the PILA page's Three.js sketch with proper coordinate system alignment.

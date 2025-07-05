uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Mouse interaction controls for chaos-to-order effect
uniform float mouseOrderRadius;
uniform float mouseOrderStrength;
uniform float chaosStrength;

// Core animation controls
uniform float frequency;
uniform float amplitude;
uniform float maxDistance;

// Advanced noise controls
uniform float noiseScale;
uniform float noiseDensity;
uniform float noiseOctaves;
uniform float noiseLacunarity;
uniform float noiseGain;
uniform float turbulenceStrength;
uniform float flowDirection;
uniform float waveSpeed;
uniform float distortionStrength;

// Visual controls
uniform float particleSize;
uniform float colorIntensity;

// Distance fade controls
uniform float nearFadeDistance;
uniform float farFadeDistance;

// Legacy
uniform bool isMobile;
uniform sampler2D uPositions;

varying vec2 vUv;
varying vec3 vPosition;
attribute vec2 reference;

out vec3 vertexPosition;
out vec2 textureCoord;
out float distToCamera;

float PI = 3.141592653589793238;

float rand(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p, float freq ){
    float unit = 1./freq;
    vec2 ij = floor(p/unit);
    vec2 xy = mod(p,unit)/unit;
    xy = .5*(1.-cos(PI*xy));
    float a = rand((ij+vec2(0.,0.)));
    float b = rand((ij+vec2(1.,0.)));
    float c = rand((ij+vec2(0.,1.)));
    float d = rand((ij+vec2(1.,1.)));
    float x1 = mix(a, b, xy.x);
    float x2 = mix(c, d, xy.x);
    return mix(x1, x2, xy.y);
}

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float noise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                    -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    // Other corners
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Enhanced curl noise function with advanced controls
vec3 curl(float x, float y, float z) {
    float eps = 1.0 / noiseDensity, eps2 = 2.0 * eps;
    float n1, n2, a, b;

    // Apply time-based animation with wave speed control
    float timeOffset = u_time * waveSpeed * 0.05;
    x += timeOffset;
    y += timeOffset;
    z += timeOffset;

    // Apply flow direction (convert degrees to radians)
    float flowRad = flowDirection * PI / 180.0;
    vec2 flowVec = vec2(cos(flowRad), sin(flowRad)) * 0.1;
    x += flowVec.x * u_time * waveSpeed;
    y += flowVec.y * u_time * waveSpeed;

    // Scale noise coordinates
    x *= noiseScale;
    y *= noiseScale;
    z *= noiseScale;

    vec3 curl = vec3(0.0);

    // Compute curl with turbulence strength
    n1 = noise(vec2(x, y + eps));
    n2 = noise(vec2(x, y - eps));
    a = (n1 - n2) / eps2;

    n1 = noise(vec2(x, z + eps));
    n2 = noise(vec2(x, z - eps));
    b = (n1 - n2) / eps2;

    curl.x = (a - b) * turbulenceStrength;

    n1 = noise(vec2(y, z + eps));
    n2 = noise(vec2(y, z - eps));
    a = (n1 - n2) / eps2;

    n1 = noise(vec2(x + eps, z));
    n2 = noise(vec2(x - eps, z));
    b = (n1 - n2) / eps2;

    curl.y = (a - b) * turbulenceStrength;

    n1 = noise(vec2(x + eps, y));
    n2 = noise(vec2(x - eps, y));
    a = (n1 - n2) / eps2;

    n1 = noise(vec2(y + eps, z));
    n2 = noise(vec2(y - eps, z));
    b = (n1 - n2) / eps2;

    curl.z = (a - b) * turbulenceStrength;

    return curl;
}

// Multi-octave noise function
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude_local = noiseGain;
    float frequency_local = 1.0;
    
    for (int i = 0; i < int(noiseOctaves); i++) {
        value += amplitude_local * noise(p * frequency_local);
        p *= noiseLacunarity;
        amplitude_local *= noiseGain;
    }
    return value;
}

// Calculate mouse influence for chaos-to-order effect
float calculateMouseInfluence(vec3 position) {
    // Transform vertex position to screen space for mouse comparison
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 projPosition = projectionMatrix * mvPosition;
    
    // Convert to normalized device coordinates (-1 to 1)
    vec2 ndc = projPosition.xy / projPosition.w;
    
    // Convert to screen coordinates (0 to 1)
    vec2 screenPos = ndc * 0.5 + 0.5;
    
    // Mouse position is already in [0,1] screen coordinates
    vec2 mousePos = u_mouse;
    
    // Calculate distance from vertex to mouse position in screen space
    float dist = distance(screenPos, mousePos);
    
    // Create smooth falloff from mouse position
    float influence = 1.0 - smoothstep(0.0, mouseOrderRadius, dist);
    
    return influence;
}

void main() {
    vUv = reference;
    vPosition = position;

    vec4 cs_position = modelViewMatrix * vec4(position, 1.0);
    distToCamera = -cs_position.z;

    vec3 newPos = position;
    
    // Calculate mouse influence (0 = chaos, 1 = order)
    float mouseInfluence = calculateMouseInfluence(position);
    
    // CHAOS: Enhanced noise calculation with multiple octaves
    vec3 chaosNoisePos = newPos * frequency * noiseScale;
    vec3 chaosCurlForce = curl(chaosNoisePos.x, chaosNoisePos.y, chaosNoisePos.z);
    
    // Add FBM noise for additional complexity in chaos
    float chaosFbmNoise = fbm(chaosNoisePos.xy + u_time * waveSpeed * 0.1);
    chaosCurlForce += vec3(chaosFbmNoise) * 0.8;
    
    // Apply chaos strength
    vec3 chaosTarget = position + chaosCurlForce * amplitude * chaosStrength * distortionStrength;
    
    // ORDER: Minimal distortion for ordered state
    vec3 orderNoisePos = newPos * frequency * 0.1; // Much smaller frequency for order
    vec3 orderCurlForce = curl(orderNoisePos.x, orderNoisePos.y, orderNoisePos.z);
    vec3 orderTarget = position + orderCurlForce * amplitude * 0.1; // Much smaller amplitude for order
    
    // Blend between chaos and order based on mouse proximity
    vec3 blendedTarget = mix(chaosTarget, orderTarget, mouseInfluence * mouseOrderStrength);
    
    // Apply final distance-based mixing
    float d = length(position - blendedTarget) / maxDistance;
    vec3 finalPos = mix(position, blendedTarget, pow(d, 5.0));

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    
    // DISTANCE-BASED PARTICLE SIZE
    // Closer particles appear larger, farther particles appear smaller
    float distanceScale = 1.0 - smoothstep(nearFadeDistance, farFadeDistance, -mvPosition.z);
    distanceScale = 0.3 + distanceScale * 0.7; // Scale between 0.3 and 1.0
    
    // Apply particle size control with distance scaling
    gl_PointSize = particleSize * distanceScale * (1.0 / -mvPosition.z);
    if (isMobile) {
        gl_PointSize = particleSize * 2.0 * distanceScale * (1.0 / -mvPosition.z);
    }
    
    gl_Position = projectionMatrix * mvPosition;
}

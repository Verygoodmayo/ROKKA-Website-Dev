uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_mouseInfluence;

// Mouse click uniforms
uniform vec4 u_mouseClick; // x, y, time, active
uniform float u_clickInfluence;
uniform float u_clickWaveSpeed;
uniform float u_clickDecayRate;

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

// Chaos-to-order effect uniforms
uniform float mouseOrderRadius;
uniform float mouseOrderStrength;
uniform float chaosStrength;

// Visual controls
uniform float particleSize;
uniform float colorIntensity;

varying vec2 vUv;
attribute vec2 reference;

float PI = 3.141592653589793238;
uniform bool isMobile;

float rand(vec2 c){
return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p, float freq ){
float unit = 1./freq;
vec2 ij = floor(p/unit);
vec2 xy = mod(p,unit)/unit;
//xy = 3.*xy*xy-2.*xy*xy*xy;
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

float noise(vec2 v)
{
const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                    0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                -0.577350269189626,  // -1.0 + 2.0 * C.x
                    0.024390243902439); // 1.0 / 41.0
// First corner
vec2 i  = floor(v + dot(v, C.yy) );
vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
vec2 i1;
//i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
//i1.y = 1.0 - i1.x;
i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
// x0 = x0 - 0.0 + 0.0 * C.xx ;
// x1 = x0 - i1 + 1.0 * C.xx ;
// x2 = x0 - 1.0 + 2.0 * C.xx ;
vec4 x12 = x0.xyxy + C.xxzz;
x12.xy -= i1;

// Permutations
i = mod289(i); // Avoid truncation effects in permutation
vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
m = m*m ;
m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

vec3 x = 2.0 * fract(p * C.www) - 1.0;
vec3 h = abs(x) - 0.5;
vec3 ox = floor(x + 0.5);
vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
vec3 g;
g.x  = a0.x  * x0.x  + h.x  * x0.y;
g.yz = a0.yz * x12.xz + h.yz * x12.yw;
return 130.0 * dot(m, g);
}

// Enhanced curl noise function with advanced controls
vec3 curl(float x, float y, float z)
{
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

// Calculate mouse click wave effect
vec3 calculateClickEffect(vec3 position) {
    if (u_mouseClick.w < 0.5) return vec3(0.0); // Not active
    
    // Convert screen space click position to 3D space
    vec2 clickPos = u_mouseClick.xy;
    vec3 clickPos3D = vec3((clickPos.x - 0.5) * 2.0, (clickPos.y - 0.5) * 2.0, 0.0);
    
    // Calculate distance from vertex to click position
    float dist = distance(position.xy, clickPos3D.xy);
    
    // Use u_mouseClick.z directly as time since click (it's managed by the component)
    float timeSinceClick = u_mouseClick.z;
    
    // Create expanding wave effect
    float waveRadius = timeSinceClick * u_clickWaveSpeed;
    float waveThickness = 0.3; // How thick the wave is
    
    // Calculate wave intensity (peaks at the wave front)
    float waveIntensity = 1.0 - abs(dist - waveRadius) / waveThickness;
    waveIntensity = max(0.0, waveIntensity);
    
    // Apply decay over time
    float decay = exp(-timeSinceClick * u_clickDecayRate);
    waveIntensity *= decay;
    
    // Calculate direction from click to vertex
    vec3 direction = normalize(position - clickPos3D);
    
    // Apply wave effect
    return direction * waveIntensity * u_clickInfluence;
}

void main() {
    vUv = reference;

    vec3 newPos = position;

    // **ENHANCED MOUSE-ATTRACTED CURL NOISE EFFECT**
    // Calculate mouse influence using screen space coordinates
    vec4 screenPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec2 screenCoord = (screenPos.xy / screenPos.w) * 0.5 + 0.5; // Convert to [0,1] range
    
    // Calculate distance from vertex to mouse position (both in [0,1] range)
    vec2 mousePos = u_mouse;
    float distanceToMouse = length(screenCoord - mousePos);
    
    // Create smooth order field around mouse with stronger influence
    float orderInfluence = 1.0 - smoothstep(0.0, mouseOrderRadius, distanceToMouse);
    orderInfluence = pow(orderInfluence, 2.0) * mouseOrderStrength; // Square for more pronounced effect
    
    // MOUSE ATTRACTION VECTOR - Simple world space mapping
    // Convert mouse position from [0,1] to world space coordinates
    vec3 mousePos3D = vec3((mousePos.x - 0.5) * 120.0, (mousePos.y - 0.5) * 120.0, 0.0);
    vec3 mouseDirection = normalize(mousePos3D - position);
    float mouseDistance = length(mousePos3D - position);
    
    // Create attraction force that pulls particles toward cursor
    float attractionStrength = orderInfluence * 2.0; // Strong attraction in mouse area
    vec3 mouseAttraction = mouseDirection * attractionStrength * (1.0 / (1.0 + mouseDistance * 0.005));
    
    // DYNAMIC PARAMETER INTERPOLATION
    // Chaos state (current values) - enhanced for more pronounced effect
    float chaosFrequency = frequency * chaosStrength * 1.5;     // More chaotic
    float chaosAmplitude = amplitude * chaosStrength * 1.3;     // Stronger displacement
    float chaosMaxDistance = maxDistance * chaosStrength;
    
    // Order state (much more ordered) - refined values
    float orderFrequency = frequency * 0.3;        // Much slower frequency
    float orderAmplitude = amplitude * 0.4;        // Much smaller amplitude  
    float orderMaxDistance = maxDistance * 0.6;    // Contained distance
    
    // Interpolate parameters based on mouse proximity
    float dynamicFrequency = mix(chaosFrequency, orderFrequency, orderInfluence);
    float dynamicAmplitude = mix(chaosAmplitude, orderAmplitude, orderInfluence);
    float dynamicMaxDistance = mix(chaosMaxDistance, orderMaxDistance, orderInfluence);
    
    // Enhanced noise parameters for more dramatic curl effect
    float dynamicTurbulence = mix(turbulenceStrength * 2.0, turbulenceStrength * 0.2, orderInfluence);
    float dynamicDistortion = mix(distortionStrength * 1.5, distortionStrength * 0.3, orderInfluence);
    float dynamicNoiseScale = mix(noiseScale * 1.2, noiseScale * 0.4, orderInfluence);
    float dynamicWaveSpeed = mix(waveSpeed * 1.3, waveSpeed * 0.2, orderInfluence);
    
    // ENHANCED CURL NOISE CALCULATION
    vec3 noisePos = newPos * dynamicFrequency * dynamicNoiseScale;
    
    // Add mouse influence to noise position to bias curl toward cursor
    noisePos += mouseDirection * orderInfluence * 0.5;
    
    // Calculate curl force with enhanced parameters
    vec3 curlForce = curl(noisePos.x, noisePos.y, noisePos.z);
    
    // Scale curl force by dynamic turbulence
    curlForce *= dynamicTurbulence;
    
    // Add mouse attraction directly to curl force
    curlForce += mouseAttraction;
    
    // Add FBM noise with dynamic scaling and mouse bias
    vec2 fbmPos = noisePos.xy + u_time * dynamicWaveSpeed * 0.05;
    fbmPos += mouseDirection.xy * orderInfluence * 0.3; // Bias FBM toward mouse
    float fbmNoise = fbm(fbmPos);
    curlForce += vec3(fbmNoise) * (0.8 * (1.0 - orderInfluence * 0.9));
    
    // Apply dynamic distortion with mouse influence
    vec3 target = position + curlForce * dynamicAmplitude * dynamicDistortion;
    
    // Additional mouse pull for particles close to cursor
    if (orderInfluence > 0.1) {
        target += mouseDirection * orderInfluence * amplitude * 0.5;
    }
    
    // Calculate and apply click effect
    vec3 clickEffect = calculateClickEffect(position);
    target += clickEffect;
    
    // Use dynamic max distance for final blending with smoother transition
    float d = length(position - target) / dynamicMaxDistance;
    vec3 finalPos = mix(position, target, smoothstep(0.0, 1.0, d));

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0); 
    
    // Apply particle size control
    gl_PointSize = particleSize * (1.0 / -mvPosition.z);
    if (isMobile) {
        gl_PointSize = particleSize * 2.0 * (1.0 / -mvPosition.z);
    }
    gl_Position = projectionMatrix * mvPosition;
}
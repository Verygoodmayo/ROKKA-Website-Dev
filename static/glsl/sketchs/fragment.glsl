uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float colorIntensity;
uniform vec3 particleColor;

varying vec2 vUv;
float PI = 3.141592653589793238; 

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Create subtle gradient based on position and mouse interaction
    vec2 center = vec2(0.5);
    float dist = distance(st, u_mouse);
    float intensity = colorIntensity * (1.0 - dist * 0.5);
    
    // Use the particle color with intensity modulation
    vec3 finalColor = particleColor;
    gl_FragColor = vec4(finalColor, 1.0);
}
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float colorIntensity;
uniform vec3 particleColor;
uniform float mouseOrderRadius;

varying vec2 vUv;
float PI = 3.141592653589793238; 

void main() {
    // Create circular points (for point rendering)
    vec2 pointCoord = gl_PointCoord.xy - vec2(0.5);
    float dist = length(pointCoord);
    
    // Discard fragments outside the circle
    if (dist > 0.5) {
        discard;
    }
    
    // Create a smooth circle with fade-out at edges
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    // Use consistent white color for all particles
    vec3 finalColor = particleColor; // White particles
    
    // Apply color intensity
    finalColor *= colorIntensity;
    
    gl_FragColor = vec4(finalColor, alpha);
}
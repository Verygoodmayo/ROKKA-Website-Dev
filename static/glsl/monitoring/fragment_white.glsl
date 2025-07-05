uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float colorIntensity;
uniform vec3 particleColor;

varying vec2 vUv;
varying vec3 vPosition;

in vec3 vertexPosition;
in vec2 textureCoord;
in float distToCamera;

void main() {
    vec2 st = gl_PointCoord.xy;
    
    // Create circular particles
    float dist = distance(st, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    
    if (alpha < 0.01) discard;
    
    // Calculate mouse influence for this particle
    vec2 mousePos = u_mouse;
    float mouseDistance = distance(textureCoord, mousePos);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.3, mouseDistance);
    
    // Enhance color intensity based on mouse proximity
    float intensity = colorIntensity * (1.0 + mouseInfluence * 0.5);
    
    // Force white color - no matter what
    vec3 finalColor = vec3(1.0, 1.0, 1.0) * intensity;
    
    // Add slight flickering effect for chaos areas (away from mouse)
    float flicker = 1.0 + sin(u_time * 10.0 + st.x * 50.0) * 0.1 * (1.0 - mouseInfluence);
    finalColor *= flicker;
    
    // Final alpha calculation with depth-based fading
    float finalAlpha = alpha * 0.2 + smoothstep(0.0, 1.0, alpha) * 0.3 + 0.5 * smoothstep(0.9 - fwidth(alpha), 0.9, alpha);
    
    // Enhance alpha near mouse for more visibility in ordered areas
    finalAlpha *= (1.0 + mouseInfluence * 0.3);
    
    gl_FragColor = vec4(finalColor, finalAlpha);
}

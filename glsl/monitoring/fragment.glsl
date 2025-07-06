uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float colorIntensity;
uniform vec3 particleColor;

// Mouse interaction controls
uniform float mouseOrderRadius;
uniform float mouseOrderStrength;
uniform float chaosStrength;

// Distance fade controls
uniform float nearFadeDistance;
uniform float farFadeDistance;

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
    
    // CHAOS-TO-ORDER MOUSE EFFECT
    // Convert current fragment to screen coordinates
    vec2 screenPos = gl_FragCoord.xy / u_resolution.xy;
    
    // Mouse position is already in normalized [0,1] coordinates
    vec2 mousePos = u_mouse;
    
    // Calculate distance from mouse position to current fragment in screen space
    float mouseDistance = length(screenPos - mousePos);
    
    // Create a visible influence radius
    float influenceRadius = mouseOrderRadius;
    
    // Calculate mouse influence (1.0 = full influence, 0.0 = no influence)
    float mouseInfluence = 1.0 - smoothstep(0.0, influenceRadius, mouseDistance);
    
    // CHAOS-TO-ORDER EFFECT:
    // - Particles within influence radius become more ordered (blue/cool colors)
    // - Particles outside influence radius remain chaotic (white/warm colors)
    
    // Base chaotic color (white with subtle warm tint)
    vec3 chaoticColor = vec3(1.0, 0.98, 0.95);
    
    // Ordered color (blue/cool) - represents organization and control
    vec3 orderedColor = vec3(0.3, 0.7, 1.0);
    
    // Mix between chaotic and ordered based on mouse influence
    vec3 baseColor = mix(chaoticColor, orderedColor, mouseInfluence * mouseOrderStrength);
    
    // Add subtle particle brightness variation based on order
    // Ordered particles appear slightly brighter to show the effect
    float orderBrightness = 1.0 + mouseInfluence * 0.4;
    vec3 finalColor = baseColor * colorIntensity * orderBrightness;
    
    // Subtle flickering effect (stronger for chaotic particles)
    float chaosFlicker = 1.0 - mouseInfluence * 0.7; // Much less flicker for ordered particles
    float flicker = 1.0 + sin(u_time * 8.0 + gl_PointCoord.x * 40.0) * 0.08 * chaosFlicker;
    finalColor *= flicker;
    
    // DISTANCE-BASED TRANSPARENCY
    // Closer particles are fully opaque, farther particles become transparent
    float distanceAlpha = 1.0 - smoothstep(nearFadeDistance, farFadeDistance, distToCamera);
    
    // Make the distance effect more pronounced
    distanceAlpha = pow(distanceAlpha, 1.5); // Curve the falloff for more dramatic effect
    
    // Combine the particle shape alpha with distance-based alpha
    float finalAlpha = alpha * distanceAlpha;
    
    // Apply additional alpha effects with better blending
    finalAlpha = finalAlpha * 0.4 + smoothstep(0.0, 1.0, finalAlpha) * 0.5 + 0.1 * smoothstep(0.9 - fwidth(finalAlpha), 0.9, finalAlpha);
    
    gl_FragColor = vec4(finalColor, finalAlpha);
}

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
    
    // Simple white output for debugging
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.8);
}

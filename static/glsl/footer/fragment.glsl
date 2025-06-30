uniform float u_time;
uniform vec2 u_resolution;
varying vec2 vUv;
float PI = 3.141592653589793238; 
uniform bool isMobile;
uniform vec3 u_color;

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    gl_FragColor = vec4(u_color, 1.0);
}
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 vUv;
float PI = 3.141592653589793238; 
// uniform bool isMobile;
uniform float blueParticles;

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    if (blueParticles > 0.5) {
        gl_FragColor = vec4(1.,0.5,0.5,1.);
    } else {
        gl_FragColor = vec4(1.,1.,1.,1.);
    }
}
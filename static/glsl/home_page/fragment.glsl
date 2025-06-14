uniform vec2 u_resolution;
uniform float u_time;
uniform float u_saf;
uniform float isMobile;

in vec3 vertexPosition;
in vec2 textureCoord;
in float distToCamera;


float rand(vec2 n) { 
return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
vec2 ip = floor(p);
vec2 u = fract(p);
u = u*u*(3.0-2.0*u);

float res = mix(
    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
return res*res;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // float sf = clamp(u_saf, 0., 2.);

    //float d = distance(cameraPosition, vertexPosition);
    //float ov = smoothstep( (distToCamera + clamp(noise(st),-1.,1.)) / 10., 0.5, 2. );
    float ov =  smoothstep( (distToCamera + clamp(noise(st),-1.,0.5)) / 60., 0.,0.75);
    float opacity = clamp(ov, 0., 1.);

    // gl_FragColor=vec4(0.05,0.05,0.7,1.-opacity); 
    if (isMobile > 0.5) {
        gl_FragColor=vec4(1.05,0.05,0.7,1.-opacity); 
    } else {
        gl_FragColor=vec4(0.05,0.05,0.7,1.-opacity); 
}  

    

}
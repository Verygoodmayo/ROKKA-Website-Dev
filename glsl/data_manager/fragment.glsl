uniform vec2 u_resolution;
uniform float u_time;

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

    vec3 color = vec3(1.143, 1.134, 1.934);
    float alpha = 1. - length(gl_PointCoord.xy - 0.5)*2.;
    // float alpha =  smoothstep( (distToCamera + clamp(noise(st),-1.,0.5)) / 40., 0.,0.75);

    float finalAlpha = alpha*0.1 + smoothstep(0.,1.,alpha)*0.1 + 0.4*smoothstep(0.9-fwidth(alpha),0.9,alpha);
    // float finalAlpha = clamp(alpha, 0., 1.);

    gl_FragColor=vec4(color,finalAlpha);
}
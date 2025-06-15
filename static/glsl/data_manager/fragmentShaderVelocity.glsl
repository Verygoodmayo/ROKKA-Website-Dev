varying vec2 vUv;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D t1;
float PI = 3.14159265358979323846;

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

vec3 curl(float	x,	float	y,	float	z)
{

float	eps	= 1., eps2 = 2. * eps;
float	n1,	n2,	a,	b;

x += u_time * .05;
y += u_time * .05;
z += u_time * .05;

vec3	curl = vec3(0.);

n1	=	noise(vec2( x,	y	+	eps ));
n2	=	noise(vec2( x,	y	-	eps ));
a	=	(n1	-	n2)/eps2;

n1	=	noise(vec2( x,	z	+	eps));
n2	=	noise(vec2( x,	z	-	eps));
b	=	(n1	-	n2)/eps2;

curl.x	=	a	-	b;

n1	=	noise(vec2( y,	z	+	eps));
n2	=	noise(vec2( y,	z	-	eps));
a	=	(n1	-	n2)/eps2;

n1	=	noise(vec2( x	+	eps,	z));
n2	=	noise(vec2( x	+	eps,	z));
b	=	(n1	-	n2)/eps2;

curl.y	=	a	-	b;

n1	=	noise(vec2( x	+	eps,	y));
n2	=	noise(vec2( x	-	eps,	y));
a	=	(n1	-	n2)/eps2;

n1	=	noise(vec2(  y	+	eps,	z));
n2	=	noise(vec2(  y	-	eps,	z));
b	=	(n1	-	n2)/eps2;

curl.z	=	a	-	b;

return	curl;
}

uniform float time;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 position = texture2D( texturePosition, uv ).xyz;
    vec3 velocity = texture2D( textureVelocity, uv ).xyz;

    vec4 texture = texture2D(t1, uv);

    float f = 2.;
    float amp = 1.;
    vec3 target = position * curl(position.x * f, position.y * f, position.z * f) * amp;
    
    // vec3 target = texture.xyz;

    velocity *= 0.85;
    velocity += (target) * 0.;

    gl_FragColor = vec4(velocity, 1.0 );
}

uniform vec3 lightPower[2]; //powers for lights
uniform vec3 rho; //surface coefficient
uniform vec3 ambient; //ambient color
uniform float wthrp; //weather weight

varying vec3 transformedNormal;
varying vec3 lVector[2];

const float PI = 3.14159;

void main() {

	vec3 beta = vec3( 0.0, 0.0, 0.0 );
	
	for( int i = 0; i < 2; i++)
	{
		vec3 color = lightPower[i] / ( 4.0 * PI * pow( length(lVector[i]),2.0) );
		vec3 lightVector = normalize( lVector[i] );
		float dotProduct = dot( transformedNormal, lightVector );
		float pointLightWeighting = max( dotProduct, 0.0 );
		beta += color * pointLightWeighting * rho/PI;
	}
	
	gl_FragColor = vec4( ambient + beta * ( 1.0 - wthrp ), 1.0);
}
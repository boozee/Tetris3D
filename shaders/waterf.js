uniform vec3 lightPower[2]; //lights power
uniform vec3 c_spec; // surface specular color: equal to F(0)
uniform float alpha; // material roughness (increase for rougher surface)
uniform sampler2D diffuseMap; // surface diffuse color
uniform float s; // ratio of diffuse lighting
uniform float time; //passing time to shift texture
uniform vec3 ambient; //ambient light
uniform float resolution; //resolution of water texture
uniform float wthrp; //weather weight
uniform float visibility; //minimum texture visibility

varying vec3 transformedNormal;
varying vec3 pointPosition;
varying vec3 lightVector[2];
varying vec2 uVv;

#define PI 3.14159265	

// compute the geometry term
float G(float LdotH)
{
	return 1.0/pow(LdotH,2.0);
}

// compute Fresnel reflection term with Schlick approximation
vec3 F(float LdotH) {
	return c_spec + (vec3(1.0) - c_spec)*pow(1.0-LdotH, 5.0);
}

// compute the normal distribution function, based on Trowbridge-Reitz
float D(float NdotH){
	float A = pow(alpha,2.0);
	float B = PI * pow(pow(NdotH,2.0)*(A-1.0) + 1.0, 2.0);
	return A/B;
}

void main()
{
	vec3 color = vec3( 0, 0, 0 );
	for( int i = 0; i < 2; i++)
	{
		vec3  n      		 	= normalize( transformedNormal );
		vec3  v         			= normalize( -pointPosition );
		vec3  l         			= normalize(  lightVector[i] );
		vec3  h          		= normalize( v+l );
		float  NdotH    		= max(0.000001, dot( n, h ));
		float  VdotH     		= max(0.000001, dot( v, h ));
		float  NdotV 			= max(0.000001, dot( n, v ));
		float  NdotL 			= max(0.000001, dot( n, l ));
		// specular BRDF
		vec3 Specular = F(VdotH) * G(VdotH) * D(NdotH) / 4.0;
		vec3 beta = lightPower[i] / ( 4.0  * PI * pow( length(lightVector[i]),2.0) );
		vec3 c_diff = texture2D( diffuseMap, mod(uVv + vec2(time), resolution)).rgb;
		color += beta * NdotL * ( s*c_diff + (1.0-s)*Specular) * (1.0 - visibility) + c_diff * visibility;
	}
	gl_FragColor = vec4( ambient, 1.0 ) + vec4( color, 1.0 ) * (1.0 - wthrp);
}
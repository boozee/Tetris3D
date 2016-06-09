uniform vec3 lightPower;
uniform vec3 mlightPower;
uniform vec3 mpointLightPosition;
uniform vec3 c_spec; // surface specular color: equal to F(0)
uniform float alpha; // material roughness (increase for rougher surface)
uniform sampler2D diffuseMap; // surface diffuse color
uniform float s; // ratio of diffuse lighting
uniform vec3 ambient; //ambient light
uniform float wthrp; //weather weight

varying vec3 transformedNormal;
varying vec3 pointPosition;
varying vec3 lightVector;
varying vec3 mlightVector;
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
	vec3  n      		 	= normalize( transformedNormal );
	vec3  v         			= normalize( -pointPosition );
	vec3  l         			= normalize(  lightVector );
	vec3  ml         		= normalize(  mlightVector );
	vec3  h          		= normalize( v+l );
	vec3  mh          		= normalize( v+ml );
	float  NdotH    		= max(0.000001, dot( n, h ));
	float  mNdotH    		= max(0.000001, dot( n, mh ));
	float  VdotH     		= max(0.000001, dot( v, h ));
	float  mVdotH     	= max(0.000001, dot( v, mh ));
	float  NdotV 			= max(0.000001, dot( n, v ));
	float  NdotL 			= max(0.000001, dot( n, l ));
	float  mNdotL 		= max(0.000001, dot( n, ml ));
	// specular BRDF
	vec3 Specular = F(VdotH) * G(VdotH) * D(NdotH) / 4.0;
	vec3 beta = lightPower / ( 4.0  * PI * pow( length(lightVector),2.0) );
	vec3 c_diff = texture2D( diffuseMap, uVv).rgb;
	
	vec3 mSpecular = F(mVdotH) * G(mVdotH) * D(mNdotH) / 4.0;
	vec3 mbeta = mlightPower / ( 4.0  * PI * pow( length(mlightVector),2.0) );
	gl_FragColor = vec4( ambient, 1.0 ) + vec4(beta * NdotL * ( s*c_diff + (1.0-s)*Specular), 1.0) * (1.0 - wthrp) + vec4(mbeta * mNdotL * ( s*c_diff + (1.0-s)*mSpecular), 1.0) * (1.0 - wthrp);
}
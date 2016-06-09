uniform vec3 lightPower;
uniform vec3 c_spec; // surface specular color: equal to F(0)
uniform float alpha; // material roughness (increase for rougher surface)

varying vec3 transformedNormal;
varying vec3 pointPosition;
varying vec3 lightVector;

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
	vec3  h          		= normalize( v+l );  
	float  NdotH    		= max(0.000001, dot( n, h ));  
	float  VdotH     		= max(0.000001, dot( v, h ));  
	float  NdotV 			= max(0.000001, dot( n, v ));  
	float  NdotL 			= max(0.000001, dot( n, l ));    
	// specular BRDF
	vec3 Specular = F(VdotH) * G(VdotH) * D(NdotH) / 4.0;
	vec3 beta = lightPower / ( 4.0  * PI * pow( length(lightVector),2.0) );
	gl_FragColor = vec4(beta * NdotL * Specular, 1.0);
}
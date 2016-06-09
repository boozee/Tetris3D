varying vec3 transformedNormal;
varying vec3 pointPosition;
varying vec3 lightVector;
uniform vec3 pointLightPosition;

void main()
{
	transformedNormal = normalMatrix * normal;
	pointPosition = (modelViewMatrix * vec4( position, 1.0 )).xyz;
	vec4 lPosition = viewMatrix * vec4( pointLightPosition, 1.0 );
	lightVector = lPosition.xyz - pointPosition;
	gl_Position = projectionMatrix * vec4(pointPosition,1.0);
}
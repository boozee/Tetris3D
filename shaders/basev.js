uniform vec3 pointLightPosition;
uniform vec3 mpointLightPosition;

varying vec3 transformedNormal;
varying vec3 pointPosition;
varying vec3 lightVector;
varying vec3 mlightVector;
varying vec2 uVv;

void main()
{
	transformedNormal = normalMatrix * normal;
	pointPosition = (modelViewMatrix * vec4( position, 1.0 )).xyz;
	vec4 lPosition = viewMatrix * vec4( pointLightPosition, 1.0 );
	vec4 mlPosition = viewMatrix * vec4( mpointLightPosition, 1.0 );
	lightVector = lPosition.xyz - pointPosition;
	mlightVector = mlPosition.xyz - pointPosition;
	uVv = uv;
	vec4 worldPosition = modelMatrix * vec4(position, 1.0); //fix for THREE.js shadow bug
	
	gl_Position = projectionMatrix * vec4(pointPosition,1.0);
}
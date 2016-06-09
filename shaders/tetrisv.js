uniform vec3 pointLightPosition[2]; //positions for lights

varying vec3 transformedNormal;
varying vec3 lVector[2];

void main() {
	transformedNormal = normalMatrix * normal;
	vec3 pointPosition = (modelViewMatrix * vec4( position, 1.0 )).xyz;
	
	for( int i = 0; i < 2; i++ )
	{
		vec4 lPosition = viewMatrix * vec4( pointLightPosition[i], 1.0 );
		lVector[i] = lPosition.xyz - pointPosition;
	}
	
	//vec4 worldPosition = modelMatrix * vec4(position, 1.0); //fix for THREE.js shadow bug
	
	gl_Position = projectionMatrix * vec4(pointPosition,1.0);
}
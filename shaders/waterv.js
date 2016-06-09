uniform vec3 pointLightPosition[2];

varying vec3 transformedNormal;
varying vec3 pointPosition;
varying vec3 lightVector[2];
varying vec2 uVv;

void main()
{
	transformedNormal = normalMatrix * normal;
	pointPosition = (modelViewMatrix * vec4( position, 1.0 )).xyz;
	
	for(int i = 0; i < 2; i++)
	{
		vec4 lPosition = viewMatrix * vec4( pointLightPosition[i], 1.0 );
		lightVector[i] = lPosition.xyz - pointPosition;
	}
	
	uVv = uv;
	gl_Position = projectionMatrix * vec4(pointPosition,1.0);
}
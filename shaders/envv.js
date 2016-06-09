varying vec2 uVv;

void main()
{
	uVv = uv;
	vec3 pointPosition = ( modelViewMatrix * vec4( position, 1.0 )).xyz;
	gl_Position = projectionMatrix * vec4( pointPosition, 1.0 );
}
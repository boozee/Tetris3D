uniform vec3 pointLightPosition[2]; //world position of lights
uniform sampler2D diffuseMap; //diffuse texture
uniform float repetition; //repeat texture value
uniform vec3 ambient; //ambient light
uniform float wthrp; //weather weight
uniform float lmaxh[2]; //max light height

varying vec2 uVv;

void main()
{
	float percs = max( 0.0, pointLightPosition[0].y / lmaxh[0] );
	float percm = max( 0.0, pointLightPosition[1].y / lmaxh[1] );
	
	vec3 color;
	color.r = max(ambient.r - 0.1 * percm * (1.0 - wthrp), 0.0);
	color.g = max(ambient.g + 0.6 * percs * (1.0 - wthrp), 0.0);//ambient.g + 0.6 * percs;
	color.b = max(ambient.b + (0.4 * percm + 0.7 * percs) * (1.0 - wthrp), 0.0);//ambient.b + 0.4 * percm + 0.7 * percs;
	
	
	vec4 fcolor = vec4(color, 1.0);
	
	//vec4 fcolor = vec4( ambient.r - 0.1 * percm, ambient.g + 0.6 * percs, ambient.b + 0.4 * percm + 0.7 * percs, 1.0);
	vec3 c_diff = texture2D( diffuseMap, uVv * repetition ).rgb;
	
	gl_FragColor = vec4(percm * c_diff * (1.0 - wthrp), 1.0) + (fcolor * (1.0 - percm));
}
## Lighting
Lighting in WebGL represents one of the most crucial aspects of creating realistic 3D graphics. Unlike many higher-level graphics libraries, WebGL doesn't provide a built-in lighting system. Instead, developers must implement lighting calculations entirely within shaders, offering complete control over the lighting model but requiring a thorough understanding of lighting principles.  
Let's start with the foundation of lighting calculations: the interaction between light rays and surfaces. When light hits a surface, it can be absorbed, reflected, or transmitted through the material. In WebGL, we primarily concern ourselves with reflection, which we typically break down into three main components: **ambient**, **diffuse**, and **specular reflection**. Together, these components form the Phong reflection model, one of the most widely used lighting models in real-time graphics.  
![App Platorm](https://upload.wikimedia.org/wikipedia/commons/6/6b/Phong_components_version_4.png?20060807180513)
*Brad Smith, Wikipedia*  
Ambient lighting simulates the soft, indirect illumination present in real environments. In nature, light bounces off multiple surfaces before reaching our eyes, creating subtle illumination even in shadowed areas. In WebGL, we typically approximate this complex behavior with a simple constant term. Here's a basic ambient lighting implementation in GLSL:
```glsl
    uniform vec3 uAmbientLight;    // Color and intensity of ambient light
    uniform vec3 uMaterialColor;   // Material's base color

    vec3 ambientTerm = uAmbientLight * uMaterialColor;
```
Diffuse reflection forms the core of most lighting calculations. It follows Lambert's cosine law, which states that the intensity of reflected light is proportional to the cosine of the angle between the surface normal and the light direction. This creates the characteristic shading that helps define the shape of objects. The implementation requires surface normals and light direction:
```glsl
    uniform vec3 uLightDirection;   // Direction to the light source
    varying vec3 vNormal;          // Surface normal (interpolated)

    float lambertTerm = max(dot(normalize(vNormal), normalize(uLightDirection)), 0.0);
    vec3 diffuseTerm = uMaterialColor * uLightColor * lambertTerm;
```
Specular reflection accounts for the bright highlights we see on shiny surfaces. These highlights occur where light reflects almost directly toward the viewer, following the principle of reflection. The Phong model calculates this using the angle between the reflection vector and the view direction, raised to a power that controls the size of the highlight:
```glsl
    uniform vec3 uViewPosition;    // Camera position
    uniform float uShininess;      // Material shininess
    varying vec3 vPosition;        // Fragment position

    vec3 viewDir = normalize(uViewPosition - vPosition);
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uShininess);
    vec3 specularTerm = uLightColor * uSpecularColor * spec;
```
Light attenuation plays a crucial role in creating realistic lighting. In the real world, light intensity diminishes with distance following the inverse square law. In WebGL, we often implement a simplified attenuation formula:
```glsl
    float distance = length(lightPosition - vPosition);
    float attenuation = 1.0 / (uConstant + uLinear * distance + uQuadratic * distance * distance);
```
Different types of light sources require different calculations. Point lights emit light in all directions from a single point, requiring dynamic calculation of light direction for each fragment. Directional lights, like the sun, have parallel light rays and use a constant direction. Spotlights combine aspects of both, with light emanating in a cone from a point.
```glsl
    // Point light
    vec3 lightDir = normalize(uLightPosition - vPosition);

    // Spotlight
    float theta = dot(lightDir, normalize(-uSpotlightDirection));
    float epsilon = uInnerCutoff - uOuterCutoff;
    float intensity = clamp((theta - uOuterCutoff) / epsilon, 0.0, 1.0);
```
These lighting techniques can be combined and modified to create sophisticated lighting systems. The key lies in understanding how real-world light behaves and approximating these behaviors within the constraints of real-time rendering.

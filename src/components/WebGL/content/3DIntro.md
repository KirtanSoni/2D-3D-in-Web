# 3D Rendering in WebGL

Rendering 3D using WebGL is much more complex than 2D. While the math side of things has a smooth transition, the same can't be said for the rendering. This is also the point when more involved concepts like cameras, shadows and textures start rearing their head. 

## Changes in Math
We move from a two dimensional coordinate system (x, y) to a three dimensional system (x, y, z). This is naturally accompanied by a new plane of rotation- the Z axis. 

## Changes in Rendering
There are several different dimensions (pun intended) to the complexity when it comes to rendering. The most obvious one would be the fact that a 3D requires drawing multiple 2D shapes of different types and colors. For example, a square has only one face meanwhile a cube consists of six faces (each of whom are squares unto themselves). This geometric complexity is compounded by the fact that we have to manage which face is a visible to the viewer at a time. This is referred to as **Culling**. 
<br>
Another change is in color management. Previously, we had to only deal with the buffer for one surface. Now we have to program in different colors for each face to provide visual cues. Thus making the shaders that handle interpolation accross multiple faces while maintaining other effects such as lighting.  

The way WebGL deals with the visibility of occulded objects (pixels that may be hidden by pixels ahead of them in Z axis) is by using a **Depth Buffer**. It is a matrix that stores the distance of the viewer to the rendered surface, allowing the program to know whether to display the pixel or not.
 ```js
 gl.depthFunc(gl.LESS);
 ``` 

## 3D Render Pipline
The pipeline does not fundamentally change; the core idea of vertex processing in the vertex shader to coloring in the fragment shader is still followed.   
Vertex Processing represents the initial stage where vertex data, including positions, colors, and texture coordinates, undergoes transformation through model, view, and projection matrices. These transformations convert local object coordinates to clip space coordinates, accounting for camera position and perspective projection.  
Primitive Assembly follows, where transformed vertices are grouped into primitives (triangles, typically) based on the specified drawing mode. This stage handles the creation of faces and ensures proper vertex ordering for correct face orientation.  
Rasterization converts the geometric primitives into fragments, determining which pixels the primitive covers on the screen. This process becomes more complex in 3D due to depth calculations and perspective corrections.  
Fragment Processing applies per-pixel operations including texture mapping, color interpolation, and depth testing. The fragment shader executes here, determining final pixel colors while respecting depth and face culling rules.

## Different types of 3D
There's three main techniques of representing a three dimensional object in a two dimensional space in WebGL:
- **Orthographic Projection**: This is the simplest form of 3D rendering. The object is rendered onto the clip space without any perspective distortion. Parallel lines remain parallel, and object maintains the same size despite its distance from the viewer. These are used in creating UI elements and in diagramming. 
  The orthographic projection matrix maps a cuboid view volume directly to normalized device coordinates (-1 to +1):
  ```glsl
  [
    2/(r-l),     0,          0,          -(r+l)/(r-l),
    0,           2/(t-b),    0,          -(t+b)/(t-b),
    0,           0,          -2/(f-n),    -(f+n)/(f-n),
    0,           0,          0,           1
  ]
  ```
  Where:  
  l, r = left, right boundaries  
  b, t = bottom, top boundaries  
  n, f = near, far boundaries  
  which can be expressed in webgl:
  ```javascript
  function createOrthographicMatrix(left, right, bottom, top, near, far) {
    const width = right - left;
    const height = top - bottom;
    const depth = far - near;
    
    return new Float32Array([
        2 / width, 0, 0, 0,
        0, 2 / height, 0, 0,
        0, 0, -2 / depth, 0,
        -(right + left) / width,
        -(top + bottom) / height,
        -(far + near) / depth,
        1
    ]);
  }
  const vsSource = `
    attribute vec4 aPosition;
    uniform mat4 uOrthoMatrix;
    
    void main() {
        gl_Position = uOrthoMatrix * aPosition;
    }`;
  ```
- **Perspective Projection**: A step above orthographic rendering, the proportions of objects now distort in accordance with their distance from the viewer. This is a more realistic depiction of an object with three dimensions. The main difference in terms of the math is the introduction of FOV (Field of View) calculations in the matrix. 
  ```glsl
  [
    f/aspect,  0,      0,                  0,
    0,         f,      0,                  0,
    0,         0,      (f+n)/(n-f),       2fn/(n-f),
    0,         0,      -1,                 0
  ]
  ```
  Where:  
  f = field of view factor (1/tan(fov/2))  
  aspect = width/height ratio  
  n, f = near, far planes  
  and in webgl,
  ```js
  function createPerspectiveMatrix(fieldOfView, aspect, near, far) {
      const f = 1.0 / Math.tan(fieldOfView * Math.PI / 360);
      const rangeInv = 1 / (near - far);
      
      return new Float32Array([
          f / aspect, 0, 0, 0,
          0, f, 0, 0,
          0, 0, (near + far) * rangeInv, -1,
          0, 0, near * far * rangeInv * 2, 0
      ]);
  }

  const vsSource = `
      attribute vec4 aPosition;
      uniform mat4 uPerspectiveMatrix;
      
      void main() {
          vec4 pos = uPerspectiveMatrix * aPosition;
          gl_Position = pos;
      }`;
  ```
- **Camera View**: Up till now, the camera was at a fixed point and we arranged the objects around it. It transforms world space coordinates into view space coordinates, leading to more dynamic and realistic scenes. This is expressed in the math as:
  ```glsl
  [
    rx, ry, rz, -dot(r,eye)
    ux, uy, uz, -dot(u,eye)
    -fx,-fy,-fz, dot(f,eye)
    0,  0,  0,   1
  ]
  ```
  Where:  
  r = right vector  
  u = up vector  
  f = forward vector  
  eye = camera position  
  and in WebGL
  ```js
  function createViewMatrix(eye, target, up) {
    // Calculate camera axes
    const zAxis = normalize(subtractVectors(eye, target));
    const xAxis = normalize(cross(up, zAxis));
    const yAxis = cross(zAxis, xAxis);
    
    return new Float32Array([
        xAxis[0], yAxis[0], zAxis[0], 0,
        xAxis[1], yAxis[1], zAxis[1], 0,
        xAxis[2], yAxis[2], zAxis[2], 0,
        -dot(xAxis, eye), -dot(yAxis, eye), -dot(zAxis, eye), 1
    ]);
  }
  const vsSource = `
      attribute vec4 aPosition;
      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewMatrix;
      uniform mat4 uModelMatrix;
      
      void main() {
          gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
      }
  `;
  ```

### Activity 3.1: Orthographic Rendering
Orthographic rendering is the simplest way to render three dimensional objects since we don't have to consider distortions to its dimensions due to distance from the viewer. Lets see how to render a basic pyramid in 3D using this method.  
#### Step 1: Setting Up WebGL Context
The WebGL context is set up similar to how it was for 2D rendering except for two extra lines at the end:
```js
const canvas = this.$refs.canvas;
this.gl = canvas.getContext('webgl');
this.gl.viewport(0, 0, canvas.width, canvas.height);
this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
this.gl.enable(this.gl.DEPTH_TEST);
this.gl.enable(this.gl.CULL_FACE);
```
DEPTH_TEST enables the depth buffer to handle occulsion  
CULL_FACE enables culling so that the faces of the pyramid that aren't visible to the viewer aren't rendered. By Default, the faces at the back are culled. 
#### Step 2: Vertex and Color Definition:
We define the faces of the pyramid- 5 in total (or 6 triangles since a square in webgl is just two triangles) and their colors:
```js
  positions: new Float32Array([
      // Front face (Red)
      0.0,  1.0,  0.0,    // Peak vertex
      -1.0, -1.0, 1.0,    // Bottom left
      1.0, -1.0,  1.0,    // Bottom right
      
      // Right face (Green)
      0.0,  1.0,  0.0,    // Peak vertex
      1.0, -1.0,  1.0,    // Bottom left
      1.0, -1.0, -1.0,    // Bottom right
      
      // Back face (Blue)
      0.0,  1.0,  0.0,    // Peak vertex
      1.0, -1.0, -1.0,    // Bottom left
      -1.0, -1.0, -1.0,   // Bottom right
      
      // Left face (Yellow)
      0.0,  1.0,  0.0,    // Peak vertex
      -1.0, -1.0, -1.0,   // Bottom left
      -1.0, -1.0,  1.0,   // Bottom right
      
      // Bottom face (Purple) - made of two triangles
      -1.0, -1.0,  1.0,   // Front left
      -1.0, -1.0, -1.0,   // Back left
      1.0, -1.0, -1.0,    // Back right
      
      -1.0, -1.0,  1.0,   // Front left
      1.0, -1.0, -1.0,    // Back right
      1.0, -1.0,  1.0     // Front right
  ]),

  colors: new Float32Array([
      // Front face - Red
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      
      // Right face - Green
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      
      // Back face - Blue
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      
      // Left face - Yellow
      1.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
      
      // Bottom face - Purple (two triangles)
      0.8, 0.0, 0.8,
      0.8, 0.0, 0.8,
      0.8, 0.0, 0.8,
      
      0.8, 0.0, 0.8,
      0.8, 0.0, 0.8,
      0.8, 0.0, 0.8
  ])
```
We give each face its own color to differentiate it from the other faces.  

#### Step 3: Shader Creation & Compilation:
This step is also similar to 2D except we use vec3 instead of vec2 and mat4 for 4x4 matrix for the 3D transformations. 
```js 
  // Vertex Shader
  attribute vec3 position;  
  attribute vec3 color;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec3 vColor;

  void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vColor = color;
  }
```
**projectionMatrix** converts 3D space to 2D space 
#### Step 4: Understanding 3D Matrices 
This function creates an orthographic matrix defines a box in 3D space that will be visible- anything outside the box is clipped. The matrix maps x, y, z coordinates from the view box to normalized device coordinates (-1 to 1). 
```js
  createOrthographicMatrix(left, right, bottom, top, near, far) {
      return new Float32Array([
          2/(right-left), 0, 0, 0,
          0, 2/(top-bottom), 0, 0,
          0, 0, -2/(far-near), 0,
          -(right+left)/(right-left),
          -(top+bottom)/(top-bottom),
          -(far+near)/(far-near),
          1
      ]);
  }
```
The viewing volume parameters:  
- left/right: Horizontal bounds
- top/bottom: Vertical bounds
- near/far: Depth bounds (how close and far we can see)
#### Step 5: 3D Transforms
The model-view matrix combines:  
- Object transformations (model matrix)
  - Rotation around three axes (more complex than 2D's single rotation)
  - Translation in 3D space
- View transformations (not implemented for orthographic projection)
  - Would represent camera position and orientation
```js
  createModelViewMatrix() {
      const translation = [this.posX, this.posY, this.posZ];
      const rx = this.rotX * Math.PI / 180;
      const ry = this.rotY * Math.PI / 180;
      const rz = this.rotZ * Math.PI / 180;

      const cx = Math.cos(rx), sx = Math.sin(rx);
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const cz = Math.cos(rz), sz = Math.sin(rz);

      return new Float32Array([
          cy * cz, sx * sy * cz - cx * sz, cx * sy * cz + sx * sz, 0,
          cy * sz, sx * sy * sz + cx * cz, cx * sy * sz - sx * cz, 0,
          -sy, sx * cy, cx * cy, 0,
          translation[0], translation[1], translation[2], 1
      ]);
  }
```
The matrix multiplication combines all these transformations into a single operation:
- Rotations are applied in order: X, then Y, then Z
- Translation is applied last
- The matrix is in column-major order (WebGL standard)
#### Step 6: 3D Rendering 
```js
  render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      
      const projectionMatrix = this.createOrthographicMatrix(-2, 2, -2, 2, -2, 2);
      const modelViewMatrix = this.createModelViewMatrix();

      this.gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);
      this.gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);

      this.gl.drawArrays(this.gl.TRIANGLES, 0, 18);
  }
```
New considerations for 3D rendering (applies to all styles of projection): 
- We must clear both the color AND depth buffers
- Two matrices must be sent to the shader
- The depth buffer automatically handles which faces are visible
- We're drawing 18 vertices (6 triangles) to create the complete pyramid
#### Result 
We should get a pyramid that looks something like this:

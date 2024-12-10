### Activity 3.2: Perspective Projection
Lets see how we can modify the pyramid in the previous activity to render it with perspective distortion. We'll be reusing the same WebGL context as before.
#### Step 1: Creating Perspective Matrix
The perspective matrix creates the illusion of depth by making distant objects appear smaller, just like in real life. Let's break down each part of this transformation:
```js
    createPerspectiveMatrix(fieldOfViewRadians, aspect, near, far) {
        const f = 1.0 / Math.tan(fieldOfViewRadians / 2);
        return new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) / (near - far), -1,
            0, 0, (2 * far * near) / (near - far), 0
        ]);
    }
```
The perspective matrix is built with four main parameters:
- FOV (Field of View): Determines how much of the scene is visible at a time (like the lens of a camera). This is used in calculating the scaling factor for projection.
- Aspect Ratio: Used to ensure that the scene doesn't appear streched.
- The Near Boundary: Objects closer than this worn't be rendered
- The Far Boundary Objects further than this won't be rendered

#### Step 2: Modifying the Vertex Shader
We add **vDepth** to the vertex shader to get the depth calculation for the distortion.
```glsl
    attribute vec3 position;
    attribute vec3 color;
    uniform mat4 modelViewMatrix;
    uniform mat4 perspectiveMatrix;
    varying vec3 vColor;
    varying float vDepth;

    void main() {
        vec4 pos = perspectiveMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = pos;
        vDepth = pos.z / pos.w;
        vColor = color;
    }
```
#### Step 3: Adjust Model View Matrix
With perspective projection, object position affects size dramatically. We move objects back along the Z-axis (subtracting 5.0 units) to place them in the viewable frustum (view cone).
```js
    createModelViewMatrix() {
        const translation = [this.posX, this.posY, this.posZ - 5.0];
        return new Float32Array([
            cy * cz, sx * sy * cz - cx * sz, cx * sy * cz + sx * sz, 0,
            cy * sz, sx * sy * sz + cx * cz, cx * sy * sz - sx * cz, 0,
            -sy, sx * cy, cx * cy, 0,
            translation[0], translation[1], translation[2], 1
        ]);
    }
```
The rotation calculations remain the same, but their visual effect changes with perspective. Rotations now appear more realistic because closer parts of the object move more than distant parts.
#### Step 4: Render Function Perspective Setup
```js
    render() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        const fov = 60 * Math.PI / 180;
        const perspectiveMatrix = this.createPerspectiveMatrix(fov, aspect, 0.1, 100.0);
        const modelViewMatrix = this.createModelViewMatrix();

        this.gl.uniformMatrix4fv(perspectiveLocation, false, perspectiveMatrix);
        this.gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 18);
    } 
```
The render function sets up our perspective view with carefully chosen parameters.
#### Result
The pyramid should now show distortion with distance just like real life:

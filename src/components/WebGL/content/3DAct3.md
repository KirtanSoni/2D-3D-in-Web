### Activity 3.3: Camera View Projection
We can further extend the perspective rendering by adding a camera in the scene. The main difference between camera projection from the other two types of projection is that we will introduce view coordinates to represent what the camera is looking at any given point in time.  
#### Step 1: Camera Setup:
The camera needs four main directional vectors to be set up:
```js
    cameraPosition: { x: 0, y: 0, z: 5 },
    cameraRotation: { x: 0, y: 0, z: 0 },
    cameraTarget: { x: 0, y: 0, z: 0 },
    upVector: { x: 0, y: 1, z: 0 }
```
**cameraPosition**: Where the camera is located in 3D space  
**cameraRotation**: Camera's orientation angles  
**cameraTarget**: The point the camera is looking at  
**upVector**: Defines which way is "up" for the camera  
The camera position starts behind the scene (+Z) looking toward the origin, which is our default target.
#### Step 2: Creating View Matrix:
The view matrix will convert the world coordinates to the view coordinates(what the camera can see):
```js
    createViewMatrix() {
        // Create direction vector from camera to target
        const zAxis = normalize({
            x: this.cameraPosition.x - this.cameraTarget.x,
            y: this.cameraPosition.y - this.cameraTarget.y,
            z: this.cameraPosition.z - this.cameraTarget.z
        });

        // Calculate right vector (cross product of up and direction)
        const xAxis = normalize(crossProduct(this.upVector, zAxis));
        
        // Recalculate up vector to ensure orthogonality
        const yAxis = crossProduct(zAxis, xAxis);

        // Build view matrix
        return new Float32Array([
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            -dot(xAxis, this.cameraPosition),
            -dot(yAxis, this.cameraPosition),
            -dot(zAxis, this.cameraPosition),
            1
        ]);
    }
```
The view matrix is constructed through several steps:

- Calculate the camera's forward direction (z-axis) by subtracting target from position
- Calculate the camera's right vector (x-axis) using cross product
- Calculate the true up vector (y-axis) to ensure perpendicular axes
- Combine these vectors with camera position to create the view matrix
This matrix transforms the world so that the camera is at the origin looking down the negative Z axis.
#### Step 3: Add Utility Functions:
These utility functions handle essential 3D vector operations:
```js
function normalize(v) {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}

function crossProduct(a, b) {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    };
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
```

- normalize: Makes a vector's length 1 while preserving direction
- crossProduct: Creates a perpendicular vector to two input vectors
- dot: Calculates the scalar product of two vectors

These operations are fundamental to camera space calculation
#### Step 4: Update Vertex Shader:
We change up the vertex shader by adding the view matrix and apply it after model transformation. The depth calcuations now work with the view matrix values too.
```js
    attribute vec3 position;
    attribute vec3 color;
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 perspectiveMatrix;
    varying vec3 vColor;
    varying float vDepth;

    void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vec4 viewPos = viewMatrix * worldPos;
        gl_Position = perspectiveMatrix * viewPos;
        vDepth = viewPos.z / viewPos.w;
        vColor = color;
    }
```
#### Step 5: Update Render Function:
We'll also add the new view matrix in the render function. The shader now receives three matrices. The draw call is unchanged. 
```js
render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    const perspectiveMatrix = this.createPerspectiveMatrix(
        this.fov * Math.PI / 180,
        aspect,
        0.1,
        100.0
    );
    const modelMatrix = this.createModelMatrix();
    const viewMatrix = this.createViewMatrix();

    const perspectiveLocation = this.gl.getUniformLocation(this.program, 'perspectiveMatrix');
    const modelLocation = this.gl.getUniformLocation(this.program, 'modelMatrix');
    const viewLocation = this.gl.getUniformLocation(this.program, 'viewMatrix');

    this.gl.uniformMatrix4fv(perspectiveLocation, false, perspectiveMatrix);
    this.gl.uniformMatrix4fv(modelLocation, false, modelMatrix);
    this.gl.uniformMatrix4fv(viewLocation, false, viewMatrix);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 18);
}
```
#### Step 6: Camera Control Setup:
The projection is almost done. However, there still needs to be a way to control the camera.
We're going to implement an orbital camera model, where the camera moves around a fixed point (the target). This involves several mathematical concepts:
```js
orbitCamera(deltaX, deltaY) {
    const rotationSpeed = 0.01;
    this.cameraRotation.y += deltaX * rotationSpeed;  // Longitude (horizontal)
    this.cameraRotation.x += deltaY * rotationSpeed;  // Latitude (vertical)
    
    // Clamp vertical rotation to avoid gimbal lock
    this.cameraRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.cameraRotation.x));
    
    // Convert spherical coordinates to Cartesian
    const radius = 5.0;  // Fixed distance from target
    this.cameraPosition.x = radius * Math.cos(this.cameraRotation.x) * Math.sin(this.cameraRotation.y);
    this.cameraPosition.y = radius * Math.sin(this.cameraRotation.x);
    this.cameraPosition.z = radius * Math.cos(this.cameraRotation.x) * Math.cos(this.cameraRotation.y);
}
```
The camera position is calculated using spherical coordinates:

- **radius**: Distance from target point (constant for orbit)
- **θ (theta)**: Vertical angle from XZ plane (latitude), stored in cameraRotation.x
- **φ (phi)**: Horizontal angle from Z axis (longitude), stored in cameraRotation.y
#### Step 7: Camera Input Movement
Converting input movements to camera rotation requires careful handling of coordinate systems:
```js
handleCameraInput(inputX, inputY) {
    // Convert screen coordinates to rotation angles
    const rotationMatrix = new Float32Array(16);
    const cameraRight = normalize(crossProduct(this.upVector, this.viewDirection));
    const cameraUp = normalize(crossProduct(this.viewDirection, cameraRight));
    
    // Calculate local rotation axes
    const localRotationX = multiplyVectorMatrix(rotationMatrix, [1, 0, 0]);
    const localRotationY = multiplyVectorMatrix(rotationMatrix, [0, 1, 0]);
    
    // Apply rotations in camera-local space
    const worldRotation = {
        x: localRotationX[0] * inputY + localRotationY[0] * inputX,
        y: localRotationX[1] * inputY + localRotationY[1] * inputX,
        z: localRotationX[2] * inputY + localRotationY[2] * inputX
    };
}
```
We convert the mouse's coordinate system (2D pixels) to rotation angles in 3D space. The changes in the world space are calculated through the camera's coordinate system.
#### Result
The output should be similar to the perspective one, except now the viewer can move the camera around. [The source code and output can viewed here](https://play.vuejs.org/#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).


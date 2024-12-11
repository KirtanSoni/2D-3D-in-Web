<script>
export default {
  name: 'Camera',
  data() {
    return {
      gl: null,
      program: null,
      positions: new Float32Array([
        0.0, 1.0, 0.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,
        0.0, 1.0, 0.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        0.0, 1.0, 0.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        2.0, 1.0, 0.0,
        1.0, -1.0, 1.0,
        3.0, -1.0, 1.0,
        2.0, 1.0, 0.0,
        3.0, -1.0, 1.0,
        3.0, -1.0, -1.0,
        2.0, 1.0, 0.0,
        3.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        2.0, 1.0, 0.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,
        3.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        3.0, -1.0, -1.0,
        3.0, -1.0, 1.0
      ]),
      colors: new Float32Array([
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        0.8, 0.0, 0.8,
        0.8, 0.0, 0.8,
        0.8, 0.0, 0.8,
        0.8, 0.0, 0.8,
        0.8, 0.0, 0.8,
        0.8, 0.0, 0.8,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.5, 0.0,
        1.0, 0.5, 0.0,
        1.0, 0.5, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.3, 0.0,
        1.0, 0.3, 0.0,
        1.0, 0.3, 0.0,
        0.8, 0.1, 0.1,
        0.8, 0.1, 0.1,
        0.8, 0.1, 0.1,
        0.8, 0.1, 0.1,
        0.8, 0.1, 0.1,
        0.8, 0.1, 0.1
      ]),
      modelPosition: { x: 0, y: 0, z: 0 },
      modelRotation: { x: 0, y: 0, z: 0 },
      cameraPosition: { x: 0, y: 0, z: 8 },
      cameraRotation: { x: 0, y: 0 },
      cameraTarget: { x: 0, y: 0, z: 0 },
      upVector: { x: 0, y: 1, z: 0 },
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      fov: 60,
      near: 0.1,
      far: 100.0
    }
  },
  mounted() {
    this.initWebGL()
    this.createShaders()
    this.createBuffers()
    this.render()
  },
  methods: {
    initWebGL() {
      const canvas = this.$refs.canvas
      this.gl = canvas.getContext('webgl')
      this.gl.viewport(0, 0, canvas.width, canvas.height)
      this.gl.clearColor(1.0, 1.0, 1.0, 1.0)
      this.gl.enable(this.gl.DEPTH_TEST)
      this.gl.enable(this.gl.CULL_FACE)
    },
    createShaders() {
      const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
      this.gl.shaderSource(vertexShader, `
        attribute vec3 position;
        attribute vec3 color;
        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 perspectiveMatrix;
        varying vec3 vColor;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vec4 viewPos = viewMatrix * worldPos;
          gl_Position = perspectiveMatrix * viewPos;
          vColor = color;
        }
      `)
      this.gl.compileShader(vertexShader)
      const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
      this.gl.shaderSource(fragmentShader, `
        precision mediump float;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0);
        }
      `)
      this.gl.compileShader(fragmentShader)
      this.program = this.gl.createProgram()
      this.gl.attachShader(this.program, vertexShader)
      this.gl.attachShader(this.program, fragmentShader)
      this.gl.linkProgram(this.program)
      this.gl.useProgram(this.program)
    },
    createBuffers() {
      const positionBuffer = this.gl.createBuffer()
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW)
      const positionLocation = this.gl.getAttribLocation(this.program, 'position')
      this.gl.enableVertexAttribArray(positionLocation)
      this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0)
      const colorBuffer = this.gl.createBuffer()
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer)
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colors, this.gl.STATIC_DRAW)
      const colorLocation = this.gl.getAttribLocation(this.program, 'color')
      this.gl.enableVertexAttribArray(colorLocation)
      this.gl.vertexAttribPointer(colorLocation, 3, this.gl.FLOAT, false, 0, 0)
    },
    createPerspectiveMatrix(fieldOfViewRadians, aspect, near, far) {
      const f = 1.0 / Math.tan(fieldOfViewRadians / 2)
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) / (near - far), -1,
        0, 0, (2 * far * near) / (near - far), 0
      ])
    },
    createModelMatrix() {
      const rx = this.modelRotation.x * Math.PI / 180
      const ry = this.modelRotation.y * Math.PI / 180
      const rz = this.modelRotation.z * Math.PI / 180
      const cx = Math.cos(rx), sx = Math.sin(rx)
      const cy = Math.cos(ry), sy = Math.sin(ry)
      const cz = Math.cos(rz), sz = Math.sin(rz)
      return new Float32Array([
        cy * cz, sx * sy * cz - cx * sz, cx * sy * cz + sx * sz, 0,
        cy * sz, sx * sy * sz + cx * cz, cx * sy * sz - sx * cz, 0,
        -sy, sx * cy, cx * cy, 0,
        this.modelPosition.x, this.modelPosition.y, this.modelPosition.z, 1
      ])
    },
    createViewMatrix() {
      const zAxis = this.normalize({
        x: this.cameraPosition.x - this.cameraTarget.x,
        y: this.cameraPosition.y - this.cameraTarget.y,
        z: this.cameraPosition.z - this.cameraTarget.z
      })
      const xAxis = this.normalize(this.crossProduct(this.upVector, zAxis))
      const yAxis = this.crossProduct(zAxis, xAxis)
      return new Float32Array([
        xAxis.x, yAxis.x, zAxis.x, 0,
        xAxis.y, yAxis.y, zAxis.y, 0,
        xAxis.z, yAxis.z, zAxis.z, 0,
        -this.dot(xAxis, this.cameraPosition),
        -this.dot(yAxis, this.cameraPosition),
        -this.dot(zAxis, this.cameraPosition),
        1
      ])
    },
    normalize(v) {
      const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
      if (length < 0.000001) return v
      return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
      }
    },
    crossProduct(a, b) {
      return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
      }
    },
    dot(a, b) {
      return a.x * b.x + a.y * b.y + a.z * b.z
    },
    updateCamera(deltaX, deltaY) {
      const rotationSpeed = 0.01
      this.cameraRotation.y += deltaX * rotationSpeed
      this.cameraRotation.x += deltaY * rotationSpeed
      this.cameraRotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, this.cameraRotation.x))
      const radius = 5.0
      this.cameraPosition.x = radius * Math.cos(this.cameraRotation.x) * Math.sin(this.cameraRotation.y)
      this.cameraPosition.y = radius * Math.sin(this.cameraRotation.x)
      this.cameraPosition.z = radius * Math.cos(this.cameraRotation.x) * Math.cos(this.cameraRotation.y)
      this.render()
    },
    startDrag(event) {
      this.isDragging = true
      this.lastMouseX = event.clientX
      this.lastMouseY = event.clientY
    },
    handleMouseMove(event) {
      if (!this.isDragging) return
      const deltaX = event.clientX - this.lastMouseX
      const deltaY = event.clientY - this.lastMouseY
      this.lastMouseX = event.clientX
      this.lastMouseY = event.clientY
      this.updateCamera(deltaX, deltaY)
    },
    stopDrag() {
      this.isDragging = false
    },
    render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
      const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight
      const perspectiveMatrix = this.createPerspectiveMatrix(
        this.fov * Math.PI / 180,
        aspect,
        this.near,
        this.far
      )
      const modelMatrix = this.createModelMatrix()
      const viewMatrix = this.createViewMatrix()
      const perspectiveLocation = this.gl.getUniformLocation(this.program, 'perspectiveMatrix')
      const modelLocation = this.gl.getUniformLocation(this.program, 'modelMatrix')
      const viewLocation = this.gl.getUniformLocation(this.program, 'viewMatrix')
      this.gl.uniformMatrix4fv(perspectiveLocation, false, perspectiveMatrix)
      this.gl.uniformMatrix4fv(modelLocation, false, modelMatrix)
      this.gl.uniformMatrix4fv(viewLocation, false, viewMatrix)
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 36)
    }
  }
}
</script>
<template>
  <div class="container">
    <canvas ref="canvas" @mousedown="startDrag" @mousemove="handleMouseMove" @mouseup="stopDrag" @mouseleave="stopDrag"
      width="600" height="600">
    </canvas>
    <div class="controls">
      <div class="glass-panel">
        <div class="control-group">
          <h3>Model Position</h3>
          <div class="slider-container">
            <label>X: <span class="value">{{ modelPosition.x }}</span></label>
            <input type="range" min="-5" max="5" step="0.1" v-model="modelPosition.x" @input="render">
          </div>
          <div class="slider-container">
            <label>Y: <span class="value">{{ modelPosition.y }}</span></label>
            <input type="range" min="-5" max="5" step="0.1" v-model="modelPosition.y" @input="render">
          </div>
          <div class="slider-container">
            <label>Z: <span class="value">{{ modelPosition.z }}</span></label>
            <input type="range" min="-5" max="5" step="0.1" v-model="modelPosition.z" @input="render">
          </div>
        </div>
        <div class="control-group">
          <h3>Model Rotation</h3>
          <div class="slider-container">
            <label>X: <span class="value">{{ modelRotation.x }}°</span></label>
            <input type="range" min="0" max="360" v-model="modelRotation.x" @input="render">
          </div>
          <div class="slider-container">
            <label>Y: <span class="value">{{ modelRotation.y }}°</span></label>
            <input type="range" min="0" max="360" v-model="modelRotation.y" @input="render">
          </div>
          <div class="slider-container">
            <label>Z: <span class="value">{{ modelRotation.z }}°</span></label>
            <input type="range" min="0" max="360" v-model="modelRotation.z" @input="render">
          </div>
        </div>
        <div class="control-group">
          <h3>View Settings</h3>
          <div class="slider-container">
            <label>FOV: <span class="value">{{ fov }}°</span></label>
            <input type="range" min="30" max="120" v-model="fov" @input="render">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  align-items: flex-start;
  background-color: #f0f0f0;
  background-color: #a2d2ff;
}

canvas {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: grab;
}

canvas:active {
  cursor: grabbing;
}

.controls {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.control-group {
  margin-bottom: 24px;
}

.control-group:last-child {
  margin-bottom: 0;
}

h3 {
  color: #333;
  margin: 0 0 16px 0;
  font-size: 1.2em;
  font-weight: 600;
}

.slider-container {
  margin-bottom: 12px;
}

label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #444;
  margin-bottom: 4px;
  font-weight: 500;
}

.value {
  color: #666;
  font-size: 0.9em;
  min-width: 40px;
  text-align: right;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  appearance: none;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s, box-shadow 0.1s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s, box-shadow 0.1s;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  canvas {
    width: 100%;
    height: auto;
  }

  .controls {
    width: 100%;
    max-width: none;
  }

  .glass-panel {
    border-radius: 12px;
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }

  .glass-panel {
    border-radius: 8px;
    padding: 12px;
  }

  h3 {
    font-size: 1.1em;
  }

  .value {
    font-size: 0.8em;
  }
}
</style>
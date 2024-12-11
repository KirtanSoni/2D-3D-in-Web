<script>
export default {
    name: 'Orthographic',
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
                1.0, -1.0, 1.0
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
                0.8, 0.0, 0.8
            ]),
            posX: 0,
            posY: 0,
            posZ: 0,
            rotX: 0,
            rotY: 0,
            rotZ: 0
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
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec3 vColor;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
        createOrthographicMatrix(left, right, bottom, top, near, far) {
            return new Float32Array([
                2 / (right - left), 0, 0, 0,
                0, 2 / (top - bottom), 0, 0,
                0, 0, -2 / (far - near), 0,
                -(right + left) / (right - left),
                -(top + bottom) / (top - bottom),
                -(far + near) / (far - near),
                1
            ])
        },
        createModelViewMatrix() {
            const translation = [this.posX, this.posY, this.posZ]
            const rx = this.rotX * Math.PI / 180
            const ry = this.rotY * Math.PI / 180
            const rz = this.rotZ * Math.PI / 180
            const cx = Math.cos(rx), sx = Math.sin(rx)
            const cy = Math.cos(ry), sy = Math.sin(ry)
            const cz = Math.cos(rz), sz = Math.sin(rz)
            return new Float32Array([
                cy * cz, sx * sy * cz - cx * sz, cx * sy * cz + sx * sz, 0,
                cy * sz, sx * sy * sz + cx * cz, cx * sy * sz - sx * cz, 0,
                -sy, sx * cy, cx * cy, 0,
                translation[0], translation[1], translation[2], 1
            ])
        },
        render() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
            const projectionMatrix = this.createOrthographicMatrix(-2, 2, -2, 2, -2, 2)
            const modelViewMatrix = this.createModelViewMatrix()
            const projectionLocation = this.gl.getUniformLocation(this.program, 'projectionMatrix')
            const modelViewLocation = this.gl.getUniformLocation(this.program, 'modelViewMatrix')
            this.gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix)
            this.gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix)
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 18)
        }
    },
    watch: {
        posX() { this.render() },
        posY() { this.render() },
        posZ() { this.render() },
        rotX() { this.render() },
        rotY() { this.render() },
        rotZ() { this.render() }
    }
}
</script>
<template>
    <div class="container">
        <canvas ref="canvas" width="600" height="600"></canvas>
        <div class="controls">
            <div class="glass-panel">
                <div class="control-group">
                    <h3>Position</h3>
                    <div class="slider-container">
                        <label>X: <span class="value">{{ posX }}</span></label>
                        <input type="range" min="-2" max="2" step="0.1" v-model="posX">
                    </div>
                    <div class="slider-container">
                        <label>Y: <span class="value">{{ posY }}</span></label>
                        <input type="range" min="-2" max="2" step="0.1" v-model="posY">
                    </div>
                    <div class="slider-container">
                        <label>Z: <span class="value">{{ posZ }}</span></label>
                        <input type="range" min="-2" max="2" step="0.1" v-model="posZ">
                    </div>
                </div>
                <div class="control-group">
                    <h3>Rotation</h3>
                    <div class="slider-container">
                        <label>X: <span class="value">{{ rotX }}°</span></label>
                        <input type="range" min="0" max="360" v-model="rotX">
                    </div>
                    <div class="slider-container">
                        <label>Y: <span class="value">{{ rotY }}°</span></label>
                        <input type="range" min="0" max="360" v-model="rotY">
                    </div>
                    <div class="slider-container">
                        <label>Z: <span class="value">{{ rotZ }}°</span></label>
                        <input type="range" min="0" max="360" v-model="rotZ">
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
    background-color: #a2d2ff;
    border-radius: 1.2%;
}

canvas {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: white;
    width: 40%;
}

.controls {
    flex: 1;
}

.glass-panel {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 24px;
    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.1),
        inset 0 0 0 1px rgba(255, 255, 255, 0.2);
    color: #fff;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
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
    }
}
</style>
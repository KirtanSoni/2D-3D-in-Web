<script>
import ShaderCodeVisualiser from './ShaderCodeVisualiser.vue'
import { marked } from 'marked'
import renderIntro from './content/2DIntro.md?raw'
export default {
  name: 'WebGLBasicShapes',
  components: {
    ShaderCodeVisualiser
  },
  data() {
    return {
      renderIntro: '',
      currentShape: 'triangle',
      gl: null,
      activeTab: 'controls',
      canvas: null,
      shaderProgram: null,
      showCode: false,
      color: '#4287f5',
      size: 0.5,
      rotation: 0,
      shapes: ['triangle', 'square', 'circle', 'star', 'hexagon', 'pentagon'],
      animationId: null,
      isAnimating: false,
      circleShaderProgram: null
    }
  },
  created() {
    this.renderIntro = marked(renderIntro)
  },
  mounted() {
    this.initWebGL();
    this.drawShape();
  },
  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  computed: {
    colorRGBA() {
      const rgb = this.hexToRGB(this.color)
      return rgb.map(v => v.toFixed(2))
    },
    circleImplementation() {
      return `// Circle fragment shader
precision mediump float;
uniform vec4 uColor;
varying vec2 vPosition;
void main() {
  // Calculate distance from center (0,0)
  float distance = length(vPosition);
  // Discard fragments outside unit circle
  if (distance > 1.0) {
    discard;
  }
  gl_FragColor = uColor;
}`
    },
    shapeExplanation() {
      const explanations = {
        triangle: "A triangle is WebGL's most basic primitive. It's defined by three vertices in counterclockwise order to ensure proper facing.",
        square: "A square is created using two triangles via TRIANGLE_STRIP, requiring only 4 vertices instead of 6.",
        circle: "While we could approximate a circle with many triangles, we use a more efficient fragment shader approach with just a quad (4 vertices).",
        star: "A star shape uses TRIANGLE_FAN with alternating inner and outer radius points to create the star effect.",
        pentagon: "Created using TRIANGLE_FAN from a center point, requiring n+2 vertices for n sides.",
        hexagon: "Similar to pentagon, uses TRIANGLE_FAN with 8 vertices (6 sides + center and duplicate first point)."
      }
      return explanations[this.currentShape] || ""
    },
    vertexDefinition() {
      const definitions = {
        triangle: `// Define triangle vertices (counterclockwise)
    const vertices = new Float32Array([
      0.0,  0.5,  // top vertex
      -0.5, -0.5, // bottom left
      0.5, -0.5   // bottom right
    ]);`,
        square: `// Define square vertices for TRIANGLE_STRIP
    const vertices = new Float32Array([
      -0.5,  0.5, // top left
      -0.5, -0.5, // bottom left
      0.5,  0.5,  // top right
      0.5, -0.5   // bottom right
    ]);`,
        circle: `// Define quad vertices for circle
    const vertices = new Float32Array([
      -1,  1,  // top left
      -1, -1,  // bottom left
      1,  1,  // top right
      1, -1   // bottom right
    ]);`,
        star: `// Define star vertices using TRIANGLE_FAN
    const vertices = createStar();  // See createStar() method
    // Points alternate between outer (0.5) and inner (0.25) radius`,
        pentagon: `// Define pentagon vertices using TRIANGLE_FAN
    const vertices = createRegularPolygon(5);  // Creates 5-sided polygon
    // Center point + 5 vertices + duplicate first vertex`,
        hexagon: `// Define hexagon vertices using TRIANGLE_FAN
    const vertices = createRegularPolygon(6);  // Creates 6-sided polygon
    // Center point + 6 vertices + duplicate first vertex`
      }
      return definitions[this.currentShape] || ""
    },
    drawingMethodExplanation() {
      const methods = {
        triangle: "TRIANGLES draws one triangle from every three vertices.",
        square: "TRIANGLE_STRIP creates triangles from adjacent vertices, reducing vertex count.",
        circle: "Uses a quad (TRIANGLE_STRIP) with fragment shader calculations.",
      }
      return methods[this.currentShape] || ""
    },
    transformationCode() {
      return `// Set transformation uniforms
gl.uniform4fv(colorLocation, [${this.colorRGBA.join(', ')}]);
gl.uniform1f(sizeLocation, ${this.size});
gl.uniform1f(rotationLocation, ${this.rotation.toFixed(4)});
// Vertex shader transformation
vec2 rotated = mat2(
  cos(uRotation), -sin(uRotation),
  sin(uRotation), cos(uRotation)
) * aVertexPosition.xy;
gl_Position = vec4(rotated * uSize, 0.0, 1.0);`
    },
    conceptExplanation() {
      const commonConcepts = `
- WebGL uses normalized device coordinates (-1 to 1)
- Vertices are processed in the order they're defined
- Transformations are applied in vertex shader
- Colors and other attributes can be set via uniforms
Drawing Mode: ${this.getDrawingMode}
Vertex Count: ${this.getVertexCount}
Buffer Usage: STATIC_DRAW (for non-changing vertex data)`
      return commonConcepts
    },
    drawingCode() {
      const drawingCodes = {
        triangle: `gl.drawArrays(gl.TRIANGLES, 0, 3);`,
        square: `gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);`,
        circle: `// Using fragment shader for circle
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);`,
        star: `gl.drawArrays(gl.TRIANGLE_FAN, 0, 10);  // 5 points * 2 vertices`,
        pentagon: `gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);  // 5 sides + center + duplicate`,
        hexagon: `gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);  // 6 sides + center + duplicate`
      }
      return drawingCodes[this.currentShape] || ""
    },
    getDrawingMode() {
      const modes = {
        triangle: 'gl.TRIANGLES',
        square: 'gl.TRIANGLE_STRIP',
        circle: 'gl.TRIANGLE_STRIP with fragment shader',
        star: 'gl.TRIANGLE_FAN',
        pentagon: 'gl.TRIANGLE_FAN',
        hexagon: 'gl.TRIANGLE_FAN'
      }
      return modes[this.currentShape]
    },
    getVertexCount() {
      const counts = {
        triangle: '3 vertices (1 triangle)',
        square: '4 vertices (2 triangles)',
        circle: '4 vertices (quad)',
        star: '12 vertices (10 triangles)',
        pentagon: '7 vertices (5 triangles)',
        hexagon: '8 vertices (6 triangles)'
      }
      return counts[this.currentShape]
    }
  },
  methods: {
    initWebGL() {
      this.canvas = this.$refs.glCanvas;
      this.gl = this.canvas.getContext('webgl');
      if (!this.gl) {
        alert('WebGL not supported');
        return;
      }
      const vsSource = `
        attribute vec4 aVertexPosition;
        uniform float uRotation;
        uniform float uSize;
        void main() {
          float s = sin(uRotation);
          float c = cos(uRotation);
          mat2 rotation = mat2(c, -s, s, c);
          vec2 rotated = rotation * aVertexPosition.xy;
          gl_Position = vec4(rotated * uSize, 0.0, 1.0);
        }
      `;
      const fsSource = `
        precision mediump float;
        uniform vec4 uColor;
        void main() {
          gl_FragColor = uColor;
        }
      `;
      const circleVsSource = `
        attribute vec4 aVertexPosition;
        uniform float uRotation;
        uniform float uSize;
        varying vec2 vPosition;
        void main() {
          float s = sin(uRotation);
          float c = cos(uRotation);
          mat2 rotation = mat2(c, -s, s, c);
          vec2 rotated = rotation * aVertexPosition.xy;
          gl_Position = vec4(rotated * uSize, 0.0, 1.0);
          vPosition = aVertexPosition.xy;
        }
      `;
      const circleFsSource = `
        precision mediump float;
        uniform vec4 uColor;
        varying vec2 vPosition;
        void main() {
          float distance = length(vPosition);
          if (distance > 1.0) {
            discard;
          }
          gl_FragColor = uColor;
        }
      `;
      const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);
      this.shaderProgram = this.gl.createProgram();
      this.gl.attachShader(this.shaderProgram, vertexShader);
      this.gl.attachShader(this.shaderProgram, fragmentShader);
      this.gl.linkProgram(this.shaderProgram);
      const circleVertexShader = this.createShader(this.gl.VERTEX_SHADER, circleVsSource);
      const circleFragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, circleFsSource);
      this.circleShaderProgram = this.gl.createProgram();
      this.gl.attachShader(this.circleShaderProgram, circleVertexShader);
      this.gl.attachShader(this.circleShaderProgram, circleFragmentShader);
      this.gl.linkProgram(this.circleShaderProgram);
      if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        alert('Unable to initialize shader program');
        return;
      }
    },
    createShader(type, source) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        alert('Shader compilation error: ' + this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
      }
      return shader;
    },
    getShapeVertices(shape) {
      switch (shape) {
        case 'triangle':
          return new Float32Array([
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
          ]);
        case 'square':
          return new Float32Array([
            -0.5, 0.5,
            -0.5, -0.5,
            0.5, 0.5,
            0.5, -0.5
          ]);
        case 'pentagon':
          return this.createRegularPolygon(5);
        case 'hexagon':
          return this.createRegularPolygon(6);
        case 'star':
          return this.createStar();
        case 'circle':
          return new Float32Array([
            -1, 1,
            -1, -1,
            1, 1,
            1, -1
          ]);
        default:
          return new Float32Array([]);
      }
    },
    createRegularPolygon(sides) {
      const vertices = [];
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        vertices.push(Math.cos(angle) * 0.5);
        vertices.push(Math.sin(angle) * 0.5);
      }
      return new Float32Array(vertices);
    },
    createStar() {
      const vertices = [];
      const points = 5;
      const innerRadius = 0.25;
      const outerRadius = 0.5;
      vertices.push(0.0);
      vertices.push(0.0);
      for (let i = 0; i <= points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI / points) - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        vertices.push(x);
        vertices.push(y);
      }
      return new Float32Array(vertices);
    },
    hexToRGB(hex) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b, 1.0];
    },
    drawShape() {
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      const vertices = this.getShapeVertices(this.currentShape);
      const vertexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
      this.gl.useProgram(this.shaderProgram);
      const colorLocation = this.gl.getUniformLocation(this.shaderProgram, 'uColor');
      const rotationLocation = this.gl.getUniformLocation(this.shaderProgram, 'uRotation');
      const sizeLocation = this.gl.getUniformLocation(this.shaderProgram, 'uSize');
      this.gl.uniform4fv(colorLocation, this.hexToRGB(this.color));
      this.gl.uniform1f(rotationLocation, this.rotation);
      this.gl.uniform1f(sizeLocation, this.size);
      const positionAttrib = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
      this.gl.enableVertexAttribArray(positionAttrib);
      this.gl.vertexAttribPointer(positionAttrib, 2, this.gl.FLOAT, false, 0, 0);
      if (this.currentShape === 'square') {
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      } else if (this.currentShape === 'circle') {
        this.gl.useProgram(this.circleShaderProgram);
        const colorLocation = this.gl.getUniformLocation(this.circleShaderProgram, 'uColor');
        const rotationLocation = this.gl.getUniformLocation(this.circleShaderProgram, 'uRotation');
        const sizeLocation = this.gl.getUniformLocation(this.circleShaderProgram, 'uSize');
        const positionAttrib = this.gl.getAttribLocation(this.circleShaderProgram, 'aVertexPosition');
        this.gl.uniform4fv(colorLocation, this.hexToRGB(this.color));
        this.gl.uniform1f(rotationLocation, this.rotation);
        this.gl.uniform1f(sizeLocation, this.size);
        this.gl.enableVertexAttribArray(positionAttrib);
        this.gl.vertexAttribPointer(positionAttrib, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      } else if (this.currentShape === 'star') {
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, vertices.length / 2);
      } else {
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, vertices.length / 2);
      }
      if (this.isAnimating) {
        this.rotation += 0.01;
        this.animationId = requestAnimationFrame(this.drawShape);
      }
    },
    toggleAnimation() {
      this.isAnimating = !this.isAnimating;
      if (this.isAnimating) {
        this.drawShape();
      } else {
        cancelAnimationFrame(this.animationId);
      }
    },
    changeShape(shape) {
      this.currentShape = shape;
      this.drawShape();
    },
    updateColor(newColor) {
      this.color = newColor;
      this.drawShape();
    },
    updateSize(newSize) {
      this.size = newSize;
      this.drawShape();
    },
    updateRotation(newRotation) {
      this.rotation = (newRotation * Math.PI) / 180;
      this.drawShape();
    }
  }
}
</script>
<template>
  <div class="learning-activity" id="2d-rendering">
    <div v-html="renderIntro"></div>
    <h3>Activity 2: 2D Rendering</h3>
    <div class="interactive-demo">
      <div class="canvas-container">
        <canvas ref="glCanvas" width="400" height="400"></canvas>
      </div>
      <div class="right-panel">
        <div class="tab-buttons">
          <button @click="activeTab = 'controls'" :class="{ active: activeTab === 'controls' }">
            Controls
          </button>
          <button @click="activeTab = 'implementation'" :class="{ active: activeTab === 'implementation' }">
            Implementation
          </button>
        </div>
        <div v-if="activeTab === 'controls'" class="controls-section">
          <div class="control-group">
            <label>Shapes:</label>
            <div class="shape-buttons">
              <button v-for="shape in shapes" :key="shape" @click="changeShape(shape)"
                :class="{ active: currentShape === shape }">
                {{ shape.charAt(0).toUpperCase() + shape.slice(1) }}
              </button>
            </div>
            <div class="code-snippet">
              <pre><code>
const vertices = new Float32Array([
  {{ getShapeVertices(currentShape).toString().replace(/,/g, ',\n  ') }}
])</code></pre>
            </div>
          </div>
          <div class="control-group">
            <label>Color:</label>
            <input type="color" v-model="color" @input="updateColor(color)">
            <div class="code-snippet">
              <pre><code>
gl.uniform4fv(colorLocation, [{{ hexToRGB(color).join(', ') }}])</code></pre>
            </div>
          </div>
          <div class="control-group">
            <label>Size (0.1 - 1.0):</label>
            <input type="range" min="0.1" max="1.0" step="0.1" v-model="size"
              @input="updateSize(parseFloat($event.target.value))">
            <div class="code-snippet">
              <pre><code>
gl.uniform1f(sizeLocation, {{ size }})</code></pre>
            </div>
          </div>
          <div class="control-group">
            <label>Rotation (degrees):</label>
            <input type="range" min="0" max="360" v-model="rotation"
              @input="updateRotation(parseFloat($event.target.value))">
            <div class="code-snippet">
              <pre><code>
gl.uniform1f(rotationLocation, {{ rotation.toFixed(4) }})</code></pre>
            </div>
          </div>
        </div>
        <div v-else class="implementation-section">
          <div class="step">
            <h4>1. Shape Definition</h4>
            <p>{{ shapeExplanation }}</p>
            <div class="code-snippet">
              <pre><code>{{ vertexDefinition }}</code></pre>
            </div>
          </div>
          <div class="step">
            <h4>2. Drawing Method</h4>
            <p>{{ drawingMethodExplanation }}</p>
            <div class="code-snippet">
              <pre><code>{{ drawingCode }}</code></pre>
            </div>
          </div>
          <div class="step">
            <h4>3. Transformations</h4>
            <p>Current transformations applied:</p>
            <ul>
              <li>Color: RGBA({{ colorRGBA.join(', ') }})</li>
              <li>Scale: {{ size }}</li>
              <li>Rotation: {{ (rotation * 180 / Math.PI).toFixed(2) }}°</li>
            </ul>
            <div class="code-snippet">
              <pre><code>{{ transformationCode }}</code></pre>
            </div>
          </div>
          <div v-if="currentShape === 'circle'" class="step">
            <h4>Special Note on Circle Implementation</h4>
            <p>Unlike other shapes, circles use fragment shader calculations instead of many vertices:</p>
            <div class="code-snippet">
              <pre><code>{{ circleImplementation }}</code></pre>
            </div>
          </div>
          <div class="step">
            <h4>WebGL Concepts Used</h4>
            <div class="concept-explanation">
              <div class="concept-point">
                <strong>Coordinate System</strong>
                WebGL uses normalized device coordinates (-1 to 1)
              </div>
              <div class="concept-point">
                <strong>Vertex Processing</strong>
                Vertices are processed in the order they're defined
              </div>
              <div class="concept-point">
                <strong>Transformations</strong>
                Applied in vertex shader via matrix operations
              </div>
              <div class="concept-point">
                <strong>Drawing Mode</strong>
                {{ getDrawingMode }}
              </div>
              <div class="concept-point">
                <strong>Vertex Count</strong>
                {{ getVertexCount }}
              </div>
              <div class="concept-point">
                <strong>Buffer Usage</strong>
                STATIC_DRAW (for non-changing vertex data)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ShaderCodeVisualiser />
</template>
<style scoped>
.learning-activity {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.interactive-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: start;
}

.canvas-container {
  background: #000;
  padding: 1rem;
  border-radius: 8px;
  top: 2rem;
}

canvas {
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.controls-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  max-height: 600px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.control-group:last-child {
  margin-bottom: 0;
}

.shape-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

button.active {
  background: #2c3e50;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="range"] {
  width: 100%;
}

input[type="color"] {
  width: 60px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 4px;
}

.code-section {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
}

.controls-section::-webkit-scrollbar {
  width: 8px;
}

.controls-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.controls-section::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.controls-section::-webkit-scrollbar-thumb:hover {
  background: #555;
}

h2,
h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

label {
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

@media (max-width: 1024px) {
  .interactive-demo {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .learning-activity {
    padding: 1rem;
  }

  .shape-buttons {
    flex-direction: column;
  }

  button {
    width: 100%;
  }

  .code-content {
    font-size: 14px;
  }

  .explanation-tab {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
  }

  .code-snippet {
    margin-top: 1rem;
    background: #1a202c;
    border-radius: 8px;
    overflow: hidden;
  }

  .code-snippet pre {
    margin: 0;
    padding: 1.5rem;
  }

  .code-snippet code {
    font-family: 'Fira Code', monospace;
    color: #e2e8f0;
    font-size: 0.9rem;
  }
}

.step {
  margin-bottom: 2rem;
}

.step:last-child {
  margin-bottom: 0;
}

.step h4 {
  color: #2d3748;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.concept-explanation {
  background: #edf2f7;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.implementation-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tab-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-buttons button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px 8px 0 0;
  background: #e2e8f0;
  color: #4a5568;
}

.tab-buttons button.active {
  background: #fff;
  color: #2d3748;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.implementation-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.step {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.step h4 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step h4::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 24px;
  background: #3498db;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 24px;
  font-size: 0.9rem;
}

.step p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.step ul li {
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.concept-explanation {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
}

.concept-point {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #3498db;
  display: flex;
  flex-direction: column;
}

.concept-point strong {
  color: #2d3748;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
</style>
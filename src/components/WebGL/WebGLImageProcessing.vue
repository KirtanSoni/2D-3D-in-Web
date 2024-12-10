
<script>
import processImage from './process_image.png'
import ImageTexture from './ImageTexture.svg'
export default {

  name: 'WebGLImageProcessing',
  data() {
    return {
      gl: null,
      canvas: null,
      image: null,
      imageLoaded: false,
      currentEffect: 'normal',
      effects: [
        { id: 'normal', name: 'Normal' },
        { id: 'grayscale', name: 'Grayscale' },
        { id: 'blur', name: 'Gaussian Blur' },
        { id: 'sharpen', name: 'Sharpen' },
        { id: 'edge', name: 'Edge Detection' },
        { id: 'emboss', name: 'Emboss' }
      ],
      activeTab: 'controls',
      // Effect parameters
      blurRadius: 2,
      sharpenStrength: 1,
      edgeThreshold: 0.1,
      embossStrength: 1,
      // Shader programs
      shaderPrograms: {},
      // Sample image URL
      sampleImage: processImage
    }
  },
  computed: {
    currentEffectDetails() {
      const details = {
        normal: {
          title: 'Original Image',
          description: 'No processing applied. Direct texture mapping to the canvas.',
          implementation: 'Simple texture lookup with no modifications.',
          code: `void main() {
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}`
        },
        grayscale: {
          title: 'Grayscale Conversion',
          description: 'Converts color image to grayscale using luminance weights.',
          implementation: 'Uses RGB to grayscale conversion formula: 0.299R + 0.587G + 0.114B',
          code: `void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = vec4(vec3(gray), 1.0);
}`
        },
        blur: {
          title: 'Gaussian Blur',
          description: 'Applies gaussian blur using a two-pass separable kernel.',
          implementation: 'Samples neighboring pixels with gaussian weights.',
          code: `uniform float uRadius;
void main() {
  vec4 sum = vec4(0.0);
  float blur = uRadius / resolution.x;
  
  // 5x5 gaussian kernel
  for(float x = -2.0; x <= 2.0; x++) {
    for(float y = -2.0; y <= 2.0; y++) {
      vec2 offset = vec2(x, y) * blur;
      sum += texture2D(uSampler, vTextureCoord + offset);
    }
  }
  
  gl_FragColor = sum / 25.0;
}`
        },
        sharpen: {
      title: 'Image Sharpening',
      description: 'Enhances edges by increasing contrast between adjacent pixels.',
      implementation: 'Uses a 3x3 kernel that amplifies differences between center and neighboring pixels.',
      code: this.getFragmentShaderSource('sharpen')
    },
    edge: {
      title: 'Edge Detection',
      description: 'Detects edges by finding areas of high contrast.',
      implementation: 'Calculates differences between adjacent pixels and applies threshold.',
      code: this.getFragmentShaderSource('edge')
    },
    emboss: {
      title: 'Emboss Effect',
      description: 'Creates a 3D-like effect by highlighting edges in a directional manner.',
      implementation: 'Calculates directional gradient and adds offset.',
      code: this.getFragmentShaderSource('emboss')
    }
      }
      return details[this.currentEffect]
    }
  },
  mounted() {
    this.initWebGL()
    this.loadImage()
  },
  methods: {
    initWebGL() {
      this.canvas = this.$refs.glCanvas
      this.gl = this.canvas.getContext('webgl')
      
      if (!this.gl) {
        alert('WebGL not supported')
        return
      }

      // Initialize shader programs for each effect
      this.initShaderPrograms()
    },

    initShaderPrograms() {
  // Common vertex shader for image processing
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
    varying vec2 vTextureCoord;
    
    void main(void) {
      gl_Position = aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

  // Create shader programs for each effect
  this.effects.forEach(effect => {
    const fsSource = this.getFragmentShaderSource(effect.id);
    const program = this.createShaderProgram(vsSource, fsSource);
    
    if (program) {
      this.shaderPrograms[effect.id] = program;
    } else {
      console.error(`Failed to create shader program for effect: ${effect.id}`);
    }
  });
},

getFragmentShaderSource(effectId) {
  const shaders = {
    normal: `
      precision mediump float;
      uniform sampler2D uSampler;
      varying vec2 vTextureCoord;
      
      void main(void) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
      }
    `,
    grayscale: `
      precision mediump float;
      uniform sampler2D uSampler;
      varying vec2 vTextureCoord;
      
      void main(void) {
        vec4 color = texture2D(uSampler, vTextureCoord);
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        gl_FragColor = vec4(vec3(gray), 1.0);
      }
    `,
    blur: `
      precision mediump float;
      uniform sampler2D uSampler;
      uniform float uRadius;
      varying vec2 vTextureCoord;
      
      void main(void) {
        vec4 sum = vec4(0.0);
        float blur = uRadius / 100.0;
        sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;
        sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;
        sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;
        sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;
        sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.18;
        sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;
        sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;
        sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;
        sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;
        gl_FragColor = sum;
      }
    `,
    sharpen: `
      precision mediump float;
      uniform sampler2D uSampler;
      uniform float uStrength;
      varying vec2 vTextureCoord;
      
      void main(void) {
        vec2 texel = vec2(1.0 / 512.0);
        vec4 center = texture2D(uSampler, vTextureCoord);
        vec4 top = texture2D(uSampler, vTextureCoord + vec2(0.0, -1.0) * texel);
        vec4 bottom = texture2D(uSampler, vTextureCoord + vec2(0.0, 1.0) * texel);
        vec4 left = texture2D(uSampler, vTextureCoord + vec2(-1.0, 0.0) * texel);
        vec4 right = texture2D(uSampler, vTextureCoord + vec2(1.0, 0.0) * texel);
        
        gl_FragColor = center * (1.0 + 4.0 * uStrength) - (top + bottom + left + right) * uStrength;
      }
    `,
    edge: `
      precision mediump float;
      uniform sampler2D uSampler;
      uniform float uThreshold;
      varying vec2 vTextureCoord;
      
      void main(void) {
        vec2 texel = vec2(1.0 / 512.0);
        vec4 center = texture2D(uSampler, vTextureCoord);
        vec4 top = texture2D(uSampler, vTextureCoord + vec2(0.0, -1.0) * texel);
        vec4 bottom = texture2D(uSampler, vTextureCoord + vec2(0.0, 1.0) * texel);
        vec4 left = texture2D(uSampler, vTextureCoord + vec2(-1.0, 0.0) * texel);
        vec4 right = texture2D(uSampler, vTextureCoord + vec2(1.0, 0.0) * texel);
        
        vec4 edges = abs(top - bottom) + abs(left - right);
        gl_FragColor = vec4(step(uThreshold, edges.rgb), 1.0);
      }
    `,
    emboss: `
      precision mediump float;
      uniform sampler2D uSampler;
      uniform float uStrength;
      varying vec2 vTextureCoord;
      
      void main(void) {
        vec2 texel = vec2(1.0 / 512.0);
        vec4 top = texture2D(uSampler, vTextureCoord + vec2(-1.0, -1.0) * texel);
        vec4 bottom = texture2D(uSampler, vTextureCoord + vec2(1.0, 1.0) * texel);
        vec4 diff = (bottom - top) * uStrength + 0.5;
        gl_FragColor = vec4(diff.rgb, 1.0);
      }
    `
  };
  return shaders[effectId];
},

    loadImage() {
      this.image = new Image()
      this.image.crossOrigin = 'anonymous'
      this.image.onload = () => {
        this.imageLoaded = true
        this.resizeCanvasToImage()
        this.drawImage()
      }
      this.image.src = this.sampleImage
    },

    resizeCanvasToImage() {
  // Set canvas size to maintain image aspect ratio within its container
  const containerWidth = this.canvas.parentElement.clientWidth;
  const containerHeight = this.canvas.parentElement.clientHeight || containerWidth;
  const imageAspect = this.image.width / this.image.height;
  const containerAspect = containerWidth / containerHeight;
  
  let width, height;
  
  if (imageAspect > containerAspect) {
    width = containerWidth;
    height = containerWidth / imageAspect;
  } else {
    height = containerHeight;
    width = containerHeight * imageAspect;
  }
  
  this.canvas.width = width;
  this.canvas.height = height;
  this.gl.viewport(0, 0, width, height);
},

drawImage() {
  const program = this.shaderPrograms[this.currentEffect];
  this.gl.useProgram(program);

  const buffers = this.setupBuffers();
  
  const positionLocation = this.gl.getAttribLocation(program, 'aVertexPosition');
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
  this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  this.gl.enableVertexAttribArray(positionLocation);

  const texCoordLocation = this.gl.getAttribLocation(program, 'aTextureCoord');
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.textureCoord);
  this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
  this.gl.enableVertexAttribArray(texCoordLocation);

  const texture = this.createTexture(this.image);
  
  const samplerLocation = this.gl.getUniformLocation(program, 'uSampler');
  this.gl.uniform1i(samplerLocation, 0);

  switch(this.currentEffect) {
    case 'blur':
      this.gl.uniform1f(
        this.gl.getUniformLocation(program, 'uRadius'),
        this.blurRadius
      );
      break;
    
    case 'sharpen':
      this.gl.uniform1f(
        this.gl.getUniformLocation(program, 'uStrength'),
        this.sharpenStrength
      );
      break;
    
    case 'edge':
      this.gl.uniform1f(
        this.gl.getUniformLocation(program, 'uThreshold'),
        this.edgeThreshold
      );
      break;
    
    case 'emboss':
      this.gl.uniform1f(
        this.gl.getUniformLocation(program, 'uStrength'),
        this.embossStrength
      );
      break;
  }
  this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
},
    
    createShaderProgram(vsSource, fsSource) {
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);

    // Check if shader creation failed
    if (!vertexShader || !fragmentShader) {
        console.error('Failed to create shaders');
        return null;
    }

    const program = this.gl.createProgram();
    
    try {
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        console.error('Unable to initialize shader program:', 
            this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
        return null;
        }

        return program;
    } catch (e) {
        console.error('Error creating shader program:', e);
        return null;
    }
    },

  createShader(type, source) {
  const shader = this.gl.createShader(type);
  this.gl.shaderSource(shader, source);
  this.gl.compileShader(shader);

  if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', 
      this.gl.getShaderInfoLog(shader));
    console.error('Shader source:', source);
    this.gl.deleteShader(shader);
    return null;
  }

  return shader;
},
 setupBuffers() {

  const positions = new Float32Array([
    
    -1.0,  1.0,   
    -1.0, -1.0,   
     1.0,  1.0,   
     1.0, -1.0    
  ]);

  const positionBuffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

  const textureCoords = new Float32Array([
    0.0, 0.0, 
    0.0, 1.0,    
    1.0, 0.0,  
    1.0, 1.0     
  ]);

  const textureCoordBuffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordBuffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, textureCoords, this.gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
  };
},

  createTexture(image) {
    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, 
      this.gl.UNSIGNED_BYTE, image);

    return texture;
  },

  applyEffect() {
  switch(this.currentEffect) {
    case 'blur':
      this.gl.uniform1f(
        this.gl.getUniformLocation(this.shaderPrograms.blur, 'uRadius'),
        this.blurRadius
      )
      break
      
    case 'sharpen':
      this.gl.uniform1f(
        this.gl.getUniformLocation(this.shaderPrograms.sharpen, 'uStrength'),
        this.sharpenStrength
      )
      break
      
    case 'edge':
      this.gl.uniform1f(
        this.gl.getUniformLocation(this.shaderPrograms.edge, 'uThreshold'),
        this.edgeThreshold
      )
      break
      
    case 'emboss':
      this.gl.uniform1f(
        this.gl.getUniformLocation(this.shaderPrograms.emboss, 'uStrength'),
        this.embossStrength
      )
      break
  }

  this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)  
},

    changeEffect(effectId) {
      this.currentEffect = effectId
      this.drawImage()
    }
  }
}
</script>

<template>
  <div class="image-processing">
    <h2> Image Processing with WebGL</h2>
    <div class="intro-section">
        <p>One of the most basic features of WebGL is image processing. It leverages the GPUs capabilities to perform these transformations on arrays of pixels at a time.
            This overcomes the traditional limitation of processing images via javascript which can only process one pixel at a time. 
        </p>
        <p>The process begins by loading the source image onto a texture- a GPU accessible format that stores an image as 2D array of pixels with color and intensity information.
            The vertex shader is responsible for the geometrical transformation of the image (usually a rectangle). It places the image in clip space for further transformations by subsequent shaders.
            Next, the fragment shader colors in the image pixel by pixel. It applies operations such as color space conversions, convolution filters, and mathematical operations for
            brightness and intensity. 
        </p>
        <img src="./ImageTexture.svg" class="content-image"/>
    </div>

    <div class="interactive-demo">
      <div class="canvas-container">
        <canvas ref="glCanvas"></canvas>
      </div>

      <div class="right-panel">
        <div class="tab-buttons">
          <button 
            @click="activeTab = 'controls'"
            :class="{ active: activeTab === 'controls' }"
          >
            Controls
          </button>
          <button 
            @click="activeTab = 'implementation'"
            :class="{ active: activeTab === 'implementation' }"
          >
            Implementation
          </button>
        </div>

        <!-- Controls Tab -->
        <div v-if="activeTab === 'controls'" class="controls-section">
          <div class="control-group">
            <label>Effect:</label>
            <div class="effect-buttons">
              <button 
                v-for="effect in effects" 
                :key="effect.id"
                @click="changeEffect(effect.id)"
                :class="{ active: currentEffect === effect.id }"
              >
                {{ effect.name }}
              </button>
            </div>
          </div>

          <!-- Effect-specific controls -->
          <div v-if="currentEffect === 'blur'" class="control-group">
            <label>Blur Radius:</label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.1"
              v-model="blurRadius"
              @input="drawImage"
            >
          </div>
          <div v-if="currentEffect === 'sharpen'" class="control-group">
            <label>Sharpen Strength:</label>
            <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1"
                v-model="sharpenStrength"
                @input="drawImage"
            >
            </div>

            <div v-if="currentEffect === 'edge'" class="control-group">
            <label>Edge Threshold:</label>
            <input 
                type="range" 
                min="0" 
                max="0.5" 
                step="0.01"
                v-model="edgeThreshold"
                @input="drawImage"
            >
            </div>

            <div v-if="currentEffect === 'emboss'" class="control-group">
            <label>Emboss Strength:</label>
            <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1"
                v-model="embossStrength"
                @input="drawImage"
            >
            </div>
        </div>

        <!-- Implementation Tab -->
        <div v-else class="implementation-section">
          <div class="effect-details">
            <h3>{{ currentEffectDetails.title }}</h3>
            <p>{{ currentEffectDetails.description }}</p>
            
            <div class="implementation-notes">
              <h4>How it Works</h4>
              <p>{{ currentEffectDetails.implementation }}</p>
            </div>

            <div class="shader-code">
              <h4>Fragment Shader</h4>
              <pre><code>{{ currentEffectDetails.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro-section {
    max-width: 1200px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.content-image {
    display: block;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}
.learning-activity {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Grid layout */
.interactive-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  align-items: start;
}

/* Canvas styles */
.canvas-container {
  background: #000;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio container */
  position: relative;
  overflow: hidden;
}

canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

/* Controls section */
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

/* Control elements */
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
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
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

/* Code display sections */
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

.code-content {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #2d3748;
  color: #e2e8f0;
  overflow-x: auto;
  width: 100%;
  transition: all 0.3s ease;
}

.code-content pre {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.code-content code {
  display: block;
  padding: 1rem;
  white-space: pre-wrap;
  text-align: left;
}

/* Code snippets in controls */
.code-snippet {
  margin-top: 0.5rem;
  background: #1a202c;
  border-radius: 4px;
  padding: 0.75rem;
}

.code-snippet pre {
  margin: 0;
}

.code-snippet code {
  color: #e2e8f0;
  font-size: 0.85rem;
  white-space: pre-wrap;
}

/* Scrollbar styling */
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

/* Typography */
h2, h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

label {
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

/* Syntax highlighting */
.code-content .keyword { color: #ff79c6; }
.code-content .string { color: #f1fa8c; }
.code-content .comment { color: #6272a4; }

/* Responsive design */
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
/* Code snippets styling */
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
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

/* Add these styles */
.implementation-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
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

/* Transformations list styling */
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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

.effect-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.effect-details {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
}

.implementation-notes {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.shader-code {
  margin-top: 1.5rem;
}

.shader-code pre {
  background: #1a202c;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.shader-code code {
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
}
</style>

<script>
        const TRIANGLE_CODE = `// 1. Set up WebGL context
    const canvas = document.querySelector('#glCanvas');
    const gl = canvas.getContext('webgl');

    // 2. Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const vertexShaderSource = \`
        attribute vec2 a_position;
        attribute vec3 a_color;
        varying vec3 v_color;
        
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_color = a_color;
        }
    \`;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create buffers and load data
    const positions = new Float32Array([
        0.0,  0.5,    // top vertex
       -0.5, -0.5,    // bottom left vertex
        0.5, -0.5     // bottom right vertex
    ]);

    const colors = new Float32Array([
        1.0, 0.0, 0.0,  // red
        0.0, 1.0, 0.0,  // green
        0.0, 0.0, 1.0   // blue
    ]);

    // Position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Color buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const colorLocation = gl.getAttribLocation(program, 'a_color');
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    // Draw
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
`
    export default {
        name: 'webglLa',
        data() {
            return {
                    copyStatus: 'Copy Code',
                    webGLCode: TRIANGLE_CODE
                }
        },
        methods: {
            async copyCode() {
                try {
                    await navigator.clipboard.writeText(this.webGLCode)
                    this.copyStatus = 'Copied!'
                    setTimeout(() => {
                        this.copyStatus = 'Copy Code'
                    }, 2000)
                } catch (err) {
                    console.error('Failed to copy:', err)
                    this.copyStatus = 'Failed to copy'
                }
            },
            
            initTriangle() {
            const canvas = document.querySelector('#glCanvas')
            const gl = canvas.getContext('webgl')
            
            if (!gl) {
                console.error('WebGL not supported')
                return
            }

            // Vertex shader
            const vertexShader = gl.createShader(gl.VERTEX_SHADER)
            const vertexShaderSource = `
                attribute vec2 a_position;
                attribute vec3 a_color;
                varying vec3 v_color;
                
                void main() {
                    gl_Position = vec4(a_position, 0.0, 1.0);
                    v_color = a_color;
                }
            `
            gl.shaderSource(vertexShader, vertexShaderSource)
            gl.compileShader(vertexShader)

            // Fragment shader
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
            const fragmentShaderSource = `
                precision mediump float;
                varying vec3 v_color;
                
                void main() {
                    gl_FragColor = vec4(v_color, 1.0);
                }
                `
                gl.shaderSource(fragmentShader, fragmentShaderSource)
                gl.compileShader(fragmentShader)

                // Create program
                const program = gl.createProgram()
                gl.attachShader(program, vertexShader)
                gl.attachShader(program, fragmentShader)
                gl.linkProgram(program)
                gl.useProgram(program)

                // Create buffers
                const positions = new Float32Array([
                    0.0,  0.5,    // top vertex
                -0.5, -0.5,    // bottom left vertex
                    0.5, -0.5     // bottom right vertex
                ])

                const colors = new Float32Array([
                    1.0, 0.0, 0.0,  // red
                    0.0, 1.0, 0.0,  // green
                    0.0, 0.0, 1.0   // blue
                ])

                // Position buffer
                const positionBuffer = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
                gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

                const positionLocation = gl.getAttribLocation(program, 'a_position')
                gl.enableVertexAttribArray(positionLocation)
                gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

                // Color buffer
                const colorBuffer = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
                gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)

                const colorLocation = gl.getAttribLocation(program, 'a_color')
                gl.enableVertexAttribArray(colorLocation)
                gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0)

                // Draw
                gl.clearColor(1.0, 1.0, 1.0, 1.0)
                gl.clear(gl.COLOR_BUFFER_BIT)
                gl.drawArrays(gl.TRIANGLES, 0, 3)
            },
        },
        mounted() {
                this.initTriangle()
            }
    }
</script>

<template>
    <h3>WebGL Rendering Basics</h3>
    <span>
        A program in WebGL consists of two functions-
        <ul>
            <li><b>Vertex Shader</b>
                <div>A programmable shader stage that processes vertices individually, 
                    transforming input vertex attributes (position, normal, texture coordinates, etc.) into 
                    clip-space coordinates required by the graphics pipeline. The vertex shader outputs 
                    <span class="highlight highlight-blue">gl_position</span> in homogeneous coordinates and can pass varying data to the fragment shader, 
                    operating once per vertex in the geometry.
                    <div class="theme-github-light">
                        <pre><code>void main() {  
    gl_position = a_position;
 }</code></pre>
                    </div>
                </div>
            </li>
            <li><b>Fragment Shader</b></li>
                <div>
                    A programmable stage that runs for each pixel (fragment) covered by geometry after rasterization, 
                    determining the final color output by processing interpolated vertex data, textures, and other inputs. 
                    The fragment shader outputs <span class="highlight highlight-blue">gl_FragColor</span> as a 4-component vector (RGBA) and executes per-pixel, 
                    handling tasks like texturing, lighting calculations, and pixel-level effects.
                    <pre><code>//Making Everything Red
void main() {  
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); //Red Color
 }</code></pre>     
                </div>
                <svg class="pipeline-diagram" viewBox="0 0 900 400">
                    <svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
                        <!-- Background -->
                        <rect width="900" height="400" fill="#f8f9fa"/>
                        
                        <!-- Pipeline Flow -->
                        <path d="M50 200 H 850" stroke="#ddd" stroke-width="4" stroke-dasharray="5,5"/>
                        
                        <!-- Vertex Shader Stage -->
                        <g transform="translate(100,100)">
                            <rect width="200" height="160" rx="10" fill="#e3f2fd" stroke="#90caf9" stroke-width="2"/>
                            <text x="100" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Vertex Shader</text>
                            <text x="100" y="70" text-anchor="middle" font-family="Arial" font-size="12">"Position Calculator"</text>
                            <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="12">Input: Raw vertices</text>
                            <text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="12">Output: Clip space</text>
                            <text x="100" y="140" text-anchor="middle" font-family="Arial" font-size="12">coordinates</text>
                        </g>
                        
                        <!-- Rasterization Stage -->
                        <g transform="translate(350,100)">
                            <rect width="200" height="160" rx="10" fill="#fff3e0" stroke="#ffe0b2" stroke-width="2"/>
                            <text x="100" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Rasterization</text>
                            <text x="100" y="70" text-anchor="middle" font-family="Arial" font-size="12">"Triangle to Pixels"</text>
                            <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="12">Converts shapes</text>
                            <text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="12">into pixels</text>
                        </g>
                        
                        <!-- Fragment Shader Stage -->
                        <g transform="translate(600,100)">
                            <rect width="200" height="160" rx="10" fill="#e8f5e9" stroke="#a5d6a7" stroke-width="2"/>
                            <text x="100" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Fragment Shader</text>
                            <text x="100" y="70" text-anchor="middle" font-family="Arial" font-size="12">"Pixel Painter"</text>
                            <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="12">Input: Pixels</text>
                            <text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="12">Output: Colors</text>
                        </g>
                        
                        <!-- Flow Arrows -->
                        <g>
                            <path d="M 300 180 H 350" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
                            <path d="M 550 180 H 600" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
                        </g>
                        
                        <!-- Arrow Marker -->
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                            </marker>
                        </defs>
                    </svg>
                </svg>
        </ul>
    </span>
    <h3>Rendering 2D using WebGL</h3>
        <h4>Activity-1: Drawing a Colored Triangle</h4>
        <div class="activity-container">
            <div class="step-explanation">
                <strong>Main Steps:</strong>
                <ol>
                    <li>Set up WebGL context through the canvas element</li>
                    <li>Create and compile vertex and fragment shaders</li>
                    <li>Create and link the shader program</li>
                    <li>Create buffers for vertex positions and colors</li>
                    <li>Set up vertex attributes and load data</li>
                    <li>Draw the triangle</li>
                </ol>
                
                This activity demonstrates the fundamental WebGL pipeline by creating a 
                triangle with interpolated colors. The vertex shader positions three points 
                in clip space (-1 to +1), and passes color data to the fragment shader. The 
                fragment shader interpolates these colors across the triangle's surface. The 
                result is a basic but colorful demonstration of vertex attributes, varying 
                variables, and the WebGL drawing pipeline.
            </div>
            <div class="theme-github-light"> 
                <button @click="copyCode" class="copy-button">
                {{ copyStatus }}
            </button>
                <pre>{{ webGLCode }}</pre>
            </div>            
            <div class="output-section">
                <h3>Output:</h3>
                <canvas id="glCanvas" width="400" height="300"></canvas>
            </div>
        </div>
    <span>

    </span>
</template>

<style>
</style>
<template>
  <div>
    <h1>Three.js: 3D Graphics Library</h1>
    <section class="toc">
      <h2 class="toc-title">Table of Contents</h2>
      <ul class="toc-list">
        <li class="toc-item">
          <a href="#learning-outcomes">Learning Outcomes</a>
        </li>
        <li class="toc-item">
          <a href="#intro-to-threejs">Introduction</a>
          <ul class="nested-list">
            <li class="nested-item">
              <a href="#three-js-basics">Basic Components to Use Three.js</a>
            </li>
            <li class="nested-item">
              <a href="#camera-types">Different Camera Types in Three.js</a>
            </li>
            <li class="nested-item">
              <a href="#map-types">Different Types of Maps in Three.js</a>
            </li>
            <li class="nested-item">
              <a href="#mesh-material"
                >Different default types of shapes, materials, lights and
                textures provided by Three.js:</a
              >
            </li>
          </ul>
        </li>
        <li class="toc-item">
          <a href="#comparison"
            >Comparison of Performance of different particles in Three.js</a
          >
        </li>
        <li class="toc-item">
          <a href="#art-styles">Art Styles</a>
        </li>
        <li class="toc-item">
          <a href="#live-demo">Live Demo</a>
        </li>
        <li class="toc-item">
          <a href="#summary">Summary</a>
        </li>
        <li class="toc-item">
          <a href="#references">References</a>
        </li>
        <li class="toc-item">
          <a href="#resources">Resources</a>
        </li>
      </ul>
    </section>
    <section class="learning-outcomes" id="learning-outcomes">
      <h2 class="title">Learning Outcomes</h2>
      <p class="intro">
        After completing this tutorial, the reader will be able to:
      </p>
      <ul class="outcomes-list">
        <li class="outcome-item">
          <span class="outcome-text"
            >Understand the basic components forming a Three.js
            application</span
          >
        </li>
        <li class="outcome-item">
          <span class="outcome-text">Create simple shapes using Three.js </span>
        </li>
        <li class="outcome-item">
          <span class="outcome-text"
            >Distinguish different camera types in Three.js</span
          >
        </li>
        <li class="outcome-item">
          <span class="outcome-text"
            >Differentiate different map types in Three.js</span
          >
        </li>
        <li class="outcome-item">
          <span class="outcome-text"
            >Identify different shapes, materials, lights and textures in
            Three.js</span
          >
        </li>
        <li class="outcome-item">
          <span class="outcome-text">Analyze Performance based on FPS</span>
        </li>
        <li class="outcome-item">
          <span class="outcome-text"
            >Implement topics learnt to develop small-sized projects</span
          >
        </li>
      </ul>
    </section>
    <section>
      <div class="webgl-intro" id="intro-to-threejs">
        <h1>Introduction to Three.js</h1>

        <div v-for="section in sections" :key="section.id" class="section">
          <div class="section-header">
            <h2>{{ section.title }}</h2>
          </div>

          <div class="section-content">
            <template v-for="(item, index) in section.content" :key="index">
              <p v-if="item.type === 'text'" class="text">
                {{ item.body }}
              </p>

              <div v-else-if="item.type === 'timeline'" class="timeline">
                <div
                  v-for="event in item.events"
                  :key="event.year"
                  class="timeline-event"
                >
                  <span class="year">{{ event.year }}</span>
                  <span class="event">{{ event.event }}</span>
                </div>
              </div>

              <div v-else-if="item.type === 'pipeline'" class="pipeline">
                <div
                  v-for="stage in item.stages"
                  :key="stage.name"
                  class="stage"
                >
                  <h3>{{ stage.name }}</h3>
                  <p>{{ stage.description }}</p>
                  <pre><code>{{ stage.code }}</code></pre>
                </div>
              </div>

              <div v-else-if="item.type === 'subsection'" class="subsection">
                <h3>{{ item.title }}</h3>
                <p>{{ item.body }}</p>
              </div>

              <div
                v-else-if="item.type === 'list'"
                class="subsectionlist"
                id="three-js-basics"
              >
                <ul v-if="listItems && listItems.length">
                  <li v-for="(item, index) in listItems" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div v-else-if="item.type === 'code'" class="code-block">
                <div class="code-header">{{ item.language }}</div>
                <pre><code>{{ item.code }}</code></pre>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 class="title">Building A Simple Triangle Using Three.js</h2>
      <div>
        <div class="button-group">
          <button
            @click="showTriangleIframe = false"
            :class="{ active: !showTriangleIframe }"
          >
            Code
          </button>
          <button
            @click="showTriangleIframe = true"
            :class="{ active: showTriangleIframe }"
          >
            Demo
          </button>
        </div>

        <div v-if="showTriangleIframe" class="iframe-container">
          <iframe
            src="./simpleTriangle.html"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>

        <div v-else class="code-container">
          <pre><code>{{ triangeCodeSnippet }}</code></pre>
        </div>
      </div>
    </section>
    <br />
    <section id="camera-types">
      <h2 class="title">Different Camera Types in Three.js</h2>
      <div>
        <div class="button-group">
          <button
            @click="showCameraIframe = false"
            :class="{ active: !showCameraIframe }"
          >
            Code
          </button>
          <button
            @click="showCameraIframe = true"
            :class="{ active: showCameraIframe }"
          >
            Demo
          </button>
        </div>

        <div v-if="showCameraIframe" class="iframe-container">
          <iframe
            src="./camera.html"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>

        <div v-else class="code-container">
          <pre><code>{{ cameraCodeSnippet }}</code></pre>
        </div>
      </div>
    </section>
    <br />
    <section id="map-types">
      <h2 class="title">Different Maps Types in Three.js</h2>
      <div>
        <div class="button-group">
          <button
            @click="showMapIframe = false"
            :class="{ active: !showMapIframe }"
          >
            Code
          </button>
          <button
            @click="showMapIframe = true"
            :class="{ active: showMapIframe }"
          >
            Demo
          </button>
        </div>

        <div v-if="showMapIframe" class="iframe-container">
          <iframe
            src="./materialmaps.html"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>

        <div v-else class="code-container">
          <pre><code>{{ mapsCodeSnippet }}</code></pre>
        </div>
      </div>
    </section>
    <br />
    <section id="mesh-material">
      <h2 class="title">
        Different Types of Shapes,Materials, Lights and Textures in Three.js
      </h2>
      <div>
        <div class="button-group">
          <button
            @click="showMeshMaterialIframe = false"
            :class="{ active: !showMeshMaterialIframe }"
          >
            Code
          </button>
          <button
            @click="showMeshMaterialIframe = true"
            :class="{ active: showMeshMaterialIframe }"
          >
            Demo
          </button>
        </div>

        <div v-if="showMeshMaterialIframe" class="iframe-container">
          <iframe
            src="./meshLightsTextures.html"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>

        <div v-else class="code-container">
          <pre><code>{{ meshMaterialCodeSnippet }}</code></pre>
        </div>
      </div>
    </section>
    <br />
    <section id="comparison">
      <h2 class="title">
        Comparison of Performance of different particles in Three.js
      </h2>
      <div>
        <div class="button-group">
          <button
            @click="showParitcleIframe = false"
            :class="{ active: !showParitcleIframe }"
          >
            Code
          </button>
          <button
            @click="showParitcleIframe = true"
            :class="{ active: showParitcleIframe }"
          >
            Demo
          </button>
        </div>

        <div v-if="showParitcleIframe" class="iframe-container">
          <iframe
            src="./partical.html"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>
        <div v-else class="code-container">
          <pre><code>{{ ParticleCodeSnippet }}</code></pre>
        </div>
      </div>
      <div class="flex-container">
        <div class="flex-item">
          <p><b>Basic Particles</b></p>
          <p>Best for small systems; performance drops with large particle counts.</p>
        </div>
        <div class="flex-item">
          <p><b>GPU Particles</b></p>
          <p>Ideal for large systems; handles many particles efficiently via GPU parallelism.</p>
        </div>
        <div class="flex-item">
          <p><b>Sprite Particles</b></p>
          <p>Good balance of visuals and performance for moderate systems, but struggles with millions of particles.</p>
        </div>
    </div>
    </section>
    <br />
    <section id="live-demo">
      <h2 class="title">Import Custom Models in threejs</h2>
      <div>
        <div class="button-group">
          <button
            @click="showGlbIframe = false"
            :class="{ active: !showGlbIframe }"
          >
            Code
          </button>
          <button
            @click="showGlbIframe = true"
            :class="{ active: showGlbIframe }"
          >
            Demo
          </button>
        </div>

        <div v-if="showGlbIframe" class="iframe-container">
          <iframe
            src="./importglb.html"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>
        <div v-else class="code-container">
          <pre><code>{{ importglbCodeSnippet }}</code></pre>
        </div>
      </div>
    </section>
    <br>
    <section id="art-styles">
      <h2 class="title">Comparing Different Art Styles in Three.js</h2>
      <div>
        <div class="button-group">
          <button
            @click="showArtIframe = false"
            :class="{ active: !showArtIframe }"
          >
            Code
          </button>
          <button
            @click="showArtIframe = true"
            :class="{ active: showArtIframe }"
          >
            Demo
          </button>
        </div>

        <div v-if="showArtIframe" class="iframe-container">
          <iframe
            src="./art.html"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>
        <div v-else class="code-container">
          <pre><code>{{ artCodeSnippet }}</code></pre>
        </div>
      </div>
      <div>

      </div>
      <div class="flex-container">
        <div class="flex-item">
          <p><b>Default</b></p>
          <p>Realistic with textures and lighting, GPU-intensive, ideal for games and simulations.</p>
        </div>
        <div class="flex-item">
          <p><b>Wireframe</b></p>
          <p>Displays edges of objects, faster than default, good for debugging and technical visuals.</p>
        </div>
        <div class="flex-item">
          <p><b>ASCII</b></p>
          <p>3D shapes represented by text characters, very lightweight, used for retro or minimalistic art.</p>
        </div>
    </div>
    </section>
    <br />
   
    <br />
    <section id="summary">
      <h2 class="title">Summary</h2>
      <p class="summary-text">
        Three.js began as a project by Ricardo Cabello (also known as Mr. Doob)
        in April 2010, initially as a lightweight abstraction over WebGL. At the
        time, WebGL, a JavaScript API for rendering 3D graphics directly in the
        browser, was new and challenging for most developers to use due to its
        low-level complexity. Cabello's aim was to create a library that made 3D
        graphics accessible and simple to integrate into web projects.
      </p>
      <p class="summary-text">
        The early versions of Three.js provided an intuitive API to abstract
        WebGL’s complexity. Instead of writing verbose WebGL shaders and
        geometry definitions, developers could define scenes, cameras, and
        objects with straightforward JavaScript. By 2011, the library had gained
        significant attention in the developer community for its ease of use and
        growing feature set.
      </p>
      <p class="summary-text">
        Three.js saw rapid development and adoption throughout the 2010s,
        coinciding with a surge in interest in browser-based 3D content. The
        library supported an increasing range of features, such as loading
        external 3D models, advanced lighting, materials, and animations. It
        integrated well with physics libraries like Cannon.js, making it a
        favorite for interactive simulations and games.
      </p>
      <p class="summary-text">
        By the mid-2010s, it became a go-to tool for web developers, powering
        projects in fields as diverse as video games, virtual reality (using
        WebXR), architecture, and data visualization. Its integration with
        frameworks like React (via React Three Fiber) and its ability to work
        seamlessly across modern browsers solidified its reputation as a
        versatile and reliable library.
      </p>
      <p class="summary-text">
        Today, Three.js continues to evolve, maintaining active development and
        support from a vibrant community. While new technologies like WebGPU
        promise to revolutionize web graphics, Three.js is already preparing for
        the transition, ensuring its relevance in the next generation of
        web-based 3D graphics.
      </p>
    </section>
    <br />
    <section id="references">
      <h2 class="title">References</h2>
      <ul>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API"
            >MDN Docs</a
          >
        </li>
        <li>
          <a href="https://threejs.org/editor/">Three.js Online Editor</a>
        </li>
        <li>
          <a href="https://threejs.org/playground/">Three.js Playground</a>
        </li>
        <li><a href="https://threejs.org/">Three.js Examples</a></li>
        <li><a href="https://threejs.org/">Three.js documentation</a></li>
        <li><a href="https://threejs-journey.com/">Three.js Journey</a></li>
      </ul>
    </section>
    <br />
    <section id="resources">
      <h2 class="title">Resources</h2>
      <p>
        There are plenty of resources out there but these are the ones that we
        found to be the most useful.
      </p>
      <ul>
        <li>
          <a href="https://threejs.org/editor/">Three.js Online Editor</a>
        </li>
        <li>
          <a href="https://threejs.org/playground/">Three.js Playground</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "ThreeJSContent",
  data() {
    return {
      showTriangleIframe: true,
      showArtIframe: true,
      showGlbIframe: true,
      showParitcleIframe: true,
      showMeshMaterialIframe: true,
      showCameraIframe: true,
      showMapIframe: true,
      iframeSrc: "https://example.com",
      ParticleCodeSnippet: `    let scene, camera, renderer;
        let particles;
        let currentSystem = 'basic';
        let lastTime = performance.now();
        let frameCount = 0;
        let particleCount = 10000;
        
        // Initialize Three.js setup
        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            
            camera.position.z = 50;
            
            // Setup particle slider
            const slider = document.getElementById('particleSlider');
            slider.addEventListener('input', (e) => {
                particleCount = parseInt(e.target.value);
                document.getElementById('particleValue').textContent = particleCount;
                switchSystem(currentSystem);
            });
            
            createParticleSystem('basic');
            animate();
        }
        
        // Basic Points Particle System
        function createBasicParticles() {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            
            for(let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
                
                colors[i * 3] = Math.random();
                colors[i * 3 + 1] = Math.random();
                colors[i * 3 + 2] = Math.random();
                
                velocities[i * 3] = (Math.random() - 0.5) * 0.2;
                velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
            
            const material = new THREE.PointsMaterial({
                size: 0.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });
            
            particles = new THREE.Points(geometry, material);
            particles.userData.type = 'basic';
            scene.add(particles);
        }
        
        // GPU Particle System
        function createGPUParticles() {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 4);
            
            for(let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
                
                velocities[i * 3] = (Math.random() - 0.5) * 0.2;
                velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
                
                colors[i * 4] = Math.random();
                colors[i * 4 + 1] = Math.random();
                colors[i * 4 + 2] = Math.random();
                colors[i * 4 + 3] = Math.random();
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
            
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: \`
                    attribute vec3 velocity;
                    attribute vec4 color;
                    uniform float time;
                    varying vec4 vColor;
                    
                    void main() {
                        vColor = color;
                        vec3 pos = position + velocity * time;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        gl_PointSize = 2.0;
                    }
                \`,
                fragmentShader: \`
                    varying vec4 vColor;
                    
                    void main() {
                        float d = length(gl_PointCoord - vec2(0.5));
                        if(d > 0.5) discard;
                        gl_FragColor = vColor;
                    }
                \`,
                transparent: true
            });
            
            particles = new THREE.Points(geometry, material);
            particles.userData.type = 'gpu';
            scene.add(particles);
        }
        
        // Sprite-based Particle System
        function createSpriteParticles() {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            
            for(let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
                
                velocities[i * 3] = (Math.random() - 0.5) * 0.2;
                velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
            
            const sprite = new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e433ca04-aef6-48ed-99d1-1339f2dffc3c/df9i5zv-e623334c-e0a9-491c-a0a5-4ba6110cadf7.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MzNjYTA0LWFlZjYtNDhlZC05OWQxLTEzMzlmMmRmZmMzY1wvZGY5aTV6di1lNjIzMzM0Yy1lMGE5LTQ5MWMtYTBhNS00YmE2MTEwY2FkZjcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yrNbEhuth5Gs6fRFM4Uf_suDrFsHDdX9L57IBe-5USU');
            const material = new THREE.PointsMaterial({
                size: 1,
                map: sprite,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            particles = new THREE.Points(geometry, material);
            particles.userData.type = 'sprite';
            scene.add(particles);
        }
        
        // Switch between different particle systems
        function switchSystem(type) {
            if(particles) {
                scene.remove(particles);
            }
            
            currentSystem = type;
            createParticleSystem(type);
            
            // Update active button
            document.querySelectorAll('.tabs button').forEach(btn => {
                btn.classList.remove('active');
                if(btn.textContent.toLowerCase().includes(type)) {
                    btn.classList.add('active');
                }
            });
        }
        
        function createParticleSystem(type) {
            switch(type) {
                case 'basic':
                    createBasicParticles();
                    break;
                case 'gpu':
                    createGPUParticles();
                    break;
                case 'sprite':
                    createSpriteParticles();
                    break;
            }
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            if(particles) {
                if(particles.userData.type === 'basic') {
                    const positions = particles.geometry.attributes.position.array;
                    const velocities = particles.geometry.attributes.velocity.array;
                    
                    for(let i = 0; i < particleCount; i++) {
                        positions[i * 3] += velocities[i * 3];
                        positions[i * 3 + 1] += velocities[i * 3 + 1];
                        positions[i * 3 + 2] += velocities[i * 3 + 2];
                        
                        // Boundary check
                        if(Math.abs(positions[i * 3]) > 50) velocities[i * 3] *= -1;
                        if(Math.abs(positions[i * 3 + 1]) > 50) velocities[i * 3 + 1] *= -1;
                        if(Math.abs(positions[i * 3 + 2]) > 50) velocities[i * 3 + 2] *= -1;
                    }
                    
                    particles.geometry.attributes.position.needsUpdate = true;
                }
                else if(particles.userData.type === 'gpu') {
                    particles.material.uniforms.time.value += 0.016;
                }
                else if(particles.userData.type === 'sprite') {
                    const positions = particles.geometry.attributes.position.array;
                    const velocities = particles.geometry.attributes.velocity.array;
                    
                    for(let i = 0; i < particleCount; i++) {
                        positions[i * 3] += velocities[i * 3];
                        positions[i * 3 + 1] += velocities[i * 3 + 1];
                        positions[i * 3 + 2] += velocities[i * 3 + 2];
                        
                        // Boundary check
                        if(Math.abs(positions[i * 3]) > 50) velocities[i * 3] *= -1;
                        if(Math.abs(positions[i * 3 + 1]) > 50) velocities[i * 3 + 1] *= -1;
                        if(Math.abs(positions[i * 3 + 2]) > 50) velocities[i * 3 + 2] *= -1;
                    }
                    
                    particles.geometry.attributes.position.needsUpdate = true;
                }
            }
            
            // Update stats
            frameCount++;
            const currentTime = performance.now();
            if(currentTime - lastTime >= 1000) {
                document.getElementById('fps').textContent = frameCount;
                document.getElementById('particleCount').textContent = particleCount;
                document.getElementById('drawCalls').textContent = renderer.info.render.calls;
                document.getElementById('memory').textContent = 
                    Math.round(renderer.info.memory.geometries * 0.1) / 10;
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            renderer.render(scene, camera);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        init();
      `,

      meshMaterialCodeSnippet: `
      import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

        let currentScene, currentCamera, currentRenderer;
        let currentObject, currentLight;
        let geometries, materials, lights, textures;
        const labelDiv = document.getElementById('labels');

        function initGeometries() {
            geometries = {
                box: new THREE.BoxGeometry(1, 1, 1),
                sphere: new THREE.SphereGeometry(0.7, 32, 32),
                cylinder: new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
                cone: new THREE.ConeGeometry(0.7, 1.5, 32),
                torus: new THREE.TorusGeometry(0.5, 0.2, 16, 100),
                plane: new THREE.PlaneGeometry(1.5, 1.5),
                ring: new THREE.RingGeometry(0.3, 0.7, 32),
                torusKnot: new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16)
            };
        }

        function createTexture(type) {
            const size = 512;
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext('2d');

            switch(type) {
                case 'checkerboard':
                    const tileSize = size / 8;
                    for(let i = 0; i < size; i += tileSize) {
                        for(let j = 0; j < size; j += tileSize) {
                            ctx.fillStyle = ((i + j) / tileSize) % 2 === 0 ? '#fff' : '#000';
                            ctx.fillRect(i, j, tileSize, tileSize);
                        }
                    }
                    break;
                case 'dots':
                    ctx.fillStyle = '#000';
                    ctx.fillRect(0, 0, size, size);
                    ctx.fillStyle = '#fff';
                    for(let i = 0; i < 50; i++) {
                        const x = Math.random() * size;
                        const y = Math.random() * size;
                        ctx.beginPath();
                        ctx.arc(x, y, 10, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    break;
                case 'gradient':
                    const grad = ctx.createLinearGradient(0, 0, size, size);
                    grad.addColorStop(0, 'red');
                    grad.addColorStop(0.5, 'green');
                    grad.addColorStop(1, 'blue');
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, size, size);
                    break;
                case 'stripes':
                    const stripeWidth = size / 10;
                    for(let i = 0; i < size; i += stripeWidth * 2) {
                        ctx.fillStyle = '#fff';
                        ctx.fillRect(i, 0, stripeWidth, size);
                        ctx.fillStyle = '#000';
                        ctx.fillRect(i + stripeWidth, 0, stripeWidth, size);
                    }
                    break;
            }
            return new THREE.CanvasTexture(canvas);
        }

        function initTextures() {
            textures = {
                checkerboard: createTexture('checkerboard'),
                dots: createTexture('dots'),
                gradient: createTexture('gradient'),
                stripes: createTexture('stripes')
            };
        }

        function initMaterials() {
            materials = {
                basic: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
                phong: new THREE.MeshPhongMaterial({ color: 0x00ff00 }),
                lambert: new THREE.MeshLambertMaterial({ color: 0x0000ff }),
                standard: new THREE.MeshStandardMaterial({ 
                    color: 0xffff00,
                    roughness: 0.5,
                    metalness: 0.5
                }),
                toon: new THREE.MeshToonMaterial({ color: 0xff00ff }),
                physical: new THREE.MeshPhysicalMaterial({
                    color: 0x00ffff,
                    roughness: 0.5,
                    metalness: 0.5,
                    clearcoat: 1.0
                })
            };
        }

        function initLights() {
            lights = {
                ambient: new THREE.AmbientLight(0xffffff, 0.5),
                point: new THREE.PointLight(0xffffff, 1, 100),
                directional: new THREE.DirectionalLight(0xffffff, 1),
                spot: new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 6),
                hemisphere: new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
            };
        }

        function setupScene() {
            currentRenderer = new THREE.WebGLRenderer({ antialias: true });
            currentRenderer.setSize(window.innerWidth, window.innerHeight - 280);
            document.getElementById('canvas-container').appendChild(currentRenderer.domElement);

            currentScene = new THREE.Scene();
            currentScene.background = new THREE.Color(0x1a1a1a);
            
            currentCamera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 280), 0.1, 1000);
            currentCamera.position.set(0, 0, 5);

            const grid = new THREE.GridHelper(10, 10);
            grid.rotation.x = Math.PI / 2;
            currentScene.add(grid);

            currentObject = new THREE.Mesh(geometries.box, materials.standard);
            currentScene.add(currentObject);

            currentLight = lights.ambient;
            currentLight.position.set(0, 0, 5);
            currentScene.add(currentLight);

            updateLabels();
        }

        function updateLabels() {
            const properties = {
                geometry: currentObject.geometry.type,
                material: currentObject.material.type,
                light: currentLight.type,
                position: "x: \${currentObject.position.x.toFixed(2)}, y: \${currentObject.position.y.toFixed(2)}, z: \${currentObject.position.z.toFixed(2)}\`,
                rotation: "x: \${currentObject.rotation.x.toFixed(2)}, y: \${currentObject.rotation.y.toFixed(2)}, z:\${currentObject.rotation.z.toFixed(2)}\`
            };

            labelDiv.innerHTML = Object.entries(properties)
                .map(([key, value]) => \`<div>\${key}: \${value}</div>\`)
                .join('');
        }
  let camera, scene, renderer, sphere;
        let currentMap = 'normal';
        
        const descriptions = {
            normal: {
                title: "Normal Map",
                text: "Normal maps simulate surface detail by telling the engine how light should bounce off the surface. They create the illusion of bumps and dents without adding extra geometry.",
                controls: [
                    { id: 'normalScaleX', label: 'Normal Scale X', min: 0, max: 3, step: 0.1, value: 1 },
                    { id: 'normalScaleY', label: 'Normal Scale Y', min: 0, max: 3, step: 0.1, value: 1 }
                ]
            },
            roughness: {
                title: "Roughness Map",
                text: "Roughness maps control how rough or smooth a surface appears. Rough surfaces create diffuse reflections (matte), while smooth surfaces create sharp reflections (glossy).",
                controls: [
                    { id: 'roughness', label: 'Base Roughness', min: 0, max: 1, step: 0.1, value: 1 },
                    { id: 'roughnessContrast', label: 'Pattern Contrast', min: 0, max: 1, step: 0.1, value: 1 }
                ]
            },
            metalness: {
                title: "Metalness Map",
                text: "Metalness maps define which parts of a surface are metallic (1) or non-metallic (0). Metallic surfaces reflect the environment and have colored reflections.",
                controls: [
                    { id: 'metalness', label: 'Base Metalness', min: 0, max: 1, step: 0.1, value: 1 },
                    { id: 'metalnessContrast', label: 'Gradient Intensity', min: 0, max: 1, step: 0.1, value: 1 }
                ]
            }
        };

        init();
        animate();

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('container').appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(5, 5, 5);
            scene.add(pointLight);

            createSphere();
            camera.position.z = 3;

            setupEventListeners();
            updateControls('normal');
        }

        function setupEventListeners() {
            window.addEventListener('resize', onWindowResize, false);
            
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    currentMap = tab.dataset.map;
                    updateDescription(currentMap);
                    updateControls(currentMap);
                    updateMaterial();
                });
            });
        }

        function updateDescription(mapType) {
            const desc = descriptions[mapType];
            document.getElementById('description').innerHTML =\`
                <h3>\${desc.title}</h3>
                <p>\${desc.text}</p>
            \`;
        }

        function updateControls(mapType) {
            const controlsContainer = document.getElementById('controls');
            const controls = descriptions[mapType].controls;
            
            controlsContainer.innerHTML = controls.map(control => \`
                <div class="control-group">
                    <label>\${control.label}:</label>
                    <div class="slider-row">
                        <input type="range" 
                               id="\${control.id}" 
                               min="\${control.min}" 
                               max="\${control.max}" 
                               step="\${control.step}" 
                               value="\${control.value}">
                        <span class="value-display">\${control.value}</span>
                    </div>
                </div>
            \`).join('');

            document.querySelectorAll('input[type="range"]').forEach(input => {
                input.addEventListener('input', (e) => {
                    e.target.nextElementSibling.textContent = parseFloat(e.target.value).toFixed(1);
                    updateMaterial();
                });
            });
        }

        function createSphere() {
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = createMaterial('normal');
            sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
        }

        function createMaterial(type) {
            switch(type) {
                case 'normal': {
                    const material = new THREE.MeshStandardMaterial({
                        color: 0x808080,
                        normalMap: createNormalMap(),
                        normalScale: new THREE.Vector2(
                            parseFloat(document.getElementById('normalScaleX')?.value || 1),
                            parseFloat(document.getElementById('normalScaleY')?.value || 1)
                        )
                    });
                    return material;
                }
                case 'roughness': {
                    const roughness = parseFloat(document.getElementById('roughness')?.value || 1);
                    const contrast = parseFloat(document.getElementById('roughnessContrast')?.value || 1);
                    return new THREE.MeshStandardMaterial({
                        color: 0x808080,
                        roughnessMap: createRoughnessMap(contrast),
                        roughness: roughness
                    });
                }
                case 'metalness': {
                    const metalness = parseFloat(document.getElementById('metalness')?.value || 1);
                    const contrast = parseFloat(document.getElementById('metalnessContrast')?.value || 1);
                    return new THREE.MeshStandardMaterial({
                        color: 0x808080,
                        metalnessMap: createMetalnessMap(contrast),
                        metalness: metalness
                    });
                }
            }
        }

        function createNormalMap() {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            for(let y = 0; y < canvas.height; y++) {
                for(let x = 0; x < canvas.width; x++) {
                    const r = 127 + 127 * Math.sin(x / 10);
                    const g = 127 + 127 * Math.sin(y / 10);
                    const b = 255;
                    ctx.fillStyle = \`rgb(\${r},\${g},\${b})\`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        function createRoughnessMap(contrast = 1) {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            const tileSize = 32;
            for(let y = 0; y < canvas.height; y++) {
                for(let x = 0; x < canvas.width; x++) {
                    let value = ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2);
                    value = value * contrast * 255;
                    ctx.fillStyle = \`rgb(\${value},\${value},\${value})\`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        function createMetalnessMap(contrast = 1) {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, \`rgb(\${0},\${0},\${0})\`);
            gradient.addColorStop(1, \`rgb(\${255 * contrast},\${255 * contrast},\${255 * contrast})\`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        function updateMaterial() {
            const newMaterial = createMaterial(currentMap);
            sphere.material.dispose();
            sphere.material = newMaterial;
        }

        function onWindowResize() {
            camera.aspect = (window.innerWidth - 340) / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth - 340, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        function switchScene(type, rowIndex) {
            // Update active tab only in the clicked row
            document.querySelectorAll(\`.tab-row:nth-child(\${rowIndex + 1}) .nav-tab\`).forEach(tab => {
                tab.classList.toggle('active', tab.dataset.type === type);
            });

            if (geometries[type]) {
                currentObject.geometry = geometries[type];
            } else if (materials[type]) {
                currentObject.material = materials[type];
            } else if (lights[type]) {
                currentScene.remove(currentLight);
                currentLight = lights[type];
                currentLight.position.set(2, 2, 2);
                currentScene.add(currentLight);
            } else if (textures[type]) {
                if (!currentObject.material.map) {
                    currentObject.material = materials.standard.clone();
                }
                currentObject.material.map = textures[type];
                currentObject.material.needsUpdate = true;
            }
            
            updateLabels();
        }

        // Add click listeners to all buttons
        document.querySelectorAll('.nav-tab').forEach(button => {
            button.addEventListener('click', (e) => {
                const type = button.dataset.type;
                const rowIndex = parseInt(button.dataset.row);
                switchScene(type, rowIndex);
            });
        });

        function animate() {
            requestAnimationFrame(animate);
            if (currentObject) {
                currentObject.rotation.x += 0.01;
                currentObject.rotation.y += 0.01;
                updateLabels();
            }
            currentRenderer.render(currentScene, currentCamera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            currentCamera.aspect = window.innerWidth / (window.innerHeight - 280);
            currentCamera.updateProjectionMatrix();
            currentRenderer.setSize(window.innerWidth, window.innerHeight - 280);
        });

        // Initialize everything
        initGeometries();
        initMaterials();
        initLights();
        initTextures();
        setupScene();
        animate();
      `,
      triangeCodeSnippet: `
        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create triangle geometry
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -1.0, -1.0,  0.0,  // vertex 1
             1.0, -1.0,  0.0,  // vertex 2
             0.0,  1.0,  0.0   // vertex 3
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // Create material
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        });

        // Create mesh and add to scene
        const triangle = new THREE.Mesh(geometry, material);
        scene.add(triangle);

        // Position camera
        camera.position.z = 5;

        renderer.render(scene, camera);

      `,
      cameraCodeSnippet: `
              let scene, renderer, currentCamera;
        let perspectiveCamera, orthographicCamera, arrayCameras;
        let stereoCamera, stereoGroup;
        let cube;

        function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x222222);
            
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // Add grid helper
            const gridHelper = new THREE.GridHelper(10, 10);
            scene.add(gridHelper);

            // Create cube
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x00ff00,
                flatShading: true
            });
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            setupCameras();
            currentCamera = stereoCamera;
            updateInfo('Stereo Camera: Simulates human binocular vision (3D effect)');
        }

        function setupCameras() {
            // Perspective Camera
            perspectiveCamera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            perspectiveCamera.position.set(3, 3, 3);
            perspectiveCamera.lookAt(0, 0, 0);

            // Orthographic Camera
            const frustumSize = 5;
            const aspect = window.innerWidth / window.innerHeight;
            orthographicCamera = new THREE.OrthographicCamera(
                frustumSize * aspect / -2,
                frustumSize * aspect / 2,
                frustumSize / 2,
                frustumSize / -2,
                0.1,
                1000
            );
            orthographicCamera.position.set(3, 3, 3);
            orthographicCamera.lookAt(0, 0, 0);

            // Array Cameras
            arrayCameras = [
                new THREE.PerspectiveCamera(75, window.innerWidth / 2 / (window.innerHeight / 2), 0.1, 1000),
                new THREE.PerspectiveCamera(75, window.innerWidth / 2 / (window.innerHeight / 2), 0.1, 1000),
                new THREE.PerspectiveCamera(75, window.innerWidth / 2 / (window.innerHeight / 2), 0.1, 1000),
                new THREE.PerspectiveCamera(75, window.innerWidth / 2 / (window.innerHeight / 2), 0.1, 1000)
            ];
            arrayCameras[0].position.set(3, 3, 3);
            arrayCameras[1].position.set(-3, 3, 3);
            arrayCameras[2].position.set(3, 3, -3);
            arrayCameras[3].position.set(-3, 3, -3);
            arrayCameras.forEach(camera => camera.lookAt(0, 0, 0));

            // Stereo Camera Setup
            stereoCamera = new THREE.StereoCamera();
            stereoCamera.eyeSep = 0.064; // Inter-eye distance in meters

            // Create a main camera for controlling stereo pair
            stereoGroup = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            stereoGroup.position.set(0, 2, 5);
            stereoGroup.lookAt(0, 0, 0);
        }

        function animate() {
            requestAnimationFrame(animate);
            
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            if (currentCamera === arrayCameras) {
                renderArrayCameras();
            } else if (currentCamera === stereoCamera) {
                renderStereoCameras();
            } else {
                renderer.render(scene, currentCamera);
            }
        }

        function renderArrayCameras() {
            const width = window.innerWidth / 2;
            const height = window.innerHeight / 2;

            arrayCameras.forEach((camera, i) => {
                const x = (i % 2) * width;
                const y = Math.floor(i / 2) * height;
                
                renderer.setViewport(x, y, width, height);
                renderer.setScissor(x, y, width, height);
                renderer.setScissorTest(true);
                
                renderer.render(scene, camera);
            });
        }

        function renderStereoCameras() {
            // Update the stereo camera based on the main camera
            stereoCamera.update(stereoGroup);

            const width = window.innerWidth / 2;
            
            // Render left eye
            renderer.setViewport(0, 0, width, window.innerHeight);
            renderer.setScissor(0, 0, width, window.innerHeight);
            renderer.setScissorTest(true);
            renderer.render(scene, stereoCamera.cameraL);
            
            // Render right eye
            renderer.setViewport(width, 0, width, window.innerHeight);
            renderer.setScissor(width, 0, width, window.innerHeight);
            renderer.setScissorTest(true);
            renderer.render(scene, stereoCamera.cameraR);
        }

        function switchCamera(type) {
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.textContent.toLowerCase().includes(type)) {
                    tab.classList.add('active');
                }
            });

            switch(type) {
                case 'perspective':
                    currentCamera = perspectiveCamera;
                    updateInfo('Perspective Camera: Mimics human eye view with depth perception');
                    break;
                case 'orthographic':
                    currentCamera = orthographicCamera;
                    updateInfo('Orthographic Camera: No perspective distortion, used for 2D-like views');
                    break;
                case 'arrayCamera':
                    currentCamera = arrayCameras;
                    updateInfo('Array Camera: Multiple viewports showing different angles');
                    break;
                case 'stereo':
                    currentCamera = stereoCamera;
                    updateInfo('Stereo Camera: Simulates human binocular vision (3D effect)');
                    break;
            }

            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
        }

        function updateInfo(text) {
            document.getElementById('info').textContent = text;
        }

        function onWindowResize() {
            if (currentCamera === perspectiveCamera || currentCamera === orthographicCamera) {
                currentCamera.aspect = window.innerWidth / window.innerHeight;
                currentCamera.updateProjectionMatrix();
            }
            stereoGroup.aspect = window.innerWidth / window.innerHeight;
            stereoGroup.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', onWindowResize, false);

        init();
        animate();

      `,
      artCodeSnippet: `
      import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
        import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
        import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

        let scene, camera, renderer, controls, effect;
        let model;
        let lastTime = performance.now();
        let frameCount = 0;
        let currentStyle = 'default';
        
        function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);
            
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Initialize ASCII effect
            effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
            effect.setSize(window.innerWidth, window.innerHeight);
            effect.domElement.style.color = 'white';
            effect.domElement.style.backgroundColor = 'black';
            
            // Start with regular renderer
            document.body.appendChild(renderer.domElement);
            
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            
            // Add lights
            const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
            pointLight1.position.set(500, 500, 500);
            scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
            pointLight2.position.set(-500, -500, -500);
            scene.add(pointLight2);
            
            loadModel();
            setupControls();
            setupArtStyles();
            animate();
        }
        
        function loadModel() {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
            
            const loader = new GLTFLoader();
            loader.setDRACOLoader(dracoLoader);

            loader.load(
                'model.glb',
                function(gltf) {
                    model = gltf.scene;
                    
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);
                    
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 5 / maxDim;
                    model.position.y -= 5;
                    model.scale.multiplyScalar(scale);
                    model.rotation.set(Math.PI / 2, Math.PI, Math.PI);
                    
                    scene.add(model);
                    updateModelInfo();
                },
                undefined,
                function(error) {
                    console.error('Error loading model:', error);
                }
            );
        }
        
        function setupArtStyles() {
            const buttons = document.querySelectorAll('.style-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const style = this.dataset.style;
                    applyArtStyle(style);
                    
                    buttons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
        
        function applyArtStyle(style) {
            if (!model) return;
            
            // Remove existing renderer/effect
            document.body.removeChild(
                currentStyle === 'ascii' ? effect.domElement : renderer.domElement
            );
            
            if (style === 'ascii') {
                document.body.appendChild(effect.domElement);
                controls = new OrbitControls(camera, effect.domElement);
            } else {
                document.body.appendChild(renderer.domElement);
                controls = new OrbitControls(camera, renderer.domElement);
            }
            
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            
            model.traverse(function(child) {
                if (child.isMesh) {
                    if (!child.userData.originalMaterial) {
                        child.userData.originalMaterial = child.material.clone();
                    }
                    
                    switch(style) {
                        case 'wireframe':
                            child.material = new THREE.MeshBasicMaterial({
                                wireframe: true,
                                color: 0x00ff00
                            });
                            break;
                        case 'ascii':
                            child.material = new THREE.MeshPhongMaterial({ 
                                color: 0xffffff,
                                flatShading: true 
                            });
                            break;
                        default:
                            child.material = child.userData.originalMaterial;
                    }
                }
            });
            
            currentStyle = style;
        }
        
        function updateModelInfo() {
            let triangleCount = 0;
            let materialCount = 0;
            
            model.traverse(function(child) {
                if(child.isMesh) {
                    triangleCount += child.geometry.index.count / 3;
                    materialCount += child.material.length || 1;
                }
            });
            
            document.getElementById('triangles').textContent = triangleCount;
            document.getElementById('materials').textContent = materialCount;
        }
        
        function setupControls() {
            document.getElementById('rotationX').addEventListener('input', function(e) {
                if(model) {
                    model.rotation.x = THREE.MathUtils.degToRad(parseFloat(e.target.value));
                }
            });
            
            document.getElementById('rotationY').addEventListener('input', function(e) {
                if(model) {
                    model.rotation.y = THREE.MathUtils.degToRad(parseFloat(e.target.value));
                }
            });
            
            document.getElementById('scale').addEventListener('input', function(e) {
                if(model) {
                    const scale = parseFloat(e.target.value) / 100;
                    model.scale.setScalar(scale);
                }
            });
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            controls.update();
            
            if(model && document.getElementById('autoRotate').checked) {
                model.rotation.z += 0.005;
                document.getElementById('rotationY').value = 
                    THREE.MathUtils.radToDeg(model.rotation.y) % 360;
            }
            
            frameCount++;
            const currentTime = performance.now();
            if(currentTime - lastTime >= 1000) {
                document.getElementById('fps').textContent = frameCount;
                frameCount = 0;
                lastTime = currentTime;
            }
            
            if (currentStyle === 'ascii') {
                effect.render(scene, camera);
            } else {
                renderer.render(scene, camera);
            }
        }
        
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            effect.setSize(window.innerWidth, window.innerHeight);
        });
        
        init();
      `,
      mapsCodeSnippet: `
               let camera, scene, renderer, sphere;
        let currentMap = 'normal';
        
        const descriptions = {
            normal: {
                title: "Normal Map",
                text: "Normal maps simulate surface detail by telling the engine how light should bounce off the surface. They create the illusion of bumps and dents without adding extra geometry.",
                controls: [
                    { id: 'normalScaleX', label: 'Normal Scale X', min: 0, max: 3, step: 0.1, value: 1 },
                    { id: 'normalScaleY', label: 'Normal Scale Y', min: 0, max: 3, step: 0.1, value: 1 }
                ]
            },
            roughness: {
                title: "Roughness Map",
                text: "Roughness maps control how rough or smooth a surface appears. Rough surfaces create diffuse reflections (matte), while smooth surfaces create sharp reflections (glossy).",
                controls: [
                    { id: 'roughness', label: 'Base Roughness', min: 0, max: 1, step: 0.1, value: 1 },
                    { id: 'roughnessContrast', label: 'Pattern Contrast', min: 0, max: 1, step: 0.1, value: 1 }
                ]
            },
            metalness: {
                title: "Metalness Map",
                text: "Metalness maps define which parts of a surface are metallic (1) or non-metallic (0). Metallic surfaces reflect the environment and have colored reflections.",
                controls: [
                    { id: 'metalness', label: 'Base Metalness', min: 0, max: 1, step: 0.1, value: 1 },
                    { id: 'metalnessContrast', label: 'Gradient Intensity', min: 0, max: 1, step: 0.1, value: 1 }
                ]
            }
        };

        init();
        animate();

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('container').appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(5, 5, 5);
            scene.add(pointLight);

            createSphere();
            camera.position.z = 3;

            setupEventListeners();
            updateControls('normal');
        }

        function setupEventListeners() {
            window.addEventListener('resize', onWindowResize, false);
            
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    currentMap = tab.dataset.map;
                    updateDescription(currentMap);
                    updateControls(currentMap);
                    updateMaterial();
                });
            });
        }

        function updateDescription(mapType) {
            const desc = descriptions[mapType];
            document.getElementById('description').innerHTML = \`
                <h3>\${desc.title}</h3>
                <p>\${desc.text}</p>
            \`;
        }

        function updateControls(mapType) {
            const controlsContainer = document.getElementById('controls');
            const controls = descriptions[mapType].controls;
            
            controlsContainer.innerHTML = controls.map(control => \`
                <div class="control-group">
                    <label>\${control.label}:</label>
                    <div class="slider-row">
                        <input type="range" 
                               id="\${control.id}" 
                               min="\${control.min}" 
                               max="\${control.max}" 
                               step="\${control.step}" 
                               value="\${control.value}">
                        <span class="value-display">\${control.value}</span>
                    </div>
                </div>
            \`).join('');

            document.querySelectorAll('input[type="range"]').forEach(input => {
                input.addEventListener('input', (e) => {
                    e.target.nextElementSibling.textContent = parseFloat(e.target.value).toFixed(1);
                    updateMaterial();
                });
            });
        }

        function createSphere() {
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = createMaterial('normal');
            sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
        }

        function createMaterial(type) {
            switch(type) {
                case 'normal': {
                    const material = new THREE.MeshStandardMaterial({
                        color: 0x808080,
                        normalMap: createNormalMap(),
                        normalScale: new THREE.Vector2(
                            parseFloat(document.getElementById('normalScaleX')?.value || 1),
                            parseFloat(document.getElementById('normalScaleY')?.value || 1)
                        )
                    });
                    return material;
                }
                case 'roughness': {
                    const roughness = parseFloat(document.getElementById('roughness')?.value || 1);
                    const contrast = parseFloat(document.getElementById('roughnessContrast')?.value || 1);
                    return new THREE.MeshStandardMaterial({
                        color: 0x808080,
                        roughnessMap: createRoughnessMap(contrast),
                        roughness: roughness
                    });
                }
                case 'metalness': {
                    const metalness = parseFloat(document.getElementById('metalness')?.value || 1);
                    const contrast = parseFloat(document.getElementById('metalnessContrast')?.value || 1);
                    return new THREE.MeshStandardMaterial({
                        color: 0x808080,
                        metalnessMap: createMetalnessMap(contrast),
                        metalness: metalness
                    });
                }
            }
        }

        function createNormalMap() {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            for(let y = 0; y < canvas.height; y++) {
                for(let x = 0; x < canvas.width; x++) {
                    const r = 127 + 127 * Math.sin(x / 10);
                    const g = 127 + 127 * Math.sin(y / 10);
                    const b = 255;
                    ctx.fillStyle = \`rgb(\${r},\${g},\${b})\`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        function createRoughnessMap(contrast = 1) {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            const tileSize = 32;
            for(let y = 0; y < canvas.height; y++) {
                for(let x = 0; x < canvas.width; x++) {
                    let value = ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2);
                    value = value * contrast * 255;
                    ctx.fillStyle = \`rgb(\${value},\${value},\${value})\`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        function createMetalnessMap(contrast = 1) {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, \`rgb(\${0},\${0},\${0})\`);
            gradient.addColorStop(1, \`rgb(\${255 * contrast},\${255 * contrast},\${255 * contrast})\`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        function updateMaterial() {
            const newMaterial = createMaterial(currentMap);
            sphere.material.dispose();
            sphere.material = newMaterial;
        }

        function onWindowResize() {
            camera.aspect = (window.innerWidth - 340) / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth - 340, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
      `,
    importglbCodeSnippet:`
        let scene, camera, renderer, controls;
        let model;
        let lastTime = performance.now();
        let frameCount = 0;
        
        function init() {
            // Scene setup
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x333333);
            
            // Camera setup
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            
            // Renderer setup
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.outputEncoding = THREE.sRGBEncoding;
            document.body.appendChild(renderer.domElement);
            
            // Controls setup
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            
            // Lighting setup
            // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            // scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);
            
            // Setup GLTF and Draco loaders
            const dracoLoader = new THREE.DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
            
            const loader = new THREE.GLTFLoader();
            loader.setDRACOLoader(dracoLoader);

            // Load sample model
            document.getElementById('loading').style.display = 'block';
            loader.load(
                '/model.glb', // Replace with actual model URL
                function(gltf) {
                    model = gltf.scene;
                    
                    // Center model
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);
                    
                    // Scale model to fit view
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 5 / maxDim;
                    model.position.y -= 5;
                    model.scale.multiplyScalar(scale);
                    model.rotation.set(Math.PI / 2 ,Math.PI , Math.PI ); // (x, y, z) rotations 
                    scene.add(model);
                    
                    // Update model info
                    updateModelInfo();
                    document.getElementById('loading').style.display = 'none';
                },
                function(xhr) {
                    const percent = (xhr.loaded / xhr.total * 100).toFixed(1);
           
                },
                function(error) {
                    console.error('Error loading model:', error);
                    document.getElementById('loading').textContent = 
                        'Error loading model';
                }
            );
            
            // Setup controls
            setupControls();
            
            // Start animation
            animate();
        }
        
        function updateModelInfo() {
            let triangleCount = 0;
            let materialCount = 0;
            
            model.traverse(function(child) {
                if(child.isMesh) {
                    triangleCount += child.geometry.index.count / 3;
                    materialCount += child.material.length || 1;
                }
            });
            
            document.getElementById('triangles').textContent = triangleCount;
            document.getElementById('materials').textContent = materialCount;
        }
        
        function setupControls() {
            // Rotation controls
            document.getElementById('rotationX').addEventListener('input', function(e) {
                if(model) {
                    model.rotation.x = THREE.MathUtils.degToRad(parseFloat(e.target.value));
                }
            });
            
            document.getElementById('rotationY').addEventListener('input', function(e) {
                if(model) {
                    model.rotation.y = THREE.MathUtils.degToRad(parseFloat(e.target.value));
                }
            });
            
            // Scale control
            document.getElementById('scale').addEventListener('input', function(e) {
                if(model) {
                    const scale = parseFloat(e.target.value) / 100;
                    model.scale.setScalar(scale);
                }
            });
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            // Update controls
            controls.update();
            
            // Auto-rotate if enabled
            if(model && document.getElementById('autoRotate').checked) {
                model.rotation.z += 0.005;
                document.getElementById('rotationY').value = 
                    THREE.MathUtils.radToDeg(model.rotation.y) % 360;
            }
            
            // Update FPS counter
            frameCount++;
            const currentTime = performance.now();
            if(currentTime - lastTime >= 1000) {
                document.getElementById('fps').textContent = frameCount;
                frameCount = 0;
                lastTime = currentTime;
            }
            
            renderer.render(scene, camera);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        init();
    `,
      sections: [
        {
          id: "webgl-explanation",
          title: "Understanding Three.js",
          content: [
            {
              type: "text",
              body: "Three.js is a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser.",
            },
            {
              type: "subsection",
              title: "Basic Components to Use Three.js",
              body: "The basic components that form the foundation of Three.js component include: Scene, Camera and Renderer",
            },
            {
              type: "list",
              listitems: [
                "Scene: The THREE.Scene() is the container for all objects, lights, and cameras in the 3D environment.",
                "Camera: The THREE.PerspectiveCamera() defines the viewer's perspective.",
                "Renderer: The THREE.WebGLRenderer() renders the scene and camera onto the screen.",
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {
    section() {
      return this.sections[0]; // Assumes there's only one section; adjust as needed
    },
    listItems() {
      const listContent = this.section.content.find(
        (content) => content.type === "list"
      );
      return listContent ? listContent.listitems : [];
    },
  },
};
</script>

<style scoped>
.toc {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;
  border: 1px solid #eef2f7;
}

.toc-title {
  color: #2d3748;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  position: relative;
  font-weight: 600;
}

.toc-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #86af49;
  border-radius: 2px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0.5rem 0;
}

.toc-item a {
  color: #4a5568;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  display: block;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 1.5rem;
}

.toc-item a::before {
  content: "›";
  position: absolute;
  left: 0.5rem;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.2s ease;
}

.toc-item a:hover {
  background: #f7fafc;
  color: #86af49;
  transform: translateX(5px);
}

.toc-item a:hover::before {
  opacity: 1;
  transform: translateX(0);
}

.nested-list {
  list-style: none;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  border-left: 2px solid #edf2f7;
}

.nested-item {
  margin: 0.25rem 0;
}

.nested-item a {
  font-size: 1rem;
  color: #718096;
  padding: 0.4rem 1rem;
}

.nested-item a:hover {
  color: #86af49;
  background: #f7fafc;
}

.toc-item a.active,
.nested-item a.active {
  color: #86af49;
  background: #f0f9ff;
}

@media (max-width: 768px) {
  .toc {
    padding: 1.5rem;
  }

  .toc-title {
    font-size: 1.5rem;
  }

  .toc-item a {
    font-size: 1rem;
  }

  .nested-item a {
    font-size: 0.9rem;
  }
}

@media print {
  .toc {
    box-shadow: none;
    border: 1px solid #eee;
  }

  .toc-item a,
  .nested-item a {
    color: #000;
  }

  .toc-item a::before {
    display: none;
  }
}

.learning-outcomes {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;
  border: 1px solid #eef2f7;
}

.title {
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.75rem;
}

.title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #86af49;
  border-radius: 2px;
}

.intro {
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.outcomes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.outcome-item {
  padding: 1rem 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #86af49;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.outcome-item:hover {
  transform: translateX(8px);
  background: #edf2f7;
}

.outcome-text {
  color: #2d3748;
  font-size: 1.1rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .learning-outcomes {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .intro {
    font-size: 1rem;
  }

  .outcome-text {
    font-size: 1rem;
  }

  .outcome-item {
    padding: 0.75rem 1rem;
  }
}

.webgl-intro {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  color: #2d3748;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
}

.section-content {
  padding: 1.5rem;
}

.text {
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.timeline {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
}

.timeline-event {
  text-align: center;
}

.year {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.event {
  font-size: 0.875rem;
  color: #4a5568;
}

.pipeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  overflow-x: hidden;
}

.stage {
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  min-width: 0;
}

.stage h3 {
  color: #2d3748;
  margin: 0 0 1rem 0;
}

.stage p {
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.code-block {
  margin: 1rem 0;
  background: #1a202c;
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  padding: 0.75rem 1rem;
  background: #2d3748;
  color: #e2e8f0;
  font-size: 0.875rem;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

code {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  display: block;
  width: 100%;
}

@media (max-width: 1024px) {
  .pipeline {
    grid-template-columns: 1fr;
  }

  .timeline {
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline-event {
    margin-bottom: 1rem;
  }
}
.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button.active {
  background-color: #86af49;
  color: white;
}

button:hover:not(.active) {
  background-color: #e0e0e0;
}

.iframe-container {
  border: 1px solid #ccc;
  padding: 20px;
  margin: auto;
  border-radius: 5px;
  width: 100%;
  height: 650px;
  overflow: hidden;
}

.code-container {
  border: 1px solid #ccc;
  padding: 15px;
  margin: auto;
  border-radius: 5px;
  width: 100%;
  height: 650px;
  overflow: scroll;
}

pre {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.summary-text {
  margin-left: 1em;
  margin-right: 1em;
  line-height: 2;
}

.particle-comparison {
  display: flexbox;
}

.flex-container {
  display: flex;
  justify-content: space-between; /* Distribute the divs evenly */
  align-items: center; /* Vertically center the divs */
  background-color: #f4f4f4;
  padding: 20px;
}

.flex-item {
  background-color: #86AF49;
  color: white;
  padding: 20px;
  width: 30%; /* Control the width of each item */
  text-align: center;
  border-radius: 8px;
}
</style>

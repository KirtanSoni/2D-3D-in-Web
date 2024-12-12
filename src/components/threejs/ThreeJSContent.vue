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
          <pre><code>{{ meshMaterialCodeSnippet }}</code></pre>
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
          <pre><code>{{ meshMaterialCodeSnippet }}</code></pre>
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
    <section id="live-demo">
      <h2 class="title">Build Your First Three.js Project!</h2>
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
          <pre><code>{{ meshMaterialCodeSnippet }}</code></pre>
        </div>
      </div>
    </section>
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
      ParticleCodeSnippet: `
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

      meshMaterialCodeSnippet: `
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
      mapsCodeSnippet: `
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

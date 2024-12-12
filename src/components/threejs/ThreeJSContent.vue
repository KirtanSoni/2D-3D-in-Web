<template>
  <div>
    <h2>Three.js: 3D Graphics Library</h2>

    <section>
      <h3>Learning Objectives</h3>
      <p>
        At the end of this tutorial you should be confident with the following
        concepts:
      </p>
      <ul>
        <li>Basic Components used in a Three.js application.</li>
        <li>Various camera types used as part of the library, namely:</li>
        <li>Different types of mapping used in the Three.js library.</li>
        <li>
          Different default types of shapes, materials, lights and textures
          provided by Three.js.
        </li>
        <li>
          FPS Comparison based on different particle types: Basic Particles, GPU
          Particles and Sprite Particles.
        </li>
        <li>Different Art Styles</li>
      </ul>
    </section>
    <br />
    <section>
      <h3>Introduction</h3>
      <p>
        Three.js is a cross-browser JavaScript library and API used to create
        and display animated 3D computer graphics in a web browser.
      </p>
    </section>

    <section>
      <h3>Basic Components to Use Three.js</h3>
      <p>
        The basic components that form the foundation of Three.js component
        include:
      </p>
      <ul>
        <li>
          Scene: The THREE.Scene() is the container for all objects, lights, and
          cameras in the 3D environment.
          <ul>
            <li>
              Acts as a container for all 3D objects, lights, and cameras.
            </li>
            <li>Think of it as the "stage" where everything happens.</li>
          </ul>
        </li>
        <li>
          Camera: The THREE.PerspectiveCamera() defines the viewer's
          perspective.
          <ul>
            <li>Determines the viewer's perspective of the scene.</li>
            <li>
              Common types: PerspectiveCamera (3D perspective),
              OrthographicCamera (2D-like rendering).
            </li>
          </ul>
        </li>
        <li>
          Renderer: The THREE.WebGLRenderer() renders the scene and camera onto
          the screen.
          <ul>
            <li>
              Converts the scene and camera view into 2D pixels on the screen.
            </li>
            <li>Uses WebGL to render graphics in the browser.</li>
          </ul>
        </li>
      </ul>
      <!-- <div ref="mermaidContainer" class="mermaid">
    graph TD
    Scene[Scene THREE.Scene] -- > Renderer[Renderer THREE.WebGLRenderer]
    Camera[Camera THREE.Camera] -- > Renderer
    Renderer -- > Screen[Print on Screen 2D Pixels]
  </div> -->
      <div class="code-section">
        <code>
          <pre>
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

        // Handle window resizing
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
      </pre
          >
        </code>
      </div>
      <iframe
        src="./simpleTriangle.html"
        frameborder="0"
        width="800"
        height="600"
      ></iframe>
      <br />
      <h3>Different Camera Types in Three.js</h3>
      <h4>Perspective Camera</h4>
      <ul>
        <li>
          Description: Models how the human eye perceives the world, where
          objects farther away appear smaller.
        </li>
        <li>Use Case: Ideal for creating realistic 3D scenes.</li>
        <li>
          Syntax:
          <div class="code-section">
            <code>
              <pre>
            const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
          </pre
              >
            </code>
          </div>
          <ul>
            <li>fov: Field of view in degrees (vertical).</li>
            <li>aspect: Aspect ratio (width/height).</li>
            <li>
              near and far: Clipping planes; objects outside this range won't be
              visible.
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <h4>Orthographic Camera</h4>
      <ul>
        <li>
          Description: Projects objects without perspective, where size remains
          constant regardless of distance.
        </li>
        <li>
          Use Case: Commonly used for 2D scenes, CAD applications, and UI
          overlays.
        </li>
        <li>
          Syntax:
          <div class="code-section">
            <code>
              <pre>
            const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
          </pre
              >
            </code>
          </div>
          <ul>
            <li>left, right, top, bottom: Define the camera’s view box.</li>
            <li>near and far: Clipping planes.</li>
          </ul>
        </li>
      </ul>
      <br />
      <h4>Array Camera</h4>
      <ul>
        <li>
          Description: Allows rendering the scene from multiple perspectives
          simultaneously.
        </li>
        <li>Use Case: Used in VR or multi-view rendering setups.</li>
        <li>
          Syntax:
          <div class="code-section">
            <code>
              <pre>
            const camera = new THREE.ArrayCamera(arrayOfCameras);
          </pre
              >
            </code>
          </div>
          <ul>
            <li>
              arrayOfCameras: An array of PerspectiveCamera or
              OrthographicCamera objects.
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <h4>Stereo Camera</h4>
      <ul>
        <li>
          Description: Mimics the two-camera setup for stereoscopic 3D
          rendering.
        </li>
        <li>
          Use Case: Used for creating 3D effects with red/blue or VR glasses.
        </li>
        <li>
          Syntax:
          <div class="code-section">
            <code>
              <pre>
            const camera = new THREE.StereoCamera();
          </pre
              >
            </code>
          </div>
        </li>
      </ul>
      <div class="code-section">
        <code>
          <pre>
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
      </pre
          >
        </code>
      </div>
      <p>
        The following code allows you to visualize the output of applying
        different camera types in Three.js:
      </p>
      <br />
      <iframe
        src="./camera.html"
        frameborder="0"
        width="800"
        height="600"
      ></iframe>
      <br />
      <h3>Different Types of Maps in Three.js</h3>
      <code>
        <pre>
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
            document.getElementById('description').innerHTML = `
                <h3>${desc.title}</h3>
                <p>${desc.text}</p>
            `;
        }

        function updateControls(mapType) {
            const controlsContainer = document.getElementById('controls');
            const controls = descriptions[mapType].controls;
            
            controlsContainer.innerHTML = controls.map(control => `
                <div class="control-group">
                    <label>${control.label}:</label>
                    <div class="slider-row">
                        <input type="range" 
                               id="${control.id}" 
                               min="${control.min}" 
                               max="${control.max}" 
                               step="${control.step}" 
                               value="${control.value}">
                        <span class="value-display">${control.value}</span>
                    </div>
                </div>
            `).join('');
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
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
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
                    ctx.fillStyle = `rgb(${value},${value},${value})`;
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
            gradient.addColorStop(0, `rgb(${0},${0},${0})`);
            gradient.addColorStop(1, `rgb(${255 * contrast},${255 * contrast},${255 * contrast})`);
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
        </pre>
      </code>
      <p>
        In Three.js, maps are textures applied to materials to define the
        appearance of 3D objects. Different types of maps control various
        aspects of how an object looks, such as its color, surface details, and
        reflections. Below are the key types of maps in Three.js:
      </p>
      <iframe
        src="./materialmaps.html"
        frameborder="0"
        width="800"
        height="600"
      ></iframe>
      <h3>
        Different default types of shapes, materials, lights and textures
        provided by Three.js:
      </h3>
      <p>
        <b>Shapes:</b> In Three.js, the most readily available "default" shapes
        are basic geometric primitives like cubes, spheres, cylinders, cones,
        planes, and a simple triangle which can be accessed through built-in
        geometries like BoxGeometry, SphereGeometry, CylinderGeometry,
        ConeGeometry, PlaneGeometry, and ShapeGeometry respectively; all of
        which can be customized further with parameters like radius, height,
        width, and segment divisions
      </p>
      <p>
        <b>Materials:</b> Materials describe the appearance of objects. They are
        defined in a (mostly) renderer-independent way, so you don't have to
        rewrite materials if you decide to use a different renderer.
      </p>
      <p>Material() is the constructor and creates a generic material.</p>
      <li>
        <b>BasicLineMaterial:</b> A material for drawing wireframe-style
        geometries.
      </li>
      <code>
        <pre>
          const material = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 1,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
} );
        </pre>
      </code>
      <li>
        <b>MeshPhongMaterial:</b> A material for shiny surfaces with specular
        highlights.Unlike the Lambertian model used in the MeshLambertMaterial
        this can simulate shiny surfaces with specular highlights.
        MeshPhongMaterial uses per-fragment shading.
      </li>
      <br />
      <li>
        <b>MeshLambertMaterial:</b> A material for non-shiny surfaces, without
        specular highlights.This can simulate some surfaces (such as untreated
        wood or stone) well, but cannot simulate shiny surfaces with specular
        highlights (such as varnished wood). MeshLambertMaterial uses
        per-fragment shading.
      </li>
      <br />
      <li>
        <b>MeshStandardMaterial:</b> A standard physically based material, using
        Metallic-Roughness workflow. Physically based rendering (PBR) has
        recently become the standard in many 3D applications, such as Unity,
        Unreal and 3D Studio Max.
      </li>
      <br />
      <li><b>MeshToonMaterial:</b> A material implementing toon shading.</li>
      <br />
      <li>
        <b>MeshPhysicalMaterial:</b> An extension of the MeshStandardMaterial,
        providing more advanced physically-based rendering properties like
        anistropy, clearcoat, iridescence, physically-based transparency,
        advanced reflectivity and sheen.
      </li>
      <br />
      <p>
        <b>Lights:</b> In Three.js, the default light is an AmbientLight with a
        white color (0xffffff) and an intensity of 1, meaning it uniformly
        illuminates the entire scene without casting shadows; essentially, it's
        a "global" light source that affects all objects equally.
      </p>
      <code>
        <pre>
          const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 1
scene.add(ambientLight)
        </pre>
      </code>
      <li>
        <b>PointLight:</b> Emits light from a single point in all directions and
        can cast shadows. It's often used to replicate the light from a bare
        lightbulb.
      </li>
      <br>
      <li>
        <b>DirectionalLight:</b> The DirectionalLight will have a sun-like effect as if the sun rays were traveling in parallel. The first parameter is the color and the second parameter is the intensity
      </li>
      <code>
        <pre>
          const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
scene.add(directionalLight)
        </pre>
      </code>

      <iframe
        src="./meshLightsTextures.html"
        frameborder="0"
        width="800"
        height="600"
      ></iframe>
      <h3>Comparison of performance based on FPS</h3>
      <iframe
        src="./partical.html"
        frameborder="0"
        width="800"
        height="600"
      ></iframe>
      <iframe
        src="./importglb.html"
        frameborder="0"
        width="800"
        height="600"
      ></iframe>
      <iframe
        src="./art.html"
        frameborder="0"
        width="800"
        height="600"
      ></iframe>
    </section>
  </div>
</template>

<script>
export default {
  name: "ThreeJSContent",
};
</script>

<style scoped>
.code-section {
  position: relative;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}
</style>

<template>
  <div>
    <h2>Three.js: 3D Graphics Library</h2>
    <section>
      <h3>Introduction</h3>
      <p>Three.js is a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser.</p>
    </section>

    <section>
  <h3>Basic Components to Use Three.js</h3>

  <!-- <div ref="mermaidContainer" class="mermaid">
    graph TD
    Scene[Scene THREE.Scene] -- > Renderer[Renderer THREE.WebGLRenderer]
    Camera[Camera THREE.Camera] -- > Renderer
    Renderer -- > Screen[Print on Screen 2D Pixels]
  </div> -->
  <iframe src="./simpleTriangle.html" frameborder="0" width="800" height="600"></iframe>
  <iframe src="./camera.html" frameborder="0" width="800" height="600"></iframe>
  <iframe src="./materialmaps.html" frameborder="0" width="800" height="600"></iframe>
  <iframe src="./meshLightsTextures.html" frameborder="0" width="800" height="600"></iframe>
  <iframe src="./partical.html" frameborder="0" width="800" height="600"></iframe>
  <iframe src="./importglb.html" frameborder="0" width="800" height="600"></iframe>
    <iframe src="./art.html" frameborder="0" width="800" height="600"></iframe>
  <h4>Scene (THREE.Scene)</h4>
    <ul>
      <li>Acts as a container for all 3D objects, lights, and cameras.</li>
      <li>Think of it as the "stage" where everything happens.</li>
    </ul>
  <h5>Example</h5>
  <p class="code">
    const scene = new THREE.Scene();
  </p>

  <h4>Camera (THREE.Camera)</h4>
    <ul>
      <li>Determines the viewer's perspective of the scene.</li>
      <li>Common types: PerspectiveCamera (3D perspective), OrthographicCamera (2D-like rendering).</li>
    </ul>
  <h5>Example</h5>
  <p class="code">
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
  </p>

  <h4>Renderer (THREE.WebGLRenderer)</h4>
    <ul>
      <li>Converts the scene and camera view into 2D pixels on the screen.</li>
      <li>Uses WebGL to render graphics in the browser.</li>
    </ul>
  <h5>Example</h5>
  <p class="code">
    const renderer = new THREE.WebGLRenderer();<br>
    renderer.setSize(window.innerWidth, window.innerHeight);<br>
    document.body.appendChild(renderer.domElement);<br>
  </p>
</section>
  </div>
</template>



<script>

export default {
  name: 'ThreeJSContent'
}
</script>
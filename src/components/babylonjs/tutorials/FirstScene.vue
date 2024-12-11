<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

export default {
  name: 'FirstScene',
  setup() {
    const canvasRef = ref(null);
    const copyStatus = ref('Copy Code');
    let engine = null;
    let scene = null;

    const tutorial = `const createScene = function() {
    // Create a basic scene
    const scene = new BABYLON.Scene(engine);

    // Add a camera
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0, Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // Add lighting
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // Create a basic shape
    const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

    return scene;
};`;

    const createScene = (canvas) => {
      engine = new BABYLON.Engine(canvas, true);
      scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0, Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

      return scene;
    };

    const copyCode = async () => {
      try {
        await navigator.clipboard.writeText(tutorial);
        copyStatus.value = 'Copied!';
        setTimeout(() => {
          copyStatus.value = 'Copy Code';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        copyStatus.value = 'Failed to copy';
      }
    };

    onMounted(() => {
      if (canvasRef.value) {
        scene = createScene(canvasRef.value);
        engine.runRenderLoop(() => {
          scene.render();
        });

        window.addEventListener('resize', () => {
          engine.resize();
        });
      }
    });

    onBeforeUnmount(() => {
      if (engine) {
        engine.dispose();
      }
    });

    return {
      canvasRef,
      tutorial,
      copyStatus,
      copyCode
    };
  }
};
</script>

<template>
  <div class="tutorial-container">
    <h4>Creating Your First Scene</h4>
    
    <div class="content-section">
      <p>Start with creating a basic scene in Babylon.js. This includes setting up the essential components: a scene, camera, light, and a basic shape.</p>
      
      <div class="code-section">
        <button @click="copyCode" class="copy-button">
          {{ copyStatus }}
        </button>
        <pre><code>{{ tutorial }}</code></pre>
      </div>

      <div class="demo-section">
        <h5>Live Demo</h5>
        <p class="demo-instructions">
          Click and drag to rotate the camera around the cube. Use the scroll wheel to zoom in/out.
        </p>
        <canvas ref="canvasRef"></canvas>
      </div>

      <div class="explanation">
        <h5>Key Concepts:</h5>
        <ul>
          <li>Scene initialization: Creating the basic 3D environment</li>
          <li>Camera setup: Configuring the viewpoint and controls</li>
          <li>Basic lighting: Adding illumination to the scene</li>
          <li>Creating primitive shapes: Adding 3D objects</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tutorial-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.content-section {
  margin-top: 20px;
}

.code-section {
  position: relative;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 12px;
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.demo-section {
  margin: 20px 0;
}

.demo-instructions {
  margin-bottom: 10px;
  color: #666;
}

canvas {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  background: #000;
}

.explanation {
  margin-top: 20px;
}

.explanation ul {
  padding-left: 20px;
}

.explanation li {
  margin: 5px 0;
}
</style>
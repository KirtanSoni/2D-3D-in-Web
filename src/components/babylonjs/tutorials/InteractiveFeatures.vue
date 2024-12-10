<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

export default {
  name: 'InteractiveFeatures',
  setup() {
    const canvasRef = ref(null);
    const copyStatus = ref('Copy Code');
    let engine = null;
    let scene = null;

    const tutorial = `const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    
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
    // Create multiple boxes
    const redBox = BABYLON.MeshBuilder.CreateBox("redBox", {}, scene);
    redBox.position.x = -2;
    redBox.material = new BABYLON.StandardMaterial("redMat", scene);
    redBox.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    const blueBox = BABYLON.MeshBuilder.CreateBox("blueBox", {}, scene);
    blueBox.position.x = 2;
    blueBox.material = new BABYLON.StandardMaterial("blueMat", scene);
    blueBox.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
    // Add actions
    redBox.actionManager = new BABYLON.ActionManager(scene);
    redBox.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            redBox,
            'scaling',
            new BABYLON.Vector3(1.2, 1.2, 1.2),
            1000
        )
    );
    blueBox.actionManager = new BABYLON.ActionManager(scene);
    blueBox.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            blueBox,
            'rotation.y',
            Math.PI,
            1000
        )
    );
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

      const redBox = BABYLON.MeshBuilder.CreateBox("redBox", {}, scene);
      redBox.position.x = -2;
      redBox.material = new BABYLON.StandardMaterial("redMat", scene);
      redBox.material.diffuseColor = new BABYLON.Color3(1, 0, 0);

      const blueBox = BABYLON.MeshBuilder.CreateBox("blueBox", {}, scene);
      blueBox.position.x = 2;
      blueBox.material = new BABYLON.StandardMaterial("blueMat", scene);
      blueBox.material.diffuseColor = new BABYLON.Color3(0, 0, 1);

      redBox.actionManager = new BABYLON.ActionManager(scene);
      redBox.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          redBox,
          'scaling',
          new BABYLON.Vector3(1.2, 1.2, 1.2),
          1000
        )
      );

      blueBox.actionManager = new BABYLON.ActionManager(scene);
      blueBox.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          blueBox,
          'rotation.y',
          Math.PI,
          1000
        )
      );

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
    <h4>Interactive Features (30 minutes)</h4>
    
    <div class="content-section">
      <p>Learn how to add interactivity to your 3D objects using Babylon.js's Action Manager system.</p>
      
      <div class="code-section">
        <button @click="copyCode" class="copy-button">
          {{ copyStatus }}
        </button>
        <pre><code>{{ tutorial }}</code></pre>
      </div>

      <div class="demo-section">
        <h5>Live Demo</h5>
        <p class="interaction-note">Click on the boxes to see different interactions:</p>
        <ul class="interaction-list">
          <li>Red box: Scales up when clicked</li>
          <li>Blue box: Rotates when clicked</li>
        </ul>
        <canvas ref="canvasRef"></canvas>
      </div>

      <div class="explanation">
        <h5>Key Concepts:</h5>
        <ul>
          <li>Action Manager: Setting up interaction handlers</li>
          <li>Triggers: Different types of interaction events</li>
          <li>Actions: Various responses to interactions</li>
          <li>Value Interpolation: Smooth transitions between states</li>
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

.interaction-note {
  margin-bottom: 10px;
  color: #666;
}

.interaction-list {
  margin-bottom: 15px;
  padding-left: 20px;
  color: #666;
  font-size: 0.9em;
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
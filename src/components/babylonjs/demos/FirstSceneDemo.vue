<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

export default {
  name: 'FirstSceneDemo',
  setup() {
    const canvasRef = ref(null);
    let engine = null;
    let scene = null;

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
      canvasRef
    };
  }
}
</script>
<template>
    <div class="demo-container">
      <p class="demo-instructions">
        Click and drag to rotate the camera around the cube. Use the scroll wheel to zoom in/out.
      </p>
      <canvas ref="canvasRef"></canvas>
    </div>
</template>
  
<style scoped>
  .demo-container {
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
</style>
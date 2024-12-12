<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

export default {
  name: 'InteractiveFeaturesDemo',
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
          new BABYLON.Vector3(2, 2, 2),
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
          2000
        )
      );

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
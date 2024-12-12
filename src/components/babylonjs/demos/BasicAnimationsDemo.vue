<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

export default {
  name: 'BasicAnimationsDemo',
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

      // Create PBR material
      const pbr = new BABYLON.PBRMaterial("pbr", scene);
      pbr.metallic = 0.6;
      pbr.roughness = 0.4;
      pbr.albedoColor = new BABYLON.Color3(0.24, 0.79, 0.24);

      box.material = pbr;
      
      const animation = new BABYLON.Animation(
        "boxRotation",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );

      const keys = [];
      keys.push({ frame: 0, value: 0 });
      keys.push({ frame: 100, value: 2 * Math.PI });
      animation.setKeys(keys);

      box.animations = [animation];
      scene.beginAnimation(box, 0, 100, true);

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
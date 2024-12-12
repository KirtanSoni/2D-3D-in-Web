<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

export default {
  name: 'ParticleSystemDemo',
  setup() {
    const canvasRef = ref(null);
    let engine = null;
    let scene = null;

    const createScene = (canvas) => {
      engine = new BABYLON.Engine(canvas, true);
      scene = new BABYLON.Scene(engine);

      // Set black background
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

      // Camera
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0, Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
      
      // Light
      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      
      // Create particle system
      const particleSystem = new BABYLON.ParticleSystem("stars", 2000, scene);
      
      // Particle texture
      const particleTexture = new BABYLON.Texture("/textures/flare.png", scene);
      particleSystem.particleTexture = particleTexture;
      
      // Set particle emission point
      particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);
      particleSystem.minEmitBox = new BABYLON.Vector3(-5, -5, -5);
      particleSystem.maxEmitBox = new BABYLON.Vector3(5, 5, 5);
      
      // Size
      particleSystem.minSize = 0.1;
      particleSystem.maxSize = 0.3;
      
      // Lifetime
      particleSystem.minLifeTime = 8;
      particleSystem.maxLifeTime = 10;
      
      // Emission rate
      particleSystem.emitRate = 100;
      
      // Blend mode
      particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
      
      // Color
      particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
      particleSystem.color2 = new BABYLON.Color4(0.8, 0.8, 1, 1);
      
      // Speed and direction
      particleSystem.minInitialRotation = 0;
      particleSystem.maxInitialRotation = Math.PI;
      particleSystem.minEmitPower = 0;
      particleSystem.maxEmitPower = 0.1;
      
      // Start particle system
      particleSystem.start();

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
  position: relative;
  background: #000;
}

canvas {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  background: #000;
}
</style>
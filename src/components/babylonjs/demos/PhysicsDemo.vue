<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';
import '@babylonjs/core/Physics/physicsEngineComponent';
import * as CANNON from 'cannon';

export default {
  name: 'PhysicsDemo',
  setup() {
    const canvasRef = ref(null);
    let engine = null;
    let scene = null;
    let box = null;
    let initialPosition = null;

    const resetScene = () => {
      if (box) {
        // Reset position and physics state
        box.position = initialPosition.clone();
        box.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        box.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
        box.rotationQuaternion = BABYLON.Quaternion.Identity();
      }
    };

    const createScene = (canvas) => {
      engine = new BABYLON.Engine(canvas, true);
      scene = new BABYLON.Scene(engine);

      // Enable physics
      scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin(true, 10, CANNON));

      // Camera
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0, Math.PI / 3,
        15,
        new BABYLON.Vector3(0, 5, 0),
        scene
      );
      camera.attachControl(canvas, true);

      // Light
      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      light.intensity = 0.7;

      // Ground
      const ground = BABYLON.MeshBuilder.CreateGround("ground", {
        width: 10,
        height: 10
      }, scene);
      
      const groundMaterial = new BABYLON.PBRMaterial("groundMaterial", scene);
      groundMaterial.metallic = 0.1;
      groundMaterial.roughness = 0.8;
      groundMaterial.albedoColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      ground.material = groundMaterial;

      // Add physics to ground
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.5 },
        scene
      );

      // Create falling box
      box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
      initialPosition = new BABYLON.Vector3(0, 8, 0);
      box.position = initialPosition.clone();

      // Box material
      const pbr = new BABYLON.PBRMaterial("pbr", scene);
      pbr.metallic = 0.6;
      pbr.roughness = 0.4;
      pbr.albedoColor = new BABYLON.Color3(0.24, 0.79, 0.24);
      box.material = pbr;

      // Add physics to box
      box.physicsImpostor = new BABYLON.PhysicsImpostor(
        box,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: 0.5, friction: 0.1 },
        scene
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
      canvasRef,
      resetScene
    };
  }
}
</script>

<template>
  <div class="demo-container">
    
    <div class="controls">
      <button @click="resetScene" class="reset-button">Reset Scene</button>
    </div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.demo-container {
  margin: 20px 0;
  position: relative;
}

.controls {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.reset-button {
  background: #86af49;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.reset-button:hover {
  background: #6f9339;
}

canvas {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  background: #000;
}
</style>
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/loaders/glTF';
import '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';

export default {
  name: 'ImportModelDemo',
  setup() {
    const canvasRef = ref(null);
    let engine = null;
    let scene = null;

    const createScene = async (canvas) => {
      engine = new BABYLON.Engine(canvas, true);
      scene = new BABYLON.Scene(engine);

      // Create camera
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 2,
        5,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
      camera.lowerRadiusLimit = 1;
      camera.upperRadiusLimit = 20;

      // Add lights
      const light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );
      light1.intensity = 1;

      try {
        console.log("Starting model load...");
        const result = await BABYLON.SceneLoader.ImportMeshAsync(
          "",
          "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/",
          "Duck.gltf",
          scene
        );
        
        console.log("Load result:", result);
        
        if (result.meshes.length > 0) {
          const duck = result.meshes[0];
          console.log("Duck mesh:", duck);
          
          duck.scaling = new BABYLON.Vector3(1, 1, 1);
          duck.position = new BABYLON.Vector3(0, 0, 0);
          
          // Add rotation animation on click
          duck.actionManager = new BABYLON.ActionManager(scene);
          duck.actionManager.registerAction(
            new BABYLON.IncrementValueAction(
              BABYLON.ActionManager.OnPickTrigger,
              duck,
              'rotation.y',
              Math.PI/2,
              1000
            )
          );
        }
      } catch (error) {
        console.error("Error loading model:", error);
        
        // Create fallback red box if model fails to load
        const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
        const boxMaterial = new BABYLON.StandardMaterial("boxMat", scene);
        boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
        box.material = boxMaterial;
      }

      return scene;
    };

    onMounted(() => {
      if (canvasRef.value) {
        createScene(canvasRef.value).then(() => {
          engine.runRenderLoop(() => {
            if (scene) {
              scene.render();
            }
          });
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
      Left-click and drag the model to make it rotate. Right-click and drag to move the camera.
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
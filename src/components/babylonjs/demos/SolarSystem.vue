<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from 'babylonjs';

export default {
  name: 'SolarSystem',
  setup() {
    const canvasRef = ref(null);
    let engine = null;
    let scene = null;
    let planets = {};

    const createStarBackground = (scene) => {
      // Create a skybox
      const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
      const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.disableLighting = true;
      
      // Create dynamic texture for stars
      const size = 512;
      const textureContext = new BABYLON.DynamicTexture("starTexture", size, scene);
      const textureCtx = textureContext.getContext();
      
      // Fill with black background
      textureCtx.fillStyle = 'black';
      textureCtx.fillRect(0, 0, size, size);
      
      // Draw stars
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const brightness = Math.random();
        textureCtx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        textureCtx.fillRect(x, y, 1, 1);
      }
      
      textureContext.update();
      
      // Apply texture to all faces of the skybox
      skyboxMaterial.reflectionTexture = textureContext;
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.emissiveTexture = textureContext;
      skybox.material = skyboxMaterial;
      
      // Ensure skybox follows the camera
      skybox.infiniteDistance = true;
    };

    const createScene = (canvas) => {
      engine = new BABYLON.Engine(canvas, true);
      scene = new BABYLON.Scene(engine);

      // Set the clear color to pure black
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

      // Camera
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0,
        Math.PI / 3,
        100,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
      camera.lowerRadiusLimit = 50;
      camera.upperRadiusLimit = 200;

      // Add star background
      createStarBackground(scene);

      // Main light
      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      light.intensity = 0.7;

      // Sun
      const sun = BABYLON.MeshBuilder.CreateSphere("sun", { diameter: 8 }, scene);
      const sunMaterial = new BABYLON.StandardMaterial("sunMaterial", scene);
      sunMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0);
      sun.material = sunMaterial;

      // Add glow layer for sun
      const glowLayer = new BABYLON.GlowLayer("glow", scene);
      glowLayer.intensity = 0.5;

      // Planet creation function
      const createPlanet = (name, diameter, distance, orbitSpeed, color) => {
        const planet = BABYLON.MeshBuilder.CreateSphere(name, { diameter }, scene);
        const material = new BABYLON.StandardMaterial(`${name}Material`, scene);
        material.diffuseColor = color;
        planet.material = material;
        planet.position.x = distance;
        planet.orbit = {
          distance,
          angle: Math.random() * Math.PI * 2,
          speed: orbitSpeed
        };
        return planet;
      };

      // Create planets
      planets = {
        mercury: createPlanet("mercury", 1, 15, 0.047, new BABYLON.Color3(0.7, 0.7, 0.7)),
        venus: createPlanet("venus", 1.5, 20, 0.035, new BABYLON.Color3(0.9, 0.7, 0.5)),
        earth: createPlanet("earth", 2, 28, 0.029, new BABYLON.Color3(0.3, 0.6, 1)),
        mars: createPlanet("mars", 1.2, 35, 0.024, new BABYLON.Color3(1, 0.4, 0)),
        jupiter: createPlanet("jupiter", 4, 45, 0.013, new BABYLON.Color3(0.8, 0.6, 0.4)),
        saturn: createPlanet("saturn", 3.5, 58, 0.009, new BABYLON.Color3(0.9, 0.8, 0.6)),
        uranus: createPlanet("uranus", 2.5, 70, 0.006, new BABYLON.Color3(0.6, 0.8, 0.9)),
        neptune: createPlanet("neptune", 2.4, 85, 0.005, new BABYLON.Color3(0.2, 0.4, 0.9))
      };

      // Create Saturn's rings
      const ringRadius = 5;
      const rings = BABYLON.MeshBuilder.CreateTorus("rings", {
        diameter: ringRadius * 2,
        thickness: 0.3,
        tessellation: 32
      }, scene);
      rings.parent = planets.saturn;
      rings.rotation.x = Math.PI / 3;

      // Animation
      scene.onBeforeRenderObservable.add(() => {
        Object.values(planets).forEach(planet => {
          planet.orbit.angle += planet.orbit.speed / 100;
          planet.position.x = Math.cos(planet.orbit.angle) * planet.orbit.distance;
          planet.position.z = Math.sin(planet.orbit.angle) * planet.orbit.distance;
        });
      });

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
  <div class="solar-system-container">
    <canvas ref="canvasRef" class="solar-system-canvas"></canvas>
    <div class="info-panel">
      <h3>Solar System Simulation</h3>
      <p>Controls:</p>
      <ul>
        <li>Left click + drag to rotate camera</li>
        <li>Right click + drag to pan</li>
        <li>Scroll in or out zoom</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.solar-system-container {
  width: 100%;
  height: 600px;
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
}

.solar-system-canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}

.info-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  border-radius: 8px;
  pointer-events: none;
}

.info-panel h3 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
}

.info-panel ul {
  margin: 0;
  padding-left: 20px;
}

.info-panel li {
  margin: 5px 0;
  font-size: 0.9em;
}
</style>
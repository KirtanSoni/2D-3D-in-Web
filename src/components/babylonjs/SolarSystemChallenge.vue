<script>
import SolarSystem from './demos/SolarSystem.vue';

export default {
  name: 'SolarSystemChallenge',
  components: {
    SolarSystem
  }
}
</script>

<template>
  <div class="challenge-container">
    <div class="challenge-intro">
      <h2>Challenge: Solar System</h2>
      <p>Now that you've learned the fundamentals of Babylon.js, try to recreate this solar system! This project combines everything we've covered in the previous tutorials, and also adds few new topics.</p>
    </div>
    <div class="challenge-requirements">
      <h3>Key Requirements:</h3>
      <ul>
        <li>Create a scene with a black background and appropriate lighting</li>
        <li>Implement an ArcRotateCamera with proper zoom limits</li>
        <li>Create a central sun with emissive material and glow effect</li>
        <li>Generate planets using spheres with different materials and colors</li>
        <li>Add orbital motion using scene animation</li>
        <li>Create a starfield background using a skybox and dynamic texture</li>
        <li>Add Saturn's rings using a torus geometry</li>
      </ul>
    </div>

    <div class="challenge-demo">
      <h3>Reference Implementation:</h3>
      <SolarSystem />
    </div>

    <div class="implementation-hints">
      <h3>Implementation Hints:</h3>
      <div class="hints-grid">
        <div class="hint-card">
          <h4>Scene Setup</h4>
          <ul>
            <li>Use Scene.clearColor for the background</li>
            <li>Set camera.lowerRadiusLimit and upperRadiusLimit for proper zoom constraints</li>
            <li>Adjust light intensity for balanced illumination</li>
          </ul>
        </div>

        <div class="hint-card">
          <h4>Materials</h4>
          <ul>
            <li>Use StandardMaterial with emissiveColor for the sun</li>
            <li>Add a GlowLayer for the sun's corona effect</li>
            <li>Create unique materials for each planet</li>
          </ul>
        </div>

        <div class="hint-card">
          <h4>Animations</h4>
          <ul>
            <li>Store orbit parameters (distance, angle, speed) for each planet</li>
            <li>Use scene.onBeforeRenderObservable for continuous animation</li>
            <li>Calculate positions using Math.cos and Math.sin for circular orbits</li>
          </ul>
        </div>

        <div class="hint-card">
          <h4>Starfield Background</h4>
          <ul>
            <li>Create a large skybox with a dynamic texture</li>
            <li>Draw random white pixels for stars</li>
            <li>Use varying brightness for visual depth</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.challenge-container {
  padding: 20px;
}

.challenge-intro {
  margin-bottom: 30px;
}

.challenge-requirements {
  margin-bottom: 30px;
}

.challenge-requirements ul {
  list-style-type: circle;
  padding-left: 20px;
}

.hints-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.hint-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.hint-card h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
  border-bottom: 2px solid #86af49;
  padding-bottom: 5px;
}

.hint-card ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.hint-card li {
  margin: 8px 0;
  font-size: 0.9em;
  color: #495057;
}

.hint-card li::before {
  content: "→";
  margin-right: 8px;
  color: #86af49;
}

.challenge-demo {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .hints-grid {
    grid-template-columns: 1fr;
  }
}
</style>
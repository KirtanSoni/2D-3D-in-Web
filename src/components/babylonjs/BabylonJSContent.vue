<template>
  <div class="babylon-content">
    <h2>Babylon.js: Complete 3D Engine</h2>
    <BabylonToC />
    <section class="intro-section">
      <h2>Introduction</h2>
      <p>Babylon.js is a powerful, beautiful, simple, and open game and rendering engine packed into a friendly JavaScript framework.</p>
    </section>

    <div class="tutorials-list">
      <BabylonJSLA />
      
      <div class="tutorial-section" id="first-scene">
        <FirstScene />
      </div>

      <div class="tutorial-section" id="materials-textures">
        <MaterialsAndTextures />
      </div>

      <div class="tutorial-section" id="basic-animations">
        <BasicAnimations />
      </div>

      <div class="tutorial-section" id="interactive-features">
        <InteractiveFeatures />
      </div>
    </div>
    
    <section class="demo-section">
      <h2>Final Demo: Interactive Solar System</h2>
      <SolarSystem />
    </section>
  </div>
</template>

<script>
import BabylonJSLA from './BabylonJSLA.vue';
import BabylonToC from './BabylonToC.vue';
import FirstScene from './tutorials/FirstScene.vue';
import MaterialsAndTextures from './tutorials/MaterialsAndTextures.vue';
import BasicAnimations from './tutorials/BasicAnimations.vue';
import InteractiveFeatures from './tutorials/InteractiveFeatures.vue';
import SolarSystem from './SolarSystem.vue';

export default {
  name: 'BabylonJSContent',
  components: {
    BabylonJSLA,
    BabylonToC,
    FirstScene,
    MaterialsAndTextures,
    BasicAnimations,
    InteractiveFeatures,
    SolarSystem
  }
}
</script>

<style scoped>
.babylon-content {
  padding: 20px;
}

.intro-section {
  margin-bottom: 40px;
}

.tutorials-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;
}

.tutorial-section {
  width: 100%;
}

.demo-section {
  margin-top: 60px;
}

@media (max-width: 768px) {
  .babylon-content {
    padding: 10px;
  }
  
  .tutorials-list {
    gap: 30px;
  }
}
</style>
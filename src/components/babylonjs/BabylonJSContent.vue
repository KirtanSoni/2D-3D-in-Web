<template>
  <div class="babylon-content">
    <h1>Babylon.js: Complete 3D Engine</h1>

    <section>
      <BabylonToC /> 
    </section>

    <section class="intro-section">
      <BabylonLO />
    </section>

    <section class="intro-section">
      <BabylonIntroduction />
    </section>

    <div class="tutorials-list">
      <BabylonJSLA />
      
      <div class="tutorial-section" id="first-scene">
        <FirstScene />
      </div>

      <div class="tutorial-section" id="materials-textures">
        <MaterialsAndTextures />
      </div>

      <div class="tutorial-section" id="physics">
        <Physics />
      </div>

      <div class="tutorial-section" id="basic-animations">
        <BasicAnimations />
      </div>

      <div class="tutorial-section" id="interactive-features">
        <InteractiveFeatures />
      </div>

      <div class="tutorial-section" id="import-model">
        <ImportModel />
      </div>

      <div class="tutorial-section" id="particle-system">
        <ParticleSystem />
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
import BabylonIntroduction from './BabylonIntroduction.vue';
import FirstScene from './tutorials/FirstScene.vue';
import MaterialsAndTextures from './tutorials/MaterialsAndTextures.vue';
import BasicAnimations from './tutorials/BasicAnimations.vue';
import InteractiveFeatures from './tutorials/InteractiveFeatures.vue';
import SolarSystem from './demos/SolarSystem.vue';
import BabylonLO from './BabylonLO.vue';
import ImportModel from './tutorials/ImportModel.vue';
import Physics from './tutorials/Physics.vue';
import ParticleSystem from './tutorials/ParticleSystem.vue';

export default {
  name: 'BabylonJSContent',
  components: {
    BabylonJSLA,
    BabylonToC,
    BabylonIntroduction,
    FirstScene,
    MaterialsAndTextures,
    BasicAnimations,
    InteractiveFeatures,
    SolarSystem,
    BabylonLO,
    ImportModel,
    Physics,
    ParticleSystem
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
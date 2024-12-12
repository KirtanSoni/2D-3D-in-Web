<script>
import TutorialBase from './TutorialBase.vue';
import ParticleSystemCode from '../codes/ParticleSystemCode.vue';
import ParticleSystemDemo from '../demos/ParticleSystemDemo.vue';

export default {
  name: 'ParticleSystem',
  components: {
    TutorialBase
  },
  setup() {
    return {
      ParticleSystemCode,
      ParticleSystemDemo
    };
  }
}
</script>

<template>
  <TutorialBase
    title="Creating a Particle System"
    description="Learn how to create and customize a particle system in Babylon.js, perfect for creating effects like stars, fire, smoke, or other particle-based visual elements."
    :CodeComponent="ParticleSystemCode"
    :DemoComponent="ParticleSystemDemo"
  >
    <template #demo-info>
      <div class="interaction-info">
        <p>Click the toggle button to start/stop the particle system</p>
      </div>
    </template>
  </TutorialBase>
</template>
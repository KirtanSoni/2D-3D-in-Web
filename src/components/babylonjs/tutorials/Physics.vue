<script>
import TutorialBase from './TutorialBase.vue';
import PhysicsCode from '../codes/PhysicsCode.vue';
import PhysicsDemo from '../demos/PhysicsDemo.vue';

export default {
  name: 'Physics',
  components: {
    TutorialBase
  },
  setup() {
    return {
      PhysicsCode,
      PhysicsDemo
    };
  }
}
</script>

<template>
  <TutorialBase
    title="Physics with 3D Models"
    description="Learn how to add physics to imported 3D models using Babylon.js's physics engine."
    :CodeComponent="PhysicsCode"
    :DemoComponent="PhysicsDemo"
  >
    <template #demo-info>
      <div class="physics-info">
        <p>The demo shows:</p>
        <ul>
          <li>Physics-enabled ground plane</li>
          <li>Imported model with physics properties</li>
          <li>Gravity affecting the model</li>
          <li>Reset functionality to try multiple times</li>
        </ul>
      </div>
    </template>
  </TutorialBase>
</template>
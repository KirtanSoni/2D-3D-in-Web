<script>
import TutorialBase from './TutorialBase.vue';
import InteractiveFeaturesCode from '../codes/InteractiveFeaturesCode.vue';
import InteractiveFeaturesDemo from '../demos/InteractiveFeaturesDemo.vue';

export default {
  name: 'InteractiveFeatures',
  components: {
    TutorialBase
  },
  setup() {
    return {
      InteractiveFeaturesCode,
      InteractiveFeaturesDemo
    };
  }
}
</script>

<template>
  <TutorialBase
    title="Interactive Features"
    description="Learn how to add interactivity to your 3D objects using Babylon.js's Action Manager system."
    :CodeComponent="InteractiveFeaturesCode"
    :DemoComponent="InteractiveFeaturesDemo"
  >
    <template #demo-info>
      <div class="interaction-info">
        <p>Click on the boxes to see different interactions:</p>
        <ul>
          <li>Red box: Scales up when clicked</li>
          <li>Blue box: Rotates when clicked</li>
        </ul>
      </div>
    </template>
  </TutorialBase>
</template>
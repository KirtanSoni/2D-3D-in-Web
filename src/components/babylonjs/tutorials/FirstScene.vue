<template>
  <TutorialBase
    title="Creating Your First Scene"
    description="Start with creating a basic scene in Babylon.js. This includes setting up the essential components: a scene, camera, light, and a basic shape."
    :CodeComponent="FirstSceneCode"
    :DemoComponent="FirstSceneDemo"
  />
</template>

<script>
import TutorialBase from './TutorialBase.vue';
import FirstSceneCode from '../codes/FirstSceneCode.vue';
import FirstSceneDemo from '../demos/FirstSceneDemo.vue';

export default {
  name: 'FirstScene',
  components: {
    TutorialBase
  },
  setup() {
    return {
      FirstSceneCode,
      FirstSceneDemo
    };
  }
}
</script>
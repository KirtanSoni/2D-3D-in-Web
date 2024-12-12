<script>
import TutorialBase from './TutorialBase.vue';
import ImportModelCode from '../codes/ImportModelCode.vue';
import ImportModelDemo from '../demos/ImportModelDemo.vue';

export default {
  name: 'ImportModel',
  components: {
    TutorialBase
  },
  setup() {
    return {
      ImportModelCode,
      ImportModelDemo
    };
  }
}
</script>

<template>
  <TutorialBase
    title="Importing 3D Models"
    description="Learn how to import and manipulate external 3D models in Babylon.js using the SceneLoader. This example shows how to load a GLTF model and add basic interactivity."
    :CodeComponent="ImportModelCode"
    :DemoComponent="ImportModelDemo"
  >
    <template #demo-info>
      <div class="interaction-info">
        <p>Click on the duck model to rotate it!</p>
      </div>
    </template>
  </TutorialBase>
</template>
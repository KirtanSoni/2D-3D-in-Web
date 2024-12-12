<script>
import TutorialBase from './TutorialBase.vue';
import MaterialsTexturesCode from '../codes/MaterialsTexturesCode.vue';
import MaterialsTexturesDemo from '../demos/MaterialsTexturesDemo.vue';

export default {
  name: 'MaterialsAndTextures',
  components: {
    TutorialBase
  },
  setup() {
    return {
      MaterialsTexturesCode,
      MaterialsTexturesDemo
    };
  }
}
</script>

<template>
  <TutorialBase
    title="Working with Materials and Textures"
    description="Learn how to apply materials and textures to 3D objects using Babylon.js's PBR (Physically Based Rendering) system."
    :CodeComponent="MaterialsTexturesCode"
    :DemoComponent="MaterialsTexturesDemo"
  />
</template>

<script>
import TutorialBase from './TutorialBase.vue';
import BasicAnimationsCode from '../codes/BasicAnimationsCode.vue';
import BasicAnimationsDemo from '../demos/BasicAnimationsDemo.vue';

export default {
  name: 'BasicAnimations',
  components: {
    TutorialBase
  },
  setup() {
    return {
      BasicAnimationsCode,
      BasicAnimationsDemo
    };
  }
}
</script>

<template>
  <TutorialBase
    title="Basic Animations"
    description="Learn how to create and control animations in Babylon.js using the animation framework."
    :CodeComponent="BasicAnimationsCode"
    :DemoComponent="BasicAnimationsDemo"
  />
</template>
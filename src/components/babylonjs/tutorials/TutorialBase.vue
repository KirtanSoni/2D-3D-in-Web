<script>
import { ref } from 'vue';
import TutorialToggle from './TutorialToggle.vue';

export default {
  name: 'TutorialBase',
  components: {
    TutorialToggle
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    CodeComponent: {
      type: Object,
      required: true
    },
    DemoComponent: {
      type: Object,
      required: true
    }
  },
  setup() {
    const currentView = ref('demo');

    return {
      currentView
    };
  }
}
</script>
<template>
    <div class="tutorial-container">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
      
      <TutorialToggle v-model="currentView" />
      
      <div class="content-section">
        <component 
          :is="currentView === 'code' ? CodeComponent : DemoComponent" 
          v-show="true"
        />
      </div>
    </div>
  </template>
  
  <style scoped>
  .tutorial-container {
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .content-section {
    margin-top: 20px;
  }
</style>
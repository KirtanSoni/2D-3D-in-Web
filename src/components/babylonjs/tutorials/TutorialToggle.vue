<script>
import { ref } from 'vue';

export default {
  name: 'TutorialToggle',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const toggleView = (view) => {
      emit('update:modelValue', view);
    };

    return {
      toggleView
    };
  }
}
</script>
<template>
    <div class="toggle-container">
      <button 
        class="toggle-btn" 
        :class="{ active: modelValue === 'code' }"
        @click="toggleView('code')"
      >
        Code
      </button>
      <button 
        class="toggle-btn" 
        :class="{ active: modelValue === 'demo' }"
        @click="toggleView('demo')"
      >
        Demo
      </button>
    </div>
</template>
  
<style scoped>
  .toggle-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .toggle-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .toggle-btn.active {
    background: #86af49;
    color: white;
  }
</style>
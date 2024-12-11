<script>
import { marked } from 'marked'
import intro from './content/3DIntro.md?raw'
import act1 from './content/3DAct1.md?raw'
import act2 from './content/3DAct2.md?raw'
import act3 from './content/3DAct3.md?raw'
import Orthographic from './demos/Orthographic.vue'
import Perspective from './demos/Perspective.vue'
import Camera from './demos/Camera.vue'

export default {
  name: 'WebGL3DBasics',
  components: {
    Orthographic,
    Perspective, 
    Camera
  },
  data() {
    return {
      intro: '',
      act1: '',
      act2: '',
      act3: '',
      currentTab: 'orthographic',
      tabs: [
        { id: 'orthographic', title: 'Orthographic Projection' },
        { id: 'perspective', title: 'Perspective Projection' },
        { id: 'camera', title: 'Camera Controls' }
      ]
    }
  },
  created() {
    this.intro = marked(intro)
    this.act1 = marked(act1)
    this.act2 = marked(act2)
    this.act3 = marked(act3)
  }
}
</script>
<template>
    <div class="container" id="3d-rendering">
      <div v-html="intro"></div>
      <h3>Activity 3: 3D Rendering</h3>
      <div class="activities-container">
        <div class="tab-buttons">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="{ active: currentTab === tab.id }"
          >
            {{ tab.title }}
          </button>
        </div>
  
        <div class="tab-content">
          <div v-show="currentTab === 'orthographic'">
            <div v-html="act1"></div>
            <Orthographic />
          </div>
          <div v-show="currentTab === 'perspective'">
            <div v-html="act2"></div>
            <Perspective />
          </div>
          <div v-show="currentTab === 'camera'">
            <div v-html="act3"></div>
            <Camera />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .container{
    margin-top: 5em;
  }
  .activities-container {
    margin-top: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  
  .tab-buttons {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .tab-buttons button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: #e2e8f0;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .tab-buttons button.active {
    background: #3b82f6;
    color: white;
  }
  
  .tab-content {
    padding: 2rem;
  }
  
  :deep(p) {
    font-size: 16px;
    line-height: 2;
    color: #2d3748;
  }
  
  :deep(h2), :deep(h3) {
    color: #1a202c;
    margin: 1.5rem 0 1rem;
  }
  </style>
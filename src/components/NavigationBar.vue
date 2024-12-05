<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'NavigationBar',
  setup() {
    const activeTab = ref('webgl');
    const isScrolled = ref(false);
    const hideHeader = ref(false);
    let lastScrollY = 0;
    
    onMounted(() => {
      window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 0;
        hideHeader.value = window.scrollY > 50; // Hide header after scrolling 50px
        lastScrollY = window.scrollY;
      });
    });

    const tabs = [
      { 
        id: 'webgl', 
        label: 'WebGL', 
        description: 'Low-level 3D graphics API'
      },
      { 
        id: 'threejs', 
        label: 'Three.js', 
        description: 'High-level 3D graphics library'
      },
      { 
        id: 'babylonjs', 
        label: 'Babylon.js', 
        description: 'Complete 3D engine'
      },
      {
        id: 'analysis',
        label: 'Analysis & Insights',
        description: 'Comparative Analysis & Future Trends'
      }
    ];

    const selectTab = (tabId) => {
      activeTab.value = tabId;
    };

    return {
      activeTab,
      tabs,
      selectTab,
      isScrolled,
      hideHeader
    };
  }
}
</script>

<template>
  <nav class="navigation" :class="{ 'is-scrolled': isScrolled }">
    <div class="nav-header" :class="{ 'header-hidden': hideHeader }">
      <h1 class="nav-title">3D Dev Hub</h1>
    </div>
    
    <div class="nav-container">
      <div class="nav-tabs">
        <div 
          v-for="tab in tabs" 
          :key="tab.id"
          class="nav-tab"
          :class="{ 
            active: activeTab === tab.id,
            'analysis-tab': tab.id === 'analysis'
          }"
          @click="selectTab(tab.id)"
        >
          <h3>{{ tab.label }}</h3>
          <p>{{ tab.description }}</p>
        </div>
      </div>
    </div>
  </nav>
  <div class="nav-spacer" :class="{ 'header-hidden': hideHeader }"></div>
</template>

<style scoped>
.navigation {
  width: 100%;
  background: white;
  box-shadow: 0 2px 8px rgba(134, 175, 73, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-header {
  padding: 0.5rem 2rem;
  background: #86af49;
  transition: all 0.3s ease;
  max-height: 50px;
  overflow: hidden;
}

.nav-header.header-hidden {
  max-height: 0;
  padding: 0 2rem;
}

.nav-title {
  font-size: 1.2rem;
  color: white;
  margin: 0;
}

.nav-spacer {
  height: 120px;
  transition: height 0.3s ease;
}

.nav-spacer.header-hidden {
  height: 70px;
}

.nav-container {
  border-bottom: 2px solid #86af49;
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  overflow-x: auto;
  background: #d5e1df;
}

.nav-tab {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  border: 2px solid transparent;
}

.nav-tab h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: #2c3e50;
}

.nav-tab p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

.nav-tab:hover {
  border-color: #86af49;
  transform: translateY(-2px);
}

.nav-tab.active {
  background: #b5e7a0;
  border-color: #86af49;
}

.nav-tab.analysis-tab {
  background: #e3eaa7;
}

.nav-tab.analysis-tab:hover {
  background: #b5e7a0;
}

.nav-tab.analysis-tab.active {
  background: #86af49;
  color: white;
}

.nav-tab.active h3,
.nav-tab.active p {
  color: #2c3e50;
}

.nav-tab.analysis-tab.active h3,
.nav-tab.analysis-tab.active p {
  color: white;
}

@media (max-width: 768px) {
  .nav-tabs {
    flex-direction: column;
    padding: 0.5rem;
  }

  .nav-tab {
    width: 100%;
  }

  .nav-spacer {
    height: 220px;
  }

  .nav-spacer.header-hidden {
    height: 170px;
  }
}
</style>
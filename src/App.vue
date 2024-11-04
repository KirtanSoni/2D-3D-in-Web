<script>
  import Home from './components/Home.vue'
  export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<template class="app">
  <Home />
</template>

<style scoped>
  .app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  }

  section {
    margin: 2rem 0;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  html {
    scroll-behavior: smooth;
  }
</style>

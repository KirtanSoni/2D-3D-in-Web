<script>
import WebGLHome from './WebGL/WebGLHome.vue'

  export default {
    name: 'Home',
    components: {
      WebGLHome
    },
    data() {
      return {
        title: '2D/3D Rendering in the web'
      }
    }
  }
</script>
<template>
    <div class="home">
      <h1>{{ title }}</h1>
      <WebGLHome />
    </div>
</template>
  

  
<style scoped>
  .home {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: #2980b9;
  }
  </style>
  
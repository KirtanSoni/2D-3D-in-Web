<script>
import WebGLHome from './WebGLHome.vue'

export default {
  name: 'WebGLContent',
  components: {
    WebGLHome
  },
  data() {
    return {
      title: 'WebGL'
    }
  }
}
</script>

<template>
  <div class="webgl-content">
    <h1>{{ title }}</h1>
    <WebGLHome />
  </div>
</template>

<style scoped>
.webgl-content {
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
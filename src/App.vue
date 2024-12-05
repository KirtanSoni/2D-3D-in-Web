<script>
import Home from './components/Home.vue';
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
    Home
  }
}
</script>

<template>
  <div class="app">
    <NavigationBar />
    <main class="main-content">
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
    <footer class="footer">
      <p>3D Dev Hub (SER598)</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #00aeff;
  --text-color: #2c3e50;
  --background-color: #f8f9fa;
  --border-color: #eaeaea;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.footer {
  text-align: center;
  padding: 1rem;
  background: white;
  border-top: 1px solid var(--border-color);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}

code {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.section:last-child {
  border-bottom: none;
}
</style>
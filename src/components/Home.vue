<script>
  import TableofContents from './TableofContents.vue';
  import LearningOutcomes from './LearningOutcomes.vue'
  import LearningActivities from './LearningActivities.vue'
  import Summary from './Summary.vue'
  import Analysis from './Analysis.vue'
  import References from './References.vue'
  import Resources from './Resources.vue'

  export default {
    name: 'Home',
    components: {
      TableofContents,
      LearningOutcomes,
      LearningActivities,
      Summary,
      Analysis,
      References,
      Resources
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
      <TableofContents />
      <LearningOutcomes />
      <LearningActivities />
      <Summary />
      <Analysis />
      <References />
      <Resources />
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
  
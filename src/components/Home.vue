<script>
  import LearningActivities from './LearningActivities.vue';
import LearningOutcomes from './LearningOutcomes.vue';
import References from './References.vue';
import Resources from './Resources.vue';
import Summary from './Summary.vue';
import TableofContents from './TableofContents.vue';

  export default {
    name: 'Home',
    components: {
      TableofContents,
      LearningOutcomes,
      LearningActivities,
      Summary,
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
  
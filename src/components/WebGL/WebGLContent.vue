<script>
import LearningActivities from '../LearningActivities.vue'
import LearningOutcomes from '../LearningOutcomes.vue'
import References from '../References.vue'
import Resources from '../Resources.vue'
import Summary from '../Summary.vue'
import TableofContents from '../TableofContents.vue'

export default {
  name: 'WebGLContent',
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
  <div class="webgl-content">
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
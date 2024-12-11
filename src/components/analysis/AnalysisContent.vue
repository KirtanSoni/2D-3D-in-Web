<script>
  import Comparison from './Comparison.vue';
  import { marked } from 'marked';
  import analysis from './content/comparison.md?raw'
  export default {
    name: 'AnalysisContent',
    components: {
      Comparison
    },
    data() {
      return {
        analysis: ''
      }
    },
    created() {
      this.analysis = marked(analysis)
    }
  }
</script>

<template>
  <div>
    <h2>Analysis & Insights</h2>
    <section>
      <div v-html="analysis"></div>
      <Comparison />
    </section>
  </div>
</template>

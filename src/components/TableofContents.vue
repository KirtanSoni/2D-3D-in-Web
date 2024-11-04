<script>
  export default {
    name: 'TableOfContents'
  }
</script>

<template>
    <section class="toc">
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#learning-outcomes">Learning Outcomes</a></li>
        <li><a href="#learning-activities">Learning Activities</a></li>
        <li><a href="#summary">Summary</a></li>
        <li><a href="#analysis">Analysis</a></li>
        <li><a href="#references">References</a></li>
        <li><a href="#resources">Resources</a></li>
      </ul>
    </section>
</template>

  
<style scoped>

  .toc {
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  }

  .toc h2 {
    margin-top: 0;
  }

  .toc li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    transition: background-color 0.2s;
  }

  .toc a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.2s;
  }
  .toc a:hover {
    font-weight: bold;
    text-decoration: underline;
  }

</style>
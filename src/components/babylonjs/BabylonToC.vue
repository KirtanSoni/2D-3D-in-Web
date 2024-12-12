<script>
export default {
  name: 'BabylonToC'
}
</script>
<template>
  <section class="toc">
    <h2 class="toc-title">Table of Contents</h2>
    <ul class="toc-list">
      <li class="toc-item">
        <a href="#learning-outcomes">Learning Outcomes</a>
      </li>
      <li class="toc-item">
        <a href="#intro">Introduction</a>
      </li>
      <li class="toc-item">
        <a href="#learning-activities">Learning Activities</a>
        <ul class="nested-list">
          <li class="nested-item">
            <a href="#first-scene">Creating your First Scene</a>
          </li>
          <li class="nested-item">
            <a href="#materials-textures">Working with Materials and Textures</a>
          </li>
          <li class="nested-item">
            <a href="#basic-animations">Basic Animations</a>
          </li>
          <li class="nested-item">
            <a href="#interactive-features">Interactive Features</a>
          </li>
        </ul>
      </li>
      <li class="toc-item">
        <a href="#summary">Summary</a>
      </li>
      <li class="toc-item">
        <a href="#references">References</a>
      </li>
      <li class="toc-item">
        <a href="#resources">Resources</a>
      </li>
    </ul>
  </section>
</template>
<style scoped>
.toc {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;
  border: 1px solid #eef2f7;
}

.toc-title {
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  position: relative;
  font-weight: 600;
}

.toc-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #86af49;
  border-radius: 2px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0.5rem 0;
}

.toc-item a {
  color: #4a5568;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  display: block;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 1.5rem;
}

.toc-item a::before {
  content: '›';
  position: absolute;
  left: 0.5rem;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.2s ease;
}

.toc-item a:hover {
  background: #f7fafc;
  color: #86af49;
  transform: translateX(5px);
}

.toc-item a:hover::before {
  opacity: 1;
  transform: translateX(0);
}

.nested-list {
  list-style: none;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  border-left: 2px solid #edf2f7;
}

.nested-item {
  margin: 0.25rem 0;
}

.nested-item a {
  font-size: 1rem;
  color: #718096;
  padding: 0.4rem 1rem;
}

.nested-item a:hover {
  color: #86af49;
  background: #f7fafc;
}

.toc-item a.active,
.nested-item a.active {
  color: #86af49;
  background: #f0f9ff;
}

@media (max-width: 768px) {
  .toc {
    padding: 1.5rem;
  }

  .toc-title {
    font-size: 1.5rem;
  }

  .toc-item a {
    font-size: 1rem;
  }

  .nested-item a {
    font-size: 0.9rem;
  }
}

@media print {
  .toc {
    box-shadow: none;
    border: 1px solid #eee;
  }

  .toc-item a,
  .nested-item a {
    color: #000;
  }

  .toc-item a::before {
    display: none;
  }
}
</style>
<script>
export default {
    name: "BabylonLO"
}
</script>

<template>
    <section class="learning-outcomes" id="learning-outcomes">
      <h2 class="title">Learning Outcomes</h2>
      <p class="intro">After completing this tutorial, the reader will be able to:</p>
      <ul class="outcomes-list">
        <li class="outcome-item">
          <span class="outcome-text">Create and Set Up Basic 3D Scenes in Babylon.js</span>
        </li>
        <li class="outcome-item">
          <span class="outcome-text">Apply Materials and Textures to 3D Objects</span>
        </li>
        <li class="outcome-item">
          <span class="outcome-text">Implement Basic Animations and Transformations</span>
        </li>
        <li class="outcome-item">
          <span class="outcome-text">Add Interactive Features to 3D Objects</span>
        </li>
        <!-- <li class="outcome-item">
          <span class="outcome-text">Build a Complete Interactive Solar System Demo</span>
        </li> -->
      </ul>
    </section>
</template>

<style scoped>
.learning-outcomes {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;
  border: 1px solid #eef2f7;
}

.title {
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.75rem;
}

.title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #86af49;
  border-radius: 2px;
}

.intro {
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.outcomes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.outcome-item {
  padding: 1rem 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #86af49;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.outcome-item:hover {
  transform: translateX(8px);
  background: #edf2f7;
}

.outcome-text {
  color: #2d3748;
  font-size: 1.1rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .learning-outcomes {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .intro {
    font-size: 1rem;
  }

  .outcome-text {
    font-size: 1rem;
  }

  .outcome-item {
    padding: 0.75rem 1rem;
  }
}
</style>
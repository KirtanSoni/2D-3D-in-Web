<script>
export default {
  name: 'BabylonIntroduction',
  data() {
    return {
      sections: [
        {
          id: 'babylon-evolution',
          title: 'Evolution of Babylon.js',
          content: [
            {
              type: 'text',
              body: 'Babylon.js started as an internal Microsoft project and has evolved into one of the most powerful open-source 3D engines for the web. Its journey represents the evolution of 3D web graphics from basic rendering to complex, real-time experiences.'
            },
            {
              type: 'text',
              body: 'The framework has grown from a simple 3D engine into a complete development platform, supporting everything from basic 3D scenes to complex applications, games, and even augmented and virtual reality experiences.'
            },
            {
              type: 'timeline',
              events: [
                { year: '2013', event: 'Initial Release - Basic 3D engine' },
                { year: '2016', event: 'WebGL 2.0 Support & PBR Materials' },
                { year: '2018', event: 'Node Material Editor & Visual Scripting' },
                { year: '2020', event: 'WebXR Support & Native Platform Rendering' }
              ]
            }
          ]
        },
        {
          id: 'babylon-explanation',
          title: 'Understanding Babylon.js',
          content: [
            {
              type: 'text',
              body: 'Babylon.js is a complete JavaScript framework for building 3D applications. It provides a high-level API that abstracts complex WebGL operations into intuitive, easy-to-use functions and classes.'
            },
            {
              type: 'subsection',
              title: 'Engine Architecture',
              body: 'The Babylon.js engine handles scene management, rendering pipeline, physics integration, and asset loading through a modular architecture that developers can easily extend.'
            },
            {
              type: 'pipeline',
              stages: [
                {
                  name: 'Scene Setup',
                  description: 'Create and configure the 3D environment',
                  code: 'const scene = new BABYLON.Scene(engine);\nconst camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene);'
                },
                {
                  name: 'Asset Creation',
                  description: 'Add meshes, materials, and lights',
                  code: 'const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);\nconst material = new BABYLON.StandardMaterial("mat", scene);'
                },
                {
                  name: 'Render Loop',
                  description: 'Continuous rendering and updates',
                  code: 'engine.runRenderLoop(() => {\n    scene.render();\n});'
                }
              ]
            }
          ]
        },
        {
          id: 'dom-integration',
          title: 'Canvas Integration',
          content: [
            {
              type: 'text',
              body: 'Babylon.js seamlessly integrates with HTML5 Canvas elements, providing powerful 3D capabilities while maintaining compatibility with standard web development practices.'
            },
            {
              type: 'code',
              language: 'html',
              code: '<canvas id="babylonCanvas"></canvas>'
            },
            {
              type: 'code',
              language: 'javascript',
              code: 'const canvas = document.getElementById("babylonCanvas");\nconst engine = new BABYLON.Engine(canvas, true);\nconst scene = new BABYLON.Scene(engine);'
            }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <div class="babylon-intro">
    <h1 id="intro">Introduction to Babylon.js</h1>
    
    <div v-for="section in sections" 
         :key="section.id" 
         class="section">
      <div class="section-header">
        <h3>{{ section.title }}</h3>
      </div>
      
      <div class="section-content">
        <template v-for="(item, index) in section.content" :key="index">
          <p v-if="item.type === 'text'" class="text">
            {{ item.body }}
          </p>
          
          <div v-else-if="item.type === 'timeline'" class="timeline">
            <div v-for="event in item.events" 
                 :key="event.year" 
                 class="timeline-event">
              <span class="year">{{ event.year }}</span>
              <span class="event">{{ event.event }}</span>
            </div>
          </div>
          
          <div v-else-if="item.type === 'pipeline'" class="pipeline">
            <div v-for="stage in item.stages" 
                 :key="stage.name" 
                 class="stage">
              <h4>{{ stage.name }}</h4>
              <p>{{ stage.description }}</p>
              <pre><code>{{ stage.code }}</code></pre>
            </div>
          </div>
          
          <div v-else-if="item.type === 'subsection'" class="subsection">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
          
          <div v-else-if="item.type === 'code'" class="code-block">
            <div class="code-header">{{ item.language }}</div>
            <pre><code>{{ item.code }}</code></pre>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.webgl-intro {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  color: #2d3748;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
}

.section-content {
  padding: 1.5rem;
}

.text {
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.timeline {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
}

.timeline-event {
  text-align: center;
}

.year {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.event {
  font-size: 0.875rem;
  color: #4a5568;
}

.pipeline {
  gap: 1rem;
  margin: 2rem 0;
  overflow-x: hidden;
}

.stage {
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  min-width: 0;
}

.stage h3 {
  color: #2d3748;
  margin: 0 0 1rem 0;
}

.stage p {
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.code-block {
  margin: 1rem 0;
  background: #1a202c;
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  padding: 0.75rem 1rem;
  background: #2d3748;
  color: #e2e8f0;
  font-size: 0.875rem;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  display: block;
  width: 100%;
}

@media (max-width: 1024px) {
  .pipeline {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .timeline-event {
    margin-bottom: 1rem;
  }
}
</style>
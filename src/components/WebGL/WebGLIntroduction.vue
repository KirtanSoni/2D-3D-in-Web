<script>
export default {
  name: 'WebGLIntroduction',
  data() {
    return {
      sections: [
        {
          id: 'web-rendering',
          title: 'Evolution of Web Rendering',
          content: [
            {
              type: 'text',
              body: 'As internet usage proliferated globally, the demand for rich visual content on the web grew exponentially. What started as a simple document-sharing platform evolved into an interactive content delivery system, requiring more sophisticated rendering capabilities.'
            },
            {
              type: 'text',
              body: 'This evolution transformed the web from a document-serving platform into a dynamic content platform, capable of delivering complex visual experiences directly in the browser.'
            },
            {
              type: 'timeline',
              events: [
                { year: '1991', event: 'HTML - Static documents' },
                { year: '1996', event: 'CSS - Styled content' },
                { year: '2004', event: 'Canvas 2D - Basic graphics' },
                { year: '2011', event: 'WebGL - Hardware-accelerated 3D graphics' }
              ]
            }
          ]
        },
        {
          id: 'webgl-explanation',
          title: 'Understanding WebGL',
          content: [
            {
              type: 'text',
              body: 'WebGL is a low-level JavaScript API based on OpenGL ES, providing direct access to GPU functionality through the web browser.'
            },
            {
              type: 'subsection',
              title: 'OpenGL',
              body: 'OpenGL (Open Graphics Library) is a cross-platform graphics API that provides direct access to GPU functions for rendering 2D and 3D graphics.'
            },
            {
              type: 'pipeline',
              stages: [
                {
                  name: 'JavaScript',
                  description: 'Sets up data and sends commands to GPU',
                  code: 'const vertices = new Float32Array([-1, -1, 1, -1, 0, 1])'
                },
                {
                  name: 'Vertex Shader',
                  description: 'Processes each vertex position and attributes',
                  code: 'gl_Position = vec4(position, 0.0, 1.0)'
                },
                {
                  name: 'Fragment Shader',
                  description: 'Determines final pixel colors',
                  code: 'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0)'
                }
              ]
            }
          ]
        },
        {
          id: 'dom-integration',
          title: 'DOM Integration',
          content: [
            {
              type: 'text',
              body: 'WebGL renders through the HTML5 Canvas element, creating a context that serves as the bridge between JavaScript and GPU operations.'
            },
            {
              type: 'code',
              language: 'html',
              code: '<canvas id="webgl-canvas"></canvas>'
            },
            {
              type: 'code',
              language: 'javascript',
              code: 'const canvas = document.querySelector("#webgl-canvas")\nconst gl = canvas.getContext("webgl")'
            }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <div class="webgl-intro">
    <h1>Introduction to WebGL</h1>
    
    <div v-for="section in sections" 
         :key="section.id" 
         class="section">
      <div class="section-header">
        <h2>{{ section.title }}</h2>
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
              <h3>{{ stage.name }}</h3>
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
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
  color: #e2e8f0;
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
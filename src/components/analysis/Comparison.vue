<script>
  export default {
    name: 'Comparison',
    data() {
      return {
        technologies: [
          {
            name: "WebGL",
            pros: [
              {
                point: "Direct GPU access for maximum performance",
                evidence: "No abstraction overhead, direct hardware communication"
              },
              {
                point: "Complete control over rendering pipeline",
                evidence: "Custom shaders and memory management possible"
              },
              {
                point: "Smallest possible bundle size",
                evidence: "Only ~40KB for core WebGL context"
              }
            ],
            cons: [
              {
                point: "Very steep learning curve",
                evidence: "Requires understanding of GLSL and graphics pipeline"
              },
              {
                point: "Verbose boilerplate code needed",
                evidence: "50-60 lines minimum for basic triangle rendering"
              },
              {
                point: "Complex setup for basic operations",
                evidence: "Requires manual shader compilation, buffer creation, and attribute binding"
              }
            ]
          },
          {
            name: "Three.js",
            pros: [
              {
                point: "Intuitive scene graph architecture",
                evidence: "Scene setup in ~10 lines vs 50+ in WebGL"
              },
              {
                point: "Built-in geometries and materials",
                evidence: "100+ pre-built components available"
              },
              {
                point: "Active ecosystem",
                evidence: "190K+ GitHub stars, 2K+ contributors"
              }
            ],
            cons: [
              {
                point: "Moderate bundle size",
                evidence: "587KB minified, 149KB gzipped (v162)"
              },
              {
                point: "Performance overhead vs WebGL",
                evidence: "Additional abstraction layer adds ~5-10% overhead"
              },
              {
                point: "Limited game engine features",
                evidence: "No built-in physics engine or advanced audio"
              }
            ]
          },
          {
            name: "Babylon.js",
            pros: [
              {
                point: "Complete game engine functionality",
                evidence: "Includes physics, audio, and particle systems"
              },
              {
                point: "Advanced developer tools",
                evidence: "Built-in debug layer and scene explorer"
              },
              {
                point: "Comprehensive asset handling",
                evidence: "Supports 20+ 3D file formats natively"
              }
            ],
            cons: [
              {
                point: "Larger bundle size",
                evidence: "2.5MB uncompressed, 427KB gzipped (core only)"
              },
              {
                point: "Additional size with features",
                evidence: "+1.2MB for Havok physics engine"
              },
              {
                point: "Higher performance overhead",
                evidence: "Full engine features add 15-20% overhead vs raw WebGL"
              }
            ]
          }
        ]
      }
    }
  }
  </script>
  

<template>
    <div class="comparison-container">
      <div class="cards-grid">
        <div v-for="tech in technologies" :key="tech.name" class="card">
          <h2 class="card-title">{{ tech.name }}</h2>
          
          <div class="card-content">
            <div class="pros-section">
              <h3 class="section-title pros">Pros</h3>
              <ul class="benefits-list">
                <li v-for="(pro, index) in tech.pros" :key="index" class="benefit-item">
                  <span class="check">✓</span>
                  <div class="benefit-content">
                    <span>{{ pro.point }}</span>
                    <span v-if="pro.evidence" class="evidence">{{ pro.evidence }}</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="cons-section">
              <h3 class="section-title cons">Cons</h3>
              <ul class="benefits-list">
                <li v-for="(con, index) in tech.cons" :key="index" class="benefit-item">
                  <span class="cross">✗</span>
                  <div class="benefit-content">
                    <span>{{ con.point }}</span>
                    <span v-if="con.evidence" class="evidence">{{ con.evidence }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .comparison-container {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    .cards-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    color: #2d3748;
  }
  
  .card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .section-title.pros {
    color: #48bb78;
  }
  
  .section-title.cons {
    color: #f56565;
  }
  
  .benefits-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .benefit-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .check {
    color: #48bb78;
    font-weight: bold;
  }
  
  .cross {
    color: #f56565;
    font-weight: bold;
  }
  
  .evidence {
    font-size: 0.875rem;
    color: #718096;
    font-style: italic;
  }
  </style>
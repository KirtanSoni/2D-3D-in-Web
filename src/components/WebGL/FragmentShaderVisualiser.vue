<script>
export default {
  name: 'FragmentShaderVisualiser',
  data() {
    return {
      currentStep: 0,
      animationProgress: 0,
      animationDuration: 1000,
      shaderCode: [
        'precision mediump float',
        'uniform vec4 uColor',
        '',
        'void main() {',
        '    gl_FragColor = uColor',
        '}'
      ],
      steps: [
        {
          id: 'precision',
          title: 'Precision Setting',
          lines: [1],
          explanation: 'Set floating-point precision for color calculations. Medium precision balances performance and accuracy',
          animation: { state: 'precision' }
        },
        {
          id: 'color-input',
          title: 'Color Input',
          lines: [2],
          explanation: 'Receive color as a 4D vector (RGBA) uniform. This allows dynamic color changes from JavaScript',
          animation: { state: 'color-input' }
        },
        {
          id: 'color-output',
          title: 'Color Output',
          lines: [5],
          explanation: 'Set the final color of each pixel (fragment). Values range from 0 to 1 for each RGBA component',
          animation: { state: 'color-output' }
        }
      ],
      animationFrame: null,
      currentColor: [0.2, 0.6, 1.0, 1.0]
    }
  },
  
  methods: {
    mounted() {
        this.startAnimation()
    },
    drawStep(ctx) {
      const step = this.steps[this.currentStep]
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
      switch(step.animation.state) {
        case 'precision':
          this.drawPrecisionVisualization(ctx)
          break
        case 'color-input':
          this.drawColorInput(ctx)
          break
        case 'color-output':
          this.drawColorOutput(ctx)
          break
      }
    },
    nextStep() {
        this.currentStep = (this.currentStep + 1) % this.steps.length
        this.startAnimation()
    },

    prevStep() {
        this.currentStep = (this.currentStep - 1 + this.steps.length) % this.steps.length
        this.startAnimation()
    },

    drawPrecisionVisualization(ctx) {
      ctx.save()
      ctx.translate(150, 150)
      
      // Draw gradient to show precision differences
      const gradientSize = 200
      const gradientSteps = Math.floor(16 * this.animationProgress)
      
      // Draw low precision blocks
      ctx.fillStyle = '#4a5568'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('Medium Precision Color Steps', 0, -80)
      
      for (let i = 0; i < gradientSteps; i++) {
        const ratio = i / (gradientSteps - 1)
        ctx.fillStyle = `rgba(66, 153, 225, ${ratio})`
        ctx.fillRect(
          -gradientSize/2 + (gradientSize * i/gradientSteps),
          -50,
          gradientSize/gradientSteps,
          40
        )
      }
      
      ctx.restore()
    },

    drawColorInput(ctx) {
      ctx.save()
      ctx.translate(150, 150)
      
      // Draw RGBA color channels
      const channels = ['R', 'G', 'B', 'A']
      const values = this.currentColor
      
      channels.forEach((channel, i) => {
        const y = -60 + i * 40
        
        // Draw channel label
        ctx.fillStyle = '#2d3748'
        ctx.font = '14px monospace'
        ctx.textAlign = 'right'
        ctx.fillText(`${channel}:`, -70, y + 15)
        
        // Draw value bar
        const barWidth = 150 * this.animationProgress
        const value = values[i]
        
        ctx.fillStyle = `rgba(66, 153, 225, 0.2)`
        ctx.fillRect(-60, y, 150, 20)
        
        ctx.fillStyle = `rgba(66, 153, 225, 1)`
        ctx.fillRect(-60, y, barWidth * value, 20)
        
        // Draw value text
        ctx.fillStyle = '#2d3748'
        ctx.textAlign = 'left'
        ctx.fillText(value.toFixed(2), 100, y + 15)
      })
      
      ctx.restore()
    },

    drawColorOutput(ctx) {
      ctx.save()
      ctx.translate(150, 150)
      
      // Draw pixel grid
      const gridSize = 5
      const pixelSize = 20
      const startX = -gridSize * pixelSize / 2
      const startY = -gridSize * pixelSize / 2
      
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const progress = Math.min(1, 
            this.animationProgress * 2 - (x + y) / (gridSize * 2)
          )
          
          if (progress > 0) {
            ctx.fillStyle = `rgba(
              ${this.currentColor[0] * 255},
              ${this.currentColor[1] * 255},
              ${this.currentColor[2] * 255},
              ${this.currentColor[3] * progress}
            )`
            
            ctx.fillRect(
              startX + x * pixelSize,
              startY + y * pixelSize,
              pixelSize - 1,
              pixelSize - 1
            )
          }
        }
      }
      
      // Draw color components
      if (this.animationProgress > 0.5) {
        ctx.fillStyle = '#2d3748'
        ctx.font = '12px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(
          `gl_FragColor: (${this.currentColor.map(v => v.toFixed(2)).join(', ')})`,
          0,
          80
        )
      }
      
      ctx.restore()
    },

    startAnimation() {
      this.animationProgress = 0
      const startTime = performance.now()
      
      const animate = (currentTime) => {
        this.animationProgress = Math.min((currentTime - startTime) / this.animationDuration, 1)
        this.drawStep(this.$refs.animationCanvas.getContext('2d'))
        
        if (this.animationProgress < 1) {
          this.animationFrame = requestAnimationFrame(animate)
        }
      }
      
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
      }
      this.animationFrame = requestAnimationFrame(animate)
    }
  }
  
}

</script>
<template>
    <div class="shader-visualizer">
      <!-- Left side: Code with current step highlight -->
      <div class="code-panel">
        <div class="code-header">
          <h3>Fragment Shader</h3>
        </div>
        <div class="code-content">
          <div class="line-numbers">
            <div v-for="i in 6" :key="i" class="line-number">{{ i }}</div>
          </div>
          <div class="code-lines">
            <div 
              v-for="(line, index) in shaderCode" 
              :key="index"
              class="code-line"
              :class="{ 
                'highlighted': steps[currentStep].lines.includes(index + 1)
              }"
            >{{ line }}</div>
          </div>
        </div>
      </div>
  
      <!-- Right side: Explanation and animation -->
      <div class="explanation-panel">
        <div class="step-navigation">
          <button 
            @click="prevStep" 
            :disabled="currentStep === 0"
            class="nav-button"
          >
            Previous
          </button>
          <span class="step-counter">Step {{ currentStep + 1 }} of {{ steps.length }}</span>
          <button 
            @click="nextStep" 
            :disabled="currentStep === steps.length - 1"
            class="nav-button"
          >
            Next
          </button>
        </div>
  
        <div class="current-step">
          <h4>{{ steps[currentStep].title }}</h4>
          <p>{{ steps[currentStep].explanation }}</p>
        </div>
  
        <div class="animation-container">
          <canvas ref="animationCanvas" width="300" height="300"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .shader-visualizer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .code-panel {
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code-header {
    background: #2d2d2d;
    padding: 1rem;
  }
  
  .code-header h3 {
    color: white;
    margin: 0;
    font-size: 1.2rem;
  }
  
  .code-content {
    display: flex;
    padding: 1rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .line-numbers {
    padding-right: 1rem;
    margin-right: 1rem;
    border-right: 1px solid #3d3d3d;
    color: #6b6b6b;
    user-select: none;
    text-align: right;
  }
  
  .code-line {
    color: #d4d4d4;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    white-space: pre;
  }
  
  .code-line.highlighted {
    background: rgba(86, 156, 214, 0.2);
  }
  
  .explanation-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .step-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .nav-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    background: #4299e1;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }
  
  .nav-button:hover:not(:disabled) {
    background: #3182ce;
    transform: translateY(-1px);
  }
  
  .nav-button:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
  
  .step-counter {
    font-size: 0.9rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .current-step {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #4299e1;
  }
  
  .current-step h4 {
    margin: 0 0 0.5rem 0;
    color: #2d3748;
    font-size: 1.1rem;
  }
  
  .current-step p {
    margin: 0;
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95rem;
  }
  
  .animation-container {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }
  
  canvas {
    width: 100%;
    height: auto;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
  }
  
  @media (max-width: 1024px) {
    .shader-visualizer {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 1rem;
    }
    
    .code-panel {
      max-height: 300px;
      overflow-y: auto;
    }
  }
  
  /* Syntax highlighting */
  .code-line :deep(.keyword) { color: #569cd6 }
  .code-line :deep(.type) { color: #4ec9b0 }
  .code-line :deep(.function) { color: #dcdcaa }
  .code-line :deep(.variable) { color: #9cdcfe }
  .code-line :deep(.number) { color: #b5cea8 }
  </style>
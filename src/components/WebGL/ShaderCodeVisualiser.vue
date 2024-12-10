
<script>
import FragmentShaderVisualiser from './FragmentShaderVisualiser.vue';
const DEFAULT_POINTS = [[0,0], [1,0], [0.5,1]]

export default {
  name: 'ShaderCodeVisualizer',
  components: {
    FragmentShaderVisualiser
  },
  data() {
    return {
      currentStep: 0,
      animationProgress: 0,
      animationDuration: 1000,
      shaderCode: [
        'attribute vec4 aVertexPosition',
        'uniform float uRotation',
        'uniform float uSize',
        '',
        'void main() {',
        '    float s = sin(uRotation)',
        '    float c = cos(uRotation)',
        '    mat2 rotation = mat2(c, -s, s, c)',
        '    vec2 rotated = rotation * aVertexPosition.xy',
        '    gl_Position = vec4(rotated * uSize, 0.0, 1.0)',
        '}'
      ],
      steps: [
        {
          id: 'vertex-input',
          title: 'Vertex Input',
          lines: [1],
          explanation: 'Input vertices define our shape. WebGL normalizes positions between -1 and 1',
          animation: { points: DEFAULT_POINTS, state: 'input' }
        },
        {
          id: 'rotation-setup',
          title: 'Rotation Setup',
          lines: [2, 5, 6],
          explanation: 'Calculate sine and cosine for rotation. These values create our rotation matrix',
          animation: { angle: 0, state: 'rotate-prep' }
        },
        {
          id: 'rotation-matrix',
          title: 'Rotation Matrix',
          lines: [7],
          explanation: 'Build 2x2 rotation matrix using sine and cosine values to rotate our shape',
          animation: { state: 'matrix' }
        },
        {
          id: 'apply-rotation',
          title: 'Apply Rotation',
          lines: [8],
          explanation: 'Transform vertices using rotation matrix to rotate the shape',
          animation: { state: 'transform' }
        },
        {
          id: 'final-position',
          title: 'Final Position',
          lines: [9],
          explanation: 'Scale the rotated shape and set its final position',
          animation: { state: 'final' }
        }
      ],
      animationFrame: null
    }
  },
  methods: {
    drawStep(ctx) {
      const step = this.steps[this.currentStep]
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
      switch(step.animation.state) {
        case 'input':
          this.drawWithGrid(ctx, step.animation.points)
          break
        case 'rotate-prep':
          this.drawWithGrid(ctx, DEFAULT_POINTS)
          this.drawAngleArc(ctx, this.animationProgress * Math.PI / 2)
          break
        case 'matrix':
          this.drawWithGrid(ctx, DEFAULT_POINTS)
          this.drawRotationMatrix(ctx, this.animationProgress)
          break
        case 'transform':
          this.drawWithGrid(ctx, DEFAULT_POINTS)
          this.drawRotatedShape(ctx, this.animationProgress * Math.PI / 2)
          break
        case 'final':
          this.drawFinalShape(ctx, this.animationProgress)
          break
      }
    },

    drawGrid(ctx) {
      ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = 0.5
      
      for(let i = -5; i <= 5; i++) {
        ctx.beginPath()
        ctx.moveTo(-250, i * 50)
        ctx.lineTo(250, i * 50)
        ctx.moveTo(i * 50, -250)
        ctx.lineTo(i * 50, 250)
        ctx.stroke()
        
        if(i !== 0) {
          ctx.fillText(i, i * 50 - 5, 15)
          ctx.fillText(i, 5, -i * 50 + 5)
        }
      }
    },

    drawWithGrid(ctx, points) {
      ctx.save()
      ctx.translate(150, 150)
      this.drawGrid(ctx)
      
      ctx.fillStyle = '#4299e1'
      points.forEach(([x, y], i) => {
        if (this.animationProgress > i * 0.3) {
          ctx.beginPath()
          ctx.arc(x * 50, -y * 50, 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillText(`(${x}, ${y})`, x * 50 + 10, -y * 50)
        }
      })
      ctx.restore()
    },

    drawAngleArc(ctx, angle) {
      ctx.save()
      ctx.translate(150, 150)
      ctx.beginPath()
      ctx.arc(0, 0, 30, 0, -angle) 
      ctx.strokeStyle = '#48bb78'
      ctx.stroke()
      
      const labelAngle = -angle / 2
      const labelRadius = 45
      const labelX = Math.cos(labelAngle) * labelRadius
      const labelY = Math.sin(labelAngle) * labelRadius
      ctx.fillText(`θ = ${Math.round(-angle * 180 / Math.PI)}°`, labelX, labelY)
      ctx.restore()
    },

    drawRotationMatrix(ctx, progress) {
  ctx.save()
  ctx.translate(150, 150)
  
  // Draw original points faded
  ctx.globalAlpha = 0.3
  this.drawShape(ctx, DEFAULT_POINTS)
  
  // Draw matrix with actual values
  ctx.globalAlpha = progress
  ctx.font = '16px monospace'
  ctx.fillStyle = '#2d3748'
  
  // Position matrix better
  const matrixX = -120
  const matrixY = -50
  
  // Draw matrix brackets and values clearly
  ctx.fillText('⎡  0  -1 ⎤', matrixX, matrixY)
  ctx.fillText('⎣  1   0 ⎦', matrixX, matrixY + 25)
  
  // Draw transformation arrows
  if (progress > 0.5) {
    // Set up arrow style
    ctx.strokeStyle = '#48bb78'
    ctx.lineWidth = 2
    
    // Draw movement arrows for each point
    DEFAULT_POINTS.forEach(([x, y]) => {
      const startX = x * 50
      const startY = -y * 50
      const endX = -y * 50
      const endY = -x * 50
      
      // Draw curved arrow
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      
      // Make curve more circular for rotation visualization
      const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2
      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2
      const controlX = midX - (endY - startY) * 0.5
      const controlY = midY + (endX - startX) * 0.5
      
      ctx.quadraticCurveTo(controlX, controlY, endX, endY)
      ctx.stroke()
      
      // Draw arrow head with better positioning
      const headSize = 8
      const angle = Math.atan2(endY - controlY, endX - controlX)
      
      ctx.beginPath()
      ctx.moveTo(endX, endY)
      ctx.lineTo(
        endX - headSize * Math.cos(angle - Math.PI / 7),
        endY - headSize * Math.sin(angle - Math.PI / 7)
      )
      ctx.moveTo(endX, endY)
      ctx.lineTo(
        endX - headSize * Math.cos(angle + Math.PI / 7),
        endY - headSize * Math.sin(angle + Math.PI / 7)
      )
      ctx.stroke()
    })
  }
  
  ctx.restore()
},

    drawRotatedShape(ctx, angle) {
      const transformedPoints = DEFAULT_POINTS.map(([x, y]) => {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return [x * cos - y * sin, x * sin + y * cos]
      })
      
      ctx.save()
      ctx.translate(150, 150)
      ctx.fillStyle = '#48bb78'
      this.drawShape(ctx, transformedPoints, true)
      ctx.restore()
    },

    drawShape(ctx, points, connect = false) {
      points.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x * 50, -y * 50, 5, 0, Math.PI * 2)
        ctx.fill()
      })

      if (connect) {
        ctx.beginPath()
        ctx.moveTo(points[0][0] * 50, -points[0][1] * 50)
        points.forEach(([x, y]) => ctx.lineTo(x * 50, -y * 50))
        ctx.closePath()
        ctx.stroke()
      }
    },

    drawFinalShape(ctx, progress) {
      ctx.save()
      ctx.translate(150, 150)
      
      if (progress < 0.5) {
        this.drawGrid(ctx)
        ctx.globalAlpha = 1 - progress * 2
      }
      
      const size = 0.8
      const angle = Math.PI / 3
      const points = DEFAULT_POINTS.map(([x, y]) => {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return [(x * cos - y * sin) * size, (x * sin + y * cos) * size]
      })
      
      ctx.fillStyle = '#4299e1'
      ctx.globalAlpha = progress
      this.drawShape(ctx, points, true)
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
    },

    nextStep() {
      this.currentStep = (this.currentStep + 1) % this.steps.length
      this.startAnimation()
    },

    prevStep() {
      this.currentStep = (this.currentStep - 1 + this.steps.length) % this.steps.length
      this.startAnimation()
    }
  }
}
</script>

<template>
  <div class="shader-visualizer">
    <!-- Left side: Code with current step highlight -->
    <div class="code-panel">
      <div class="code-header">
        <h3>Vertex Shader</h3>
      </div>
      <div class="code-content">
        <div class="line-numbers">
          <div v-for="i in 11" :key="i" class="line-number">{{ i }}</div>
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
        <button @click="prevStep" :disabled="currentStep === 0">Previous</button>
        <span>Step {{ currentStep + 1 }} of {{ steps.length }}</span>
        <button @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
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
  <FragmentShaderVisualiser />
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
}

.code-content {
  display: flex;
  padding: 1rem;
}

.line-numbers {
  padding-right: 1rem;
  margin-right: 1rem;
  border-right: 1px solid #3d3d3d;
  color: #6b6b6b;
  user-select: none;
}

.code-lines {
  flex: 1;
}

.code-line {
  font-family: 'Fira Code', monospace;
  color: #d4d4d4;
  padding: 0.25rem 0;
  transition: background-color 0.3s ease;
}

.code-line.highlighted {
  background: rgba(86, 156, 214, 0.2);
  border-radius: 4px;
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
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.step-navigation button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #4299e1;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.step-navigation button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
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
}

.current-step p {
  margin: 0;
  color: #4a5568;
  line-height: 1.6;
}

.animation-container {
  background: #fff;
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
}
</style>

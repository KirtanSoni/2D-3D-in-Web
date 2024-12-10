<script>
import WebGLBasicShapes from './WebGL/WebGLBasicShapes.vue'
import WebGLIntroduction from './WebGL/WebGLIntroduction.vue'
import WebGLImageProcessing from './WebGL/WebGLImageProcessing.vue'
import WebGL3DBasics from './WebGL/WebGL3DBasics.vue'
import Textures from './WebGL/Textures.vue'
import Lighting from './WebGL/Lighting.vue'
import ModernFrameworks from './WebGL/ModernFrameworks.vue'
import BestPractices from './WebGL/BestPractices.vue'
    export default {
        name: "LearningActivities",
        components: {
            WebGLIntroduction,
            WebGLImageProcessing,
            WebGLBasicShapes,
            WebGL3DBasics, 
            Textures, 
            Lighting,
            ModernFrameworks,
            BestPractices
        }
    }
</script>

<template>
    <div>
        <h2>Learning Activities</h2>
        <WebGLIntroduction />
        <WebGLImageProcessing />
        <WebGLBasicShapes /> 
        <WebGL3DBasics />
        <Textures />
        <Lighting />
        <ModernFrameworks />    
    </div>
</template>

<style>
</style>
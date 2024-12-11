<script>
import WebGLBasicShapes from './WebGLBasicShapes.vue'
import WebGLIntroduction from './WebGLIntroduction.vue'
import WebGLImageProcessing from './WebGLImageProcessing.vue'
import WebGL3DBasics from './WebGL3DBasics.vue'
import Textures from './Textures.vue'
import Lighting from './Lighting.vue'
import ModernFrameworks from './ModernFrameworks.vue'
import BestPractices from './BestPractices.vue'
    export default {
        name: "WebGLLA",
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
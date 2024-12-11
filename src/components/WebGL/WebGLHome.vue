<script>
    import WebGLLO from './WebGLLO.vue'
    import WebGLSummary from './WebGLSummary.vue'
    import WebGLReferences from './WebGLReferences.vue'
    import WebGLResources from './WebGLResources.vue'
    import WebGLTableofContents from './WebGLTableofContents.vue'
    import LearningActivities from './LearningActivities.vue'
    export default {
        name: "WebGLHome",
        components: {
            WebGLTableofContents,
            LearningActivities,
            WebGLLO,
            WebGLSummary,
            WebGLReferences,
            WebGLResources
        }
    }
</script>
<template>
    <WebGLTableofContents />
    <WebGLLO />
    <LearningActivities />
    <WebGLSummary />
    <WebGLReferences />
    <WebGLResources />
</template>
<style>
p{
    line-height: 2;
}
</style>
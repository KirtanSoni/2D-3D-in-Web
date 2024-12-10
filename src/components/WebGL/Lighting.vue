<script>
import { marked } from 'marked'
import lightingContent from './content/lighting.md?raw'
export default {
    name: 'Lighting',
    data() {
        return {
            lightingContent: ''
        }
    },
    created() {
        this.lightingContent = marked(lightingContent)
    }
}
</script>
<template>
    <div class="container">
        <div v-html="lightingContent"></div>
    </div>
</template>
<style></style>
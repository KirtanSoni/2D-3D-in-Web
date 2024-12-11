<script>
import { marked } from 'marked'
import texturesContent from './content/textures.md?raw'
export default {
    name: 'Textures',
    data() {
        return {
            texturesContent: ''
        }
    },
    created() {
        this.texturesContent = marked(texturesContent)
    }
}
</script>
<template>
    <div class="container">
        <div v-html="texturesContent"></div>
    </div>
</template>
<style>
.container {
    margin-top:5em;
}
</style>
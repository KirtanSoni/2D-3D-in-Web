<script>
import { marked } from 'marked'
import frameworkContent from './content/modernFrameworks.md?raw'
export default {
    name: 'ModernFrameworks',
    data() {
        return {
            frameworkContent: ''
        }
    },
    created() {
        this.frameworkContent = marked(frameworkContent)
    }
}
</script>
<template>
    <div class="container">
        <div v-html="frameworkContent"></div>
    </div>
</template>
<style></style>
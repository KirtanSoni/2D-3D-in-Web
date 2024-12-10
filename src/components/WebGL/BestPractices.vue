<script>
import { marked } from 'marked'
import practicesContent from './content/bestPractices.md?raw'
export default {
    name: 'BestPractices',
    data() {
        return {
            practicesContent: ''
        }
    },
    created() {
        this.practicesContent = marked(practicesContent)
    }
}
</script>
<template>
    <div class="container">
        <div v-html="practicesContent"></div>
    </div>
</template>
<style></style>
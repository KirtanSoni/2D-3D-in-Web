<script>
import summary from './content/summary.md?raw'
import { marked } from 'marked'

export default {
    name: "Summary",
    data() {
        return {
            summary: ''
        }
    },
    created() {
        this.summary = marked(summary)
    }
}
</script>

<template>
    <div id="summary">
        <div v-html="summary"></div>
    </div>
</template>

<style>
   
    .summary-text {
        margin-left: 1em;
        margin-right: 1em;
        line-height: 2;
    }
</style>
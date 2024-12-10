<script>
import { marked } from 'marked'
import intro from './content/3DIntro.md?raw'
import act1 from './content/3DAct1.md?raw'
import act2 from './content/3DAct2.md?raw'
import act3 from './content/3DAct3.md?raw'
import Orthographic from './demos/Orthographic.vue';
import Perspective from './demos/Perspective.vue';
import Camera from './demos/Camera.vue';
export default {
    name: 'WebGL3DBasics',
    components: {
        Orthographic,
        Perspective, 
        Camera
    },
    data() {
        return {
            intro: '',
            act1: '',
            act2: '',
            act3: ''
        }
    },
    created() {
        this.intro = marked(intro)
        this.act1 = marked(act1)
        this.act2 = marked(act2)
        this.act3 = marked(act3)
    }
}
</script>
<template>
    <div class="container">
        <div v-html="intro"></div>
        <div v-html="act1"></div>
        <Orthographic />
        <div v-html="act2"></div>
        <Perspective />
        <div v-html="act3"></div>
        <Camera />
    </div>
</template>
<style>
.container {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}
p {
    font-size: 16px;
}
</style>
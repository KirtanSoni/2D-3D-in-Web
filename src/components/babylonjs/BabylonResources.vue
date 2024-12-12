<template>
    <section class="resources-section">
        <h2>Learning Resources</h2>
        <div class="resources-list">
            <ul>
                <li>
                    <a href="https://www.babylonjs.com/" target="_blank" rel="noopener">Official Website</a>
                    - Main portal for Babylon.js
                </li>
                <li>
                    <a href="https://doc.babylonjs.com/" target="_blank" rel="noopener">Documentation</a>
                    - Comprehensive documentation and API reference
                </li>
                <li>
                    <a href="https://playground.babylonjs.com/" target="_blank" rel="noopener">Playground</a>
                    - Interactive environment to experiment with code
                </li>
                <li>
                    <a href="https://www.youtube.com/c/BabylonJSEngine" target="_blank" rel="noopener">YouTube
                        Channel</a>
                    - Video tutorials and updates
                </li>
                <li>
                    <a href="https://nme.babylonjs.com/" target="_blank" rel="noopener">Node Material Editor</a>
                    - Visual shader creation tool
                </li>
                <li>
                    <a href="https://github.com/BabylonJS/Babylon.js" target="_blank" rel="noopener">GitHub
                        Repository</a>
                    - Source code and examples
                </li>
                <li>
                    <a href="https://doc.babylonjs.com/toolsAndResources/inspector" target="_blank"
                        rel="noopener">Inspector</a>
                    - Scene debugging tool
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BabylonResources'
}
</script>

<style scoped>
.resources-section {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
}

h2 {
    color: #2c3e50;
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

h3 {
    color: #2c3e50;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 0.75rem;
    line-height: 1.5;
}

a {
    color: #86af49;
    text-decoration: none;
    font-weight: 500;
}

a:hover {
    text-decoration: underline;
}
</style>
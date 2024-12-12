<template>
    <section class="references-section">
        <h2>References</h2>
        <div class="references-list">
            <ul>
                <li>
                    <a href="https://doc.babylonjs.com/features/introductionToFeatures/chap1" target="_blank" rel="noopener">Babylon.js Documentation</a>
                    - Official guide for creating your first scene
                </li>
                <li>
                    <a href="https://playground.babylonjs.com/#BEFOO" target="_blank" rel="noopener">Physics</a>
                    - Playground Example
                </li>
                <li>
                    <a href="https://playground.babylonjs.com/#9WUJN#12" target="_blank"
                        rel="noopener">Animations</a>
                    - Playground Example
                </li>
                <li>
                    <a href="https://playground.babylonjs.com/#JUKXQD" target="_blank" rel="noopener">Import Model</a>
                    - Playground Example
                </li>
                <li>
                    <a href="https://babylonjs.medium.com/visual-effects-with-particles-a-guide-for-beginners-5f322445388d" target="_blank" rel="noopener">Particle Effect</a>
                    - Visual Effects with Particles: a Guide for Beginners
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BabylonReferences'
}
</script>

<style scoped>
.references-section {
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
import { createRouter, createWebHistory } from 'vue-router'
import AnalysisContent from '../components/analysis/AnalysisContent.vue'
import BabylonJSContent from '../components/babylonjs/BabylonJSContent.vue'
import ThreeJSContent from '../components/threejs/ThreeJSContent.vue'
import WebGLContent from '../components/WebGL/WebGLContent.vue'

const routes = [
  {
    path: '/',
    redirect: '/webgl'
  },
  {
    path: '/webgl',
    name: 'WebGL',
    component: WebGLContent
  },
  {
    path: '/threejs',
    name: 'ThreeJS',
    component: ThreeJSContent
  },
  {
    path: '/babylonjs',
    name: 'BabylonJS',
    component: BabylonJSContent
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: AnalysisContent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
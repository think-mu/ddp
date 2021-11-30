import Vue from 'vue'
import VueRouter from 'vue-router'
const main = () => import('views/page/main')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: main
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
// import userMenus from 'utils/nav-menu.js'
import { mapMenusRoutes } from 'utils/map-menus'
const main = () => import('views/page/main')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: main
  },
/*   {
    path: '/*',
    name: 'not-found',
    component: () => import('views/not-found/not-found') 
  } */
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

/* router.beforeEach((to,from,next) => {
  if (to.path == '/main') {
    const routes = mapMenusRoutes(userMenus)
    routes.forEach((route) => {
      router.addRoute('main',route)
    })
    next()
  // console.log(routes,"rrr");
  } 
  console.log(router.getRoutes(),"rrr");

  next()
  
}) */

export default router

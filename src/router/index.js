import Vue from 'vue'
import VueRouter from 'vue-router'
const main = () => import('@/views/page/main')
const detail = () => import('@/views/page/detail/detail.vue')
const category = () => import('@/views/page/category/category/category.vue')
const enforce = () => import('@/views/page/enforce/enforce.vue')
const review = () => import('@/views/page/review/review.vue')

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    // redirect: '/main/detail/detail',
    name: 'main',
    component: main,
    children: [
      {
        path: '/main/detail',
        name: 'detail',
        component: detail,
      },
      {
        path: '/main/category',
        name: 'category',
        component: category,
      },
      {
        path: '/main/enforce',
        name: 'enforce',
        component: enforce,
      },
      {
        path: '/main/review',
        name: 'review',
        component: review,
      }
    ]
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

router.beforeEach((to,from,next) => {
  if (to.path === '/main' || to.path === '/main/') {
    next({path:'/main/detail'})
  } 
  next()
})

export default router

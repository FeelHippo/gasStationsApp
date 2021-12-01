import Vue from 'vue'
import VueRouter from 'vue-router'
import LocalStorage from '@/utils/storage'
import home from '@/modules/home/router.js'
import authentication from '@/modules/authentication/router.js'

Vue.use(VueRouter)

const routes = [
  ...home,
  ...authentication,
  {
    path: '/',
    name: 'landing',
    beforeEnter: async (to, from, next) => {
      const route = await LocalStorage.readTokenStorage()
      next(route)
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('./404'),
    meta: {
      title: () => 'Invalid Route!',
    },
    props: true,
  },
  { path: '*', redirect: { name: '404' }, hidden: true },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})

export default router
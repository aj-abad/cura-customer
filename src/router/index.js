import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start'

import accountRoutes from './modules/account'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
    meta: {
      depth: 0,
      requireGuest: true
    }
  }
].concat(accountRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const store = router.app.$store
  if (!store) return next()
  const { userStatus } = store.getters.getUser
  if (to?.meta.requireGuest && store.getters.isLoggedIn)
    return next(false)
  if (to.meta.userStatus?.includes?.(userStatus))
    return next(false)
  return next()
})

export default router

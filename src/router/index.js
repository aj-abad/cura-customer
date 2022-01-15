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
      depth: 0
    }
  }
].concat(accountRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Count from '../views/Count.vue'
import WeightCount from '../views/WeightCount.vue'
import Log from '../views/Log.vue'
import Calendar from '../views/Calendar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/count',
    name: 'Count',
    component: Count
  },
  {
    path: '/weight-count',
    name: 'WeightCount',
    component: WeightCount
  },
  {
    path: '/log',
    name: 'Log',
    component: Log
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router

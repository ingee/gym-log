import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../views/Calendar.vue'
import Log from '../views/Log.vue'
import WorkoutList from '../views/WorkoutList.vue'
import Workout from '../views/Workout.vue'
import Count from '../views/Count.vue'
import WeightCount from '../views/WeightCount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/calendar'
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/logs/:date',
    name: 'Log',
    component: Log
  },
  {
    path: '/workouts',
    name: 'WorkoutList',
    component: WorkoutList
  },
  {
    path: '/workout',
    name: 'Workout',
    component: Workout
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

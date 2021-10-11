import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../views/Calendar.vue'
import Log from '../views/Log.vue'
import WorkoutList from '../views/WorkoutList.vue'
import Workout from '../views/Workout.vue'

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
    component: WorkoutList,
    props: true,
  },
  {
    path: '/workouts/:id',
    name: 'Workout',
    component: Workout
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

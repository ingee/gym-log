import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workouts: [
      {
        name: '턱걸이',
        icons: ['mdi-counter'],
        labels: ['회']
      },
      {
        name: '캐틀벨',
        icons: ['mdi-weight-kilogram', 'mdi-counter'],
        labels: ['kg', '회']
      },
      {
        name: '스쿼트',
        icons: ['mdi-counter'],
        labels: ['회']
      }
    ],
    curWorkout: null
  },
  mutations: {
    setCurWorkout (state, i) {
      state.curWorkout = state.workouts[i]
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import idb from './api/idb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    year: null, // 'yyyy'
    date: null, // 'yyyy-mm-dd'
    workouts: [
      {
        name: '걷기',
        icons: ['mdi-timer-outline'],
        labels: ['분'],
      },
      {
        name: '장군봉산책',
        icons: ['mdi-counter'],
        labels: ['시간'],
        def: [1] // default-value, optional
      },
      {
        name: '캐틀벨',
        icons: ['mdi-weight-kilogram', 'mdi-timer-outline'],
        labels: ['kg', '초'],
      },
      {
        name: '코어X',
        icons: ['mdi-counter'],
        labels: ['회'],
      },
      {
        name: '코어M',
        icons: ['mdi-counter'],
        labels: ['회'],
      },
      {
        name: '턱걸이',
        icons: ['mdi-counter'],
        labels: ['회'],
      },
      {
        name: '스쿼트',
        icons: ['mdi-counter'],
        labels: ['회'],
      },
      {
        name: '팔굽혀펴기',
        icons: ['mdi-counter'],
        labels: ['회'],
      },
    ],
    workoutLogs: [
      // Workout Log Sample
      // ===
      // {
      //   date: '2020-12-13',
      //   workout: '스쿼트',
      //   labels: ['회'],
      //   sets: [[20], [20], [20]]
      // },
      // {
      //   date: '2020-12-14',
      //   workout: '턱걸이',
      //   labels: ['회'],
      //   sets: [[4], [4], [4]]
      // },
      // {
      //   date: '2020-12-14',
      //   workout: '캐틀벨',
      //   labels: ['kg', '회'],
      //   sets: [[10, 3], [10, 3], [10, 3]]
      // }
    ]
  },
  mutations: {
    putTodayWorkout (state, { date, workout, labels, sets }) {
      const todayLog = { date, workout, labels, sets }
      const idx = state.workoutLogs.findIndex(
        log => (log.date === date && log.workout === workout)
      )
      if (idx === -1) {
        state.workoutLogs.push(todayLog)
      } else {
        state.workoutLogs[idx] = todayLog
      }
    },
    rmTodayWorkout (state, { date, workout }) {
      const idx = state.workoutLogs.findIndex(
        log => (log.date === date && log.workout === workout)
      )
      if (idx !== -1) {
        state.workoutLogs.splice(idx, 1)
      }
    },
    setDate (state, date) {
      state.date = date
    },
  },
  actions: {
    async getWorkoutLogs ({ context, state }, year) {
      if (String(state.year) !== String(year)) {
        state.year = year
        state.workoutLogs = await idb.getLogs(year)
      }
    },
    async putTodayWorkout ({ commit, state }, { date, id, sets }) {
      commit('putTodayWorkout', {
        date,
        workout: state.workouts[id].name,
        labels: state.workouts[id].labels,
        sets
      })
      await idb.putLog({
        date,
        workout: state.workouts[id].name,
        labels: state.workouts[id].labels,
        sets
      })
    },
    async rmTodayWorkout ({ commit, state }, { date, id }) {
      commit('rmTodayWorkout', {
        date,
        workout: state.workouts[id].name
      })
      await idb.rmLog({
        date,
        workout: state.workouts[id].name
      })
    },
  },
  modules: {
  }
})

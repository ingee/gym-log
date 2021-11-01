import Vue from 'vue'
import Vuex from 'vuex'
import idb from './api/idb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    year: null,
    workouts: [
      {
        name: '걷기',
        icons: ['mdi-timer-outline'],
        labels: ['분'],
        today: [] // ex) [[30]]
      },
      {
        name: '장군봉산책',
        icons: ['mdi-counter'],
        labels: ['시간'],
        today: [], // ex) [[1], [1], [1]]
        def: [1] // default-value, optional
      },
      {
        name: '캐틀벨',
        icons: ['mdi-weight-kilogram', 'mdi-timer-outline'],
        labels: ['kg', '초'],
        today: [] // ex) [[10,3], [10,3], [10,3]]
      },
      {
        name: '코어X',
        icons: ['mdi-counter'],
        labels: ['회'],
        today: [] // ex) [[4], [4], [4]]
      },
      {
        name: '코어M',
        icons: ['mdi-counter'],
        labels: ['회'],
        today: [] // ex) [[4], [4], [4]]
      },
      {
        name: '턱걸이',
        icons: ['mdi-counter'],
        labels: ['회'],
        today: [] // ex) [[4], [4], [4]]
      },
      {
        name: '스쿼트',
        icons: ['mdi-counter'],
        labels: ['회'],
        today: [] // ex) [[4], [4], [4]]
      },
      {
        name: '팔굽혀펴기',
        icons: ['mdi-counter'],
        labels: ['회'],
        today: [] // ex) [[10], [10], [10]]
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
    putTodayWorkout (state, { id, sets }) {
      state.workouts[id].today = sets
    },
    rmTodayWorkout (state, id) {
      state.workouts[id].today = []
    },
    putTodayWorkoutToLogs (state, { name, labels, sets }) {
      const todayLog = {
        date: this._vm.$dateStr.makeTodayStr(),
        workout: name,
        labels: labels,
        sets: sets
      }
      const idx = state.workoutLogs.findIndex(
        log => (log.date === todayLog.date && log.workout === todayLog.workout)
      )
      if (idx === -1) {
        state.workoutLogs.push(todayLog)
      } else {
        state.workoutLogs[idx] = todayLog
      }
    },
    rmTodayWorkoutFromLogs (state, id) {
      const today = this._vm.$dateStr.makeTodayStr()
      const workout = state.workouts[id].name
      const idx = state.workoutLogs.findIndex(
        log => (log.date === today && log.workout === workout)
      )
      if (idx !== -1) {
        state.workoutLogs.splice(idx, 1)
      }
    }
  },
  actions: {
    async getWorkoutLogs ({ context, state }, year) {
      if (String(state.year) !== String(year)) {
        state.year = year
        state.workoutLogs = await idb.getLogs(year)
      }
    },
    async putTodayWorkout ({ commit, state }, { id, name, labels, sets }) {
      commit('putTodayWorkout', { id, name, sets })
      commit('putTodayWorkoutToLogs', { name, labels, sets })
      await idb.putLog({
        date: this._vm.$dateStr.makeTodayStr(),
        workout: name,
        labels,
        sets
      })
    },
    async rmTodayWorkout ({ commit, state }, workoutID) {
      commit('rmTodayWorkout', workoutID)
      commit('rmTodayWorkoutFromLogs', workoutID)
      await idb.rmLog({
        date: this._vm.$dateStr.makeTodayStr(),
        workout: state.workouts[workoutID].name
      })
    },
  },
  modules: {
  }
})

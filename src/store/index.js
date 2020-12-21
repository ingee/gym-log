import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workouts: [
      {
        name: '턱걸이',
        icons: ['mdi-counter'],
        labels: ['회'],
        today: [] // ex) [[4], [4], [4]]
      },
      {
        name: '기계보조 턱걸이',
        icons: ['mdi-weight-kilogram', 'mdi-counter'],
        labels: ['kg', '회'],
        today: [] // ex) [[10,3], [10,3], [10,3]]
      },
      {
        name: '캐틀벨',
        icons: ['mdi-weight-kilogram', 'mdi-counter'],
        labels: ['kg', '회'],
        today: [] // ex) [[10,3], [10,3], [10,3]]
      },
      {
        name: '스쿼트',
        icons: ['mdi-counter'],
        labels: ['회'],
        today: [] // ex) [[4], [4], [4]]
      }
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
      {
        date: '2020-12-13',
        workout: '스쿼트',
        labels: ['회'],
        sets: [[20], [20], [20]]
      },
      {
        date: '2020-12-14',
        workout: '턱걸이',
        labels: ['회'],
        sets: [[4], [4], [4]]
      },
      {
        date: '2020-12-14',
        workout: '캐틀벨',
        labels: ['kg', '회'],
        sets: [[10, 3], [10, 3], [10, 3]]
      }
    ],
    workoutToday: {
      // Daily Workout Sample
      // ===
      // {
      //   '캐틀벨': 2,
      //   '턱걸이': 0,
      //   'name-of-workout': index-of-workout in workouts,
      //   ...
      // },
    }
  },
  mutations: {
    putTodayWorkout (state, { id, name, sets }) {
      state.workouts[id].today = sets
      state.workoutToday[name] = id
    },
    rmTodayWorkout (state, id) {
      const w = state.workouts[id]
      w.today = []
      delete state.workoutToday[w.name]
    },
    putTodayWorkoutToLogs (state, { name, labels, sets }) {
      const todayLog = {
        date: new Date().toLocaleDateString(),
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
      const today = new Date().toLocaleDateString()
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
  },
  modules: {
  }
})

<template>
  <div>
    <v-date-picker
      :events="workoutDays"
      :first-day-of-week="1"
      event-color="red"
      full-width
      @click:date="onDate"
      @click:year="onClickYear"
    ></v-date-picker>
    <v-fab-transition>
      <v-btn
        color="primary"
        class="mb-10"
        fab
        absolute
        bottom
        right
        to="/workouts"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      today: this.$dateStr.makeTodayStr(),
      workoutDays: []
    }
  },
  computed: mapState([
    'workoutLogs'
  ]),
  methods: {
    async loadWorkoutLogs (year) {
      await this.$store.dispatch('getWorkoutLogs', year)
      this.workoutDays = this.workoutLogs.map(logs => logs.date)
    },
    onDate (date) {
      if (date > this.today) {
        return
      }
      if (!this.workoutDays.includes(date)) {
        return
      }
      this.$router.push({ name: 'Log', params: { date } })
    },
    onClickYear (year) {
      this.loadWorkoutLogs(year)
    }
  },
  async created () {
    this.loadWorkoutLogs((new Date()).getFullYear())
  }
}
</script>

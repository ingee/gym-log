<template>
  <div>
    <v-date-picker
      v-model="today"
      :events="workoutDays"
      :first-day-of-week="1"
      event-color="red"
      full-width
      @click:date="onDate"
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
    onDate () {
      this.$router.push({ name: 'Log', params: { date: this.today } })
    }
  },
  created () {
    this.workoutDays = this.workoutLogs.map(logs => logs.date)
  }
}
</script>

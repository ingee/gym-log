<template>
  <div>
    <v-date-picker
      :events="workoutDays"
      :first-day-of-week="1"
      @click:date="onDate"
      @click:year="onClickYear"
      @update:picker-date="onUpdate"
      event-color="red"
      full-width
      v-model="selectedDate"
    ></v-date-picker>
    <v-fab-transition>
      <v-btn
        color="primary"
        class="mb-10"
        fab
        absolute
        bottom
        right
        @click="onPlus"
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
      selectedDate: this.$dateStr.makeTodayStr(),
      workoutDays: []
    }
  },
  computed: mapState([
    'workoutLogs',
  ]),
  methods: {
    async loadWorkoutLogs (year) {
      console.log(`dbg@Calendar.vue loadWorkoutLogs (${year})`)
      await this.$store.dispatch('getWorkoutLogs', year)
      this.workoutDays = this.workoutLogs.map(logs => logs.date)
    },
    onClickYear (year) {
      console.log(`dbg@Calendar.vue onClickYear (${year})`)
      this.loadWorkoutLogs(year)
    },
    onUpdate (updatedDate) {
      console.log(`dbg@Calendar.vue onUpdate (${updatedDate})`)
      const updatedYear = updatedDate.substr(0, 4)
      this.loadWorkoutLogs(updatedYear)
    },
    onPlus () {
      console.log('dbg@Calendar.vue onPlus ()')
      this.$store.dispatch('setDate', this.today)
      this.$router.push({ name: 'WorkoutList' })
    },
    onDate (date) {
      console.log('dbg@Calendar.vue date=', date)
      if (date > this.today) return
      this.$store.dispatch('setDate', date)
      if (this.workoutDays.includes(date)) {
        this.$router.push({ name: 'Log', params: { date } })
      } else {
        this.$router.push({ name: 'WorkoutList' })
      }
    },
  },
  created () {
    console.log('dbg@Calendar.vue created ()')
    if (this.$store.state.date) this.selectedDate = this.$store.state.date
  }
}
</script>

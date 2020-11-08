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
export default {
  data () {
    return {
      today: this.makeTodayStr(),
      workoutDays: [
        this.makeDateStr(2020, 11, 1),
        this.makeDateStr(2020, 11, 3),
        this.makeDateStr(2020, 11, 5),
        this.makeDateStr(2020, 11, 7),
        this.makeDateStr(2020, 11, 9),
      ]
    }
  },
  methods: {
    onDate () {
      this.$router.push({ name: 'Log', params: { date: this.today } })
    },
    makeDateStr (year, month, day) {
      return (new Date(`${year}-${month}-${day}`)).toISOString().substr(0, 10)
    },
    makeTodayStr () {
      return (new Date()).toISOString().substr(0, 10)
    }
  }
}
</script>

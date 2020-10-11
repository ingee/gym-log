<template>
  <div>
    <v-date-picker
      v-model="today"
      :events="workoutDays"
      :first-day-of-week="1"
      event-color="red"
      full-width
    ></v-date-picker>
    <v-fab-transition>
      <v-btn
        color="primary"
        class="mb-10"
        fab
        absolute
        bottom
        right
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
        this.makeDateStr(2020, 10, 1),
        this.makeDateStr(2020, 10, 3),
        this.makeDateStr(2020, 10, 5),
        this.makeDateStr(2020, 10, 7),
        this.makeDateStr(2020, 10, 9),
      ]
    }
  },
  methods: {
    makeDateStr (year, month, day) {
      return (new Date(`${year}-${month}-${day}`)).toISOString().substr(0, 10)
    },
    makeTodayStr () {
      return (new Date()).toISOString().substr(0, 10)
    }
  }
}
</script>

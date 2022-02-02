<template>
  <div>
    <v-sheet
      color="primary white--text"
      class="text-h4"
      height="90"
    >
      <v-row
        align="center"
        class="fill-height ma-0"
      >
        <v-btn
          icon color="white"
          @click="$router.go(-1)"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-col>
          <span> {{ dateStr }} </span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(w, i) in workouts"
          :key="i"
          @click="gotoWorkoutView(i)"
        >
          <!-- workout name -->
          <v-list-item-content>
            <v-list-item-title>
              <v-badge
                offset-x="-4"
                :content="getTodaySetsOf(w.name)"
                :value="getTodaySetsOf(w.name)"
              >
                {{ w.name }}
              </v-badge>
            </v-list-item-title>
          </v-list-item-content>
          <!-- workout icon -->
          <v-list-item-icon>
            <v-icon
              v-for="(icon, j) in w.icons"
              :key="j"
              v-text="icon"
            ></v-icon>
          </v-list-item-icon>
          <!-- workout button -->
          <v-list-item-action-text class="ml-4">
            <v-btn
              color="primary"
              icon
              :to="'/workouts/' + i"
            >
              <v-icon> mdi-plus-circle </v-icon>
            </v-btn>
            <v-btn
              color="error"
              icon
              @click.stop="removeToday(i)"
            >
              <v-icon> mdi-close-circle </v-icon>
            </v-btn>
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-fab-transition>
      <v-btn
        color="primary"
        class="mb-10"
        fab
        absolute
        bottom
        right
        to="/"
      >
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    dateKey: '',
    dateStr: '',
  }),
  computed: {
    todayLogs () {
      return this.workoutLogs.filter(l => l.date === this.dateKey)
    },
    ...mapState(['date', 'workouts', 'workoutLogs']),
  },
  methods: {
    removeToday (workoutID) {
      this.$store.dispatch('rmTodayWorkout', {
        date: this.dateKey,
        id: workoutID
      })
    },
    getTodaySetsOf (workoutName) {
      const log = this.todayLogs.find(l => l.workout === workoutName)
      if (log) return log.sets.length
      return 0
    },
    gotoWorkoutView (i) {
      this.$router.push({
        name: 'Workout',
        params: { id: i },
      })
    },
  },
  created () {
    if (this.date) this.dateKey = this.date
    else this.dateKey = this.$dateStr.makeTodayStr()
    this.dateStr = Intl.DateTimeFormat('ko-KR', {
      weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'
    }).format(new Date(this.dateKey))
  },
}
</script>

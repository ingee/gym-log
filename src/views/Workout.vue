<template>
  <div>
    <v-sheet
      class="text-h4"
      color="primary white--text"
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
          <span>{{ workout.name }}</span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(set, i) in sets"
          :key="i"
        >
          <v-list-item-content>
            <v-row
              align="center"
              no-gutters
            >
              <v-col cols="2" class="text-center">
                <div v-text="(i+1) + ' 세트'"></div>
              </v-col>
              <v-col
                v-for="(field, j) in workout.labels"
                :key="j"
                :cols="6/workout.labels.length"
              >
                <v-text-field
                  v-model.number="set[j]"
                  :label="workout.labels[j]"
                  clearable
                  dense
                  hide-details="auto"
                  outlined
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col class="ml-4">
                <v-btn
                  class="mx-1"
                  color="primary"
                  fab
                  x-small
                  @click="onAdd(i)"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
                <v-btn
                  class="mx-1"
                  color="primary"
                  fab
                  x-small
                  v-if="i>0"
                  @click="onDel(i)"
                >
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider class="my-2"/>
    <v-row no-gutters>
      <v-col cols="6" class="px-1">
        <v-btn
          block
          color="primary"
          @click="onOK"
        > 저장 </v-btn>
      </v-col>
      <v-col cols="6" class="px-1">
        <v-btn
          block
          @click="$router.go(-1)"
        > 취소 </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    dateKey: '',
    workoutID: null,
    workout: null,
    sets: null,
  }),
  computed: mapState(['date', 'workouts', 'workoutLogs']),
  methods: {
    mkOneSet () {
      const aSet = []
      let value
      for (let i = 0; i < this.workout.labels.length; i++) {
        value = 0
        if (this.workout.def && this.workout.def[i]) {
          value = this.workout.def[i]
        }
        aSet.push(value)
      }
      return aSet
    },
    onAdd (i) {
      const aCopy = JSON.parse(JSON.stringify(this.sets[i]))
      this.sets.splice(i, 0, aCopy)
    },
    onDel (i) {
      console.log(`sets[${i}]= `, this.sets[i])
      this.sets.splice(i, 1)
    },
    onOK () {
      this.$store.dispatch('putTodayWorkout', {
        date: this.dateKey,
        id: this.workoutID,
        sets: this.sets
      })
      this.$router.go(-1)
    }
  },
  created () {
    if (this.date) this.dateKey = this.date
    else this.dateKey = this.$dateStr.makeTodayStr()
    this.workoutID = this.$route.params.id
    this.workout = this.workouts[this.workoutID]
    const todayLog = this.workoutLogs.find(
      l => l.date === this.dateKey && l.workout === this.workout.name
    )
    if (todayLog && todayLog.sets.length) {
      this.sets = todayLog.sets
    } else {
      this.sets = [this.mkOneSet()]
    }
    console.log('dbg@Workout.vue: dateKey=', this.dateKey)
  }
}
</script>

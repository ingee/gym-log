<template>
  <div>
    <v-sheet
      color="primary white--text"
      class="text-h4"
      height="90"
    >
      <v-row
        align="center"
        class="fill-height pa-4"
      >
        <v-btn
          icon color="white"
          @click="$router.go(-1)"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-col>
          <span> 운동 리스트 </span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(w, i) in workouts"
          :key="i"
          :to="'/workouts/' + i"
        >
          <!-- workout name -->
          <v-list-item-content>
            <v-list-item-title>
              <v-badge
                offset-x="-4"
                :content="workouts[i].today.length"
                :value="workouts[i].today.length"
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
              @click.prevent="removeToday(i)"
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
        disabled
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
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'workouts'
  ]),
  methods: {
    removeToday (workoutID) {
      this.$store.dispatch('rmTodayWorkout', workoutID)
    }
  }
}
</script>

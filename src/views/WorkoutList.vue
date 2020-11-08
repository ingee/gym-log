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
        >
          <!-- workout name -->
          <v-list-item-content>
            <v-list-item-title v-text="w.name"></v-list-item-title>
          </v-list-item-content>
          <!-- workout icon -->
          <v-list-item-icon>
            <v-icon
              v-for="(icon, j) in w.icons"
              :key="j"
              v-text="icon"
            ></v-icon>
          </v-list-item-icon>
          <v-spacer/>
          <!-- workout button -->
          <v-list-item-action>
            <v-btn
              class="mx-2"
              color="primary"
              fab
              x-small
              @click="onWriteWorkout(i)"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-list-item-action>
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
    onWriteWorkout (i) {
      this.$store.commit('setCurWorkout', i)
      this.$router.push({ name: 'Workout' })
    }
  }
}
</script>

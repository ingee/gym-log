<template>
  <div>
    <v-sheet
      class="text-h4"
      color="primary white--text"
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
                  @click="onAdd"
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
    workout: null,
    sets: null
  }),
  computed: mapState([
    'workouts'
  ]),
  methods: {
    mkOneSet () {
      const aSet = []
      for (let i = 0; i < this.workout.labels.length; i++) {
        aSet.push(0)
      }
      return aSet
    },
    onAdd () {
      this.sets.push(this.mkOneSet())
    },
    onDel (i) {
      console.log(`sets[${i}]= `, this.sets[i])
      this.sets.splice(i, 1)
    },
    onOK () {
      // Daily Workout Data Sample
      // ===
      // date: '2020-12-12',
      // [
      //   {
      //     name: '캐틀벨',
      //     labels: ['kg','회']
      //     sets: [
      //       [10,3], [10,3], [10,3]
      //     ]
      //   },
      //   {
      //     name: '턱걸이',
      //     labels: ['회']
      //     sets: [
      //       [4], [4], [4]
      //     ]
      //   },
      //   ...
      // ]
    }
  },
  created () {
    this.workout = this.workouts[this.$route.params.id]
    this.sets = [this.mkOneSet()]
  }
}
</script>

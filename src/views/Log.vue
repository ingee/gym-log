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
          <span> {{ date }}, 운동 기록 </span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-card
      v-for="(workout, i) in workouts"
      :key="i"
      class="my-2 mx-4" color="grey lighten-5"
    >
      <v-card-title> {{ workout.name }} </v-card-title>
      <v-card-text>
        <v-row
          v-for="(set, j) in workout.sets"
          :key="j"
          align="center" no-gutters
        >
          <v-col cols="4">
            <v-chip outlined color="primary" class="ml-2"
            > {{ j }}세트 </v-chip>
          </v-col>
          <v-col
            v-for="(data, k) in set"
            :key="k"
            cols="4"
          >
            <span class="text-body-1"> {{ data }}{{ workout.labels[k] }} </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider class="my-2"/>
    <v-row no-gutters>
      <v-col cols="6" class="px-1">
        <v-btn
          block
          class="mb-2"
          @click="$router.go(-1)"
        > 돌아가기 </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: '10/22',
    workouts: [
      { name: '턱걸이', labels: ['회'], sets: [[4], [4], [4]] },
      { name: '캐틀벨', labels: ['kg', '회'], sets: [[10, 3], [10, 3], [10, 3]] },
      { name: '스쿼트', labels: ['회'], sets: [[20], [20], [20]] }
    ]
  })
}
</script>

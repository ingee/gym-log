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
          <span> {{ $route.params.date }} 기록 </span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-card
      v-for="(log, i) in todayLogs"
      :key="i"
      class="my-2 mx-4" color="grey lighten-5"
    >
      <v-card-title> {{ log.workout }} </v-card-title>
      <v-card-text>
        <v-row
          v-for="(set, j) in log.sets"
          :key="j"
          align="center" no-gutters
        >
          <v-col cols="4">
            <v-chip outlined color="primary" class="ml-2"
            > {{ j+1 }}세트 </v-chip>
          </v-col>
          <v-col
            v-for="(data, k) in set"
            :key="k"
            cols="4"
          >
            <span class="text-body-1"> {{ data }}{{ log.labels[k] }} </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider class="my-2"/>
    <v-row no-gutters>
      <v-col cols="6" class="px-1">
        <v-btn
          block
          color="primary"
          @click="onOK"
        > 수정 </v-btn>
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
    todayLogs: []
  }),
  computed: mapState([
    'workoutLogs'
  ]),
  methods: {
    onOK () {
      console.log('dbg@Log.vue onOK()')
    },
  },
  created () {
    this.todayLogs = this.workoutLogs.filter(
      log => log.date === this.$route.params.date
    )
  }
}
</script>

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
        <v-col>
          <span> 횟수 기록 </span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-list>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(s, i) in sets"
          :key="i"
        >
          <v-list-item-content>
            <v-row
              align="center"
              no-gutters
            >
              <v-col cols="3" class="text-center">
                <div v-text="(i+1) + ' 세트'"></div>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  clearable
                  dense
                  hide-details="auto"
                  label="횟수"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="mx-4">
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
    <v-row>
      <v-col cols="6">
        <v-btn
          block
          color="primary"
        > 저장 </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          block
        > 취소 </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    sets: [0]
  }),
  methods: {
    onAdd () {
      this.sets.push(0)
    },
    onDel (i) {
      console.log(`onDel( ${i} )`)
    }
  }
}
</script>

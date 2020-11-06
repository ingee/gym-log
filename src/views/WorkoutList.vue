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
      <v-list-item-group
        v-model="item"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <!-- workout name -->
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
          <!-- workout icon -->
          <v-list-item-icon
            v-if="item.icon instanceof Array"
          >
            <v-icon
              v-for="(icon, j) in item.icon"
              :key="j"
              v-text="icon"
            ></v-icon>
          </v-list-item-icon>
          <v-list-item-icon
            v-else
          >
            <v-icon
              v-text="item.icon"
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
              :to="item.to"
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
export default {
  data: () => ({
    item: 1,
    items: [
      { text: '턱걸이', icon: 'mdi-counter', to: '/count' },
      { text: '캐틀벨', icon: ['mdi-weight-kilogram', 'mdi-counter'], to: '/weight-count' },
      { text: '스쿼트', icon: 'mdi-counter', to: '/count' },
    ],
  }),
  methods: {
  }
}
</script>

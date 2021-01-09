<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="red white--text"
        class="pa-4"
      >
        <div class="text-h3">Gym-log</div>
        <br/>
        <div class="text-right text-subtitle-1">Daily Workout Log</div>
      </v-sheet>
      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="([icon, text, url], i) in links"
          :key="i"
          :to="url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Gym-log</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    links: [
      ['mdi-home', 'Home', '/calendar'],
      ['mdi-information', 'About', '/about'],
    ],
  })
}
</script>

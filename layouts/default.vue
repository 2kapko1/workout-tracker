<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>WorkoutTracker</v-app-bar-title>
      <v-spacer/>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
    </v-app-bar>
    <v-main app>
      <nuxt/>
    </v-main>

    <v-bottom-navigation>
      <v-btn value="recent">
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn value="recent">
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="workout">
        <span>Workout</span>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <span>Excercises</span>
        <v-icon>mdi-dumbbell</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout"
}
</script>

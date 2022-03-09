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
      <v-btn to="/">
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn to="/history">
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/workouts">
        <span>Workout</span>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn to="/exercises">
        <span>Exercises</span>
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

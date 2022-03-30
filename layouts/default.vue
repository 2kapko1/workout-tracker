<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>WorkoutTracker</v-app-bar-title>
      <v-spacer/>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main app>
      <nuxt/>
    </v-main>

    <v-bottom-navigation app>
      <v-btn to="/">
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn to="/history">
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/workouts">
        <span>{{ this.currentWorkout ? this.elapsedTime : 'Workout' }}</span>
        <v-icon>{{ this.currentWorkout ? 'mdi-clock-outline' : 'mdi-plus' }}</v-icon>
      </v-btn>

      <v-btn to="/exercises">
        <span>Exercises</span>
        <v-icon>mdi-dumbbell</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import {Workout} from '@/types';

export default Vue.extend({
  name: 'DefaultLayout',
  data() {
    return {
      elapsedTime: '00:00',
      timeInterval: null as NodeJS.Timeout | null,
    };
  },
  computed: {
    ...mapGetters('currentWorkout', ['getCurrentWorkout']),
    currentWorkout(): Workout {
      return this.getCurrentWorkout;
    },
  },
  created() {
    this.setElapsedTime();
    this.timeInterval = setInterval(() => {
      this.setElapsedTime();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timeInterval) clearInterval(this.timeInterval);
  },
  methods: {
    setElapsedTime() {
      if (!this.currentWorkout?.performed_at) return;
      const elapsedTimeInSeconds = Math.floor((new Date().getTime() - new Date(this.currentWorkout.performed_at).getTime()) / 1000);

      this.elapsedTime = ('0' + Math.floor(elapsedTimeInSeconds / 60)).slice(-2)
        + ':' + ('0' + (elapsedTimeInSeconds % 60)).slice(-2);
    },
  },
});
</script>

<template>
  <v-container>
    <span class="text-h5">Add new template</span>
    <workout-form @save="addWorkoutAndRedirect"/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions} from "vuex";
import {Workout} from "~/types";

export default Vue.extend({
  name: 'CreateWorkoutPage',
  methods: {
    ...mapActions('workout', ['addWorkout']),
    addWorkoutAndRedirect(workout: Workout) {
      this.addWorkout(workout)
      this.$router.push('/workouts')
    }
  }
})
</script>

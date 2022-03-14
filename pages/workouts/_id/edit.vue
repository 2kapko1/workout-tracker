<template>
  <v-container>
    <span class="text-h5">Edit {{ workout.name }} template</span>
    <workout-form
      @save="editWorkoutAndRedirect"
      :workout="workout"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Workout} from "~/types";
import {mapActions, mapGetters} from "vuex";

export default Vue.extend({
  name: 'EditWorkoutPage',
  computed: {
    ...mapGetters('workout', ['getWorkoutById']),
    workoutId(): Workout['id'] {
      return Number.parseInt(this.$route.params.id);
    },
    workout(): Workout {
      return this.getWorkoutById(this.workoutId);
    }
  },
  methods: {
    ...mapActions('workout', ['editWorkout']),
    editWorkoutAndRedirect(workout: Workout) {
      this.editWorkout(workout);
      this.$router.push('/workouts');
    }
  }
})
</script>

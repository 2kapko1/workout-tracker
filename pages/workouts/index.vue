<template>
  <v-container>
    <span v-if="workoutStarted" class="text-h6">Current</span>
    <workout-card-current v-if="workoutStarted"/>
    <v-btn v-if="!workoutStarted" block color="primary">start an empty workout</v-btn>
    <v-divider class="my-3"/>
    <div class="d-flex">
      <span class="text-h6">My templates</span>
      <v-spacer/>
      <v-btn :disabled="workoutStarted" :to="'/workouts/create'" text>
        <v-icon left>mdi-plus</v-icon>
        ADD NEW
      </v-btn>
    </div>

    <workout-card v-for="workout in workouts" :key="'workout-'+workout.id" :disabled="workoutStarted"
                  :workout="workout"/>
    <div class="d-flex">
      <span class="text-h6">Samples</span>
    </div>
    <workout-card-sample v-for="sample in samples" :key="'sample-'+sample.id" :disabled="workoutStarted"
                         :sample="sample"/>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import WorkoutCard from '~/components/WorkoutCard.vue';
import {Workout} from '~/types';

export default Vue.extend({
  name: 'WorkoutsListPage',
  components: {WorkoutCard},
  computed: {
    ...mapGetters('workout', ['getWorkouts']),
    ...mapGetters('workoutSample', ['getWorkoutSamples']),
    ...mapGetters('currentWorkout', ['getCurrentWorkout']),
    workouts(): Array<Workout> {
      return this.getWorkouts;
    },
    samples(): Array<Workout> {
      return this.getWorkoutSamples;
    },
    currentWorkout(): Workout | null {
      return this.getCurrentWorkout;
    },
    workoutStarted(): Boolean {
      return this.currentWorkout !== null;
    },
  },
});
</script>

<template>
  <v-card class="my-2">
    <v-card-title>
      <span class="headline">{{ workout.name }}</span>
    </v-card-title>
    <v-card-text>
      <span>Elapsed Time: {{ elapsedTime }}</span>
      <ul>
        <li v-for="workoutExercise in workout.exercises">
          {{ workoutExercise.sets.length }} x {{ workoutExercise.exercise.name }}
        </li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn :to="'workouts/'+workout.id" color="info" text>
        SHOW
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Workout} from '~/types';
import {mapGetters} from 'vuex';

export default Vue.extend({
  name: 'WorkoutCardCurrent',
  data() {
    return {
      elapsedTime: '00:00',
      timeInterval: null as NodeJS.Timeout | null,
    };
  },
  computed: {
    ...mapGetters('currentWorkout', ['getCurrentWorkout']),
    workout(): Workout {
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
      if (this.workout.performed_at === null) return;
      const elapsedTimeInSeconds = Math.floor((new Date().getTime() - new Date(this.workout.performed_at).getTime()) / 1000);

      this.elapsedTime = ('0' + Math.floor(elapsedTimeInSeconds / 60)).slice(-2)
        + ':' + ('0' + (elapsedTimeInSeconds % 60)).slice(-2);
    },
  },
});
</script>

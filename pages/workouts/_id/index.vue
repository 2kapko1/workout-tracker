<template>
  <v-container>
    <div class="d-flex align-center">
      <span class="text-h5">{{ workout.name }}</span>
      <v-spacer/>
      <span>{{ elapsedTime }}</span>
    </div>


    <v-card v-for="({exercise, sets}, index) in workout.exercises" :key="index" class="mt-2">
      <v-card-title>{{ exercise.name }}</v-card-title>
      <v-card-text>
        <sets-form :value="sets" @input="updateSets(index, $event)"/>
      </v-card-text>
    </v-card>

    <div class="d-flex justify-center mt-3">
      <exercises-dialog @addExercises="addExercises"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';
import {Exercise, Workout, Set} from '~/types';

export default Vue.extend({
  name: 'WorkoutIndexPage',
  data() {
    return {
      elapsedTime: '00:00',
      timeInterval: null as NodeJS.Timeout | null,
      selected: [],
    };
  },
  computed: {
    ...mapGetters('currentWorkout', ['getCurrentWorkout']),
    workoutId(): Workout['id'] {
      return Number.parseInt(this.$route.params.id);
    },
    workout: {
      get(): Workout {
        return this.getCurrentWorkout;
      },
      set(workout: Workout) {
        this.$store.commit('currentWorkout/SET_CURRENT_WORKOUT', workout);
      },
    },
  },
  created() {
    this.startWorkout(this.workoutId);
    this.setElapsedTime();
    this.timeInterval = setInterval(() => {
      this.setElapsedTime();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timeInterval) clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions('currentWorkout', ['startWorkout', 'addSetToCurrentWorkout', 'addExercisesToCurrentWorkout']),
    addSet(id: Exercise['id']) {
      this.addSetToCurrentWorkout(id);
    },
    updateSets(index: Number, sets: Set[]) {
      console.log(sets);
      this.$store.commit('currentWorkout/SET_CURRENT_WORKOUT_SETS', {index, sets});
    },
    addExercises(exercises: Exercise[]) {
      this.addExercisesToCurrentWorkout(exercises);
    },
    setElapsedTime() {
      if (this.workout.performed_at === null) return;
      const elapsedTimeInSeconds = Math.floor((new Date().getTime() - new Date(this.workout.performed_at).getTime()) / 1000);

      this.elapsedTime = ('0' + Math.floor(elapsedTimeInSeconds / 60)).slice(-2)
        + ':' + ('0' + (elapsedTimeInSeconds % 60)).slice(-2);
    },
  },

});
</script>

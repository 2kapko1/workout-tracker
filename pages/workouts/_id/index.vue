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
        <v-row>
          <v-col>
            Set
          </v-col>
          <v-col>
            Reps
          </v-col>
          <v-col>
            Weight
          </v-col>
          <v-col>
            <v-simple-checkbox/>
          </v-col>
        </v-row>
        <v-row v-for="(set,index) in sets" :key="index">
          <v-col>
            {{ index + 1 }}
          </v-col>
          <v-col>
            {{ set.reps }}
          </v-col>
          <v-col>
            {{ set.weight }} kg
          </v-col>
          <v-col>
            <v-simple-checkbox/>
          </v-col>
        </v-row>
        <div class="text-center mt-4">
          <v-btn text @click="addSet(exercise.id)">
            <v-icon left>mdi-plus</v-icon>
            ADD SET
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <div class="d-flex justify-center mt-auto">
      <exercises-dialog @addExercises="addExercises"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';
import {Exercise, Workout} from '~/types';

export default Vue.extend({
  name: 'WorkoutIndexPage',
  data() {
    return {
      elapsedTime: '00:00',
      timeInterval: null as NodeJS.Timeout|null,
    }
  },
  computed: {
    ...mapGetters('currentWorkout', ['getCurrentWorkout']),
    workoutId(): Workout['id'] {
      return Number.parseInt(this.$route.params.id);
    },
    workout(): Workout {
      return this.getCurrentWorkout;
    },
  },
  created() {
    this.startWorkout(this.workoutId);
    this.setElapsedTime();
    this.timeInterval = setInterval(() => {
      this.setElapsedTime()
    }, 1000);
  },
  beforeDestroy() {
    if (this.timeInterval) clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('currentWorkout', ['startWorkout', 'addSetToCurrentWorkout', 'addExercisesToCurrentWorkout']),
    addSet(id: Exercise['id']) {
      this.addSetToCurrentWorkout(id);
    },
    addExercises(exercises: Exercise[]) {
      this.addExercisesToCurrentWorkout(exercises)
    },
    setElapsedTime() {
      if (this.workout.performed_at === null) return;
      const elapsedTimeInSeconds = Math.floor((new Date().getTime() - new Date(this.workout.performed_at).getTime()) / 1000);

      this.elapsedTime = ('0' + Math.floor(elapsedTimeInSeconds / 60)).slice(-2)
        + ':' + ('0' + (elapsedTimeInSeconds % 60)).slice(-2);
    }
  },

});
</script>

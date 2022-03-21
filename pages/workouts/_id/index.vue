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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';
import {Exercise, Workout} from '~/types';

export default Vue.extend({
  name: 'WorkoutIndexPage',
  computed: {
    ...mapGetters('currentWorkout', ['getCurrentWorkout']),
    workoutId(): Workout['id'] {
      return Number.parseInt(this.$route.params.id);
    },
    workout(): Workout {
      return this.getCurrentWorkout;
    },
    elapsedTimeInSeconds(): number {
      if (this.workout.performed_at === null) return 0;
      return Math.floor((new Date().getTime() - new Date(this.workout.performed_at).getTime()) / 1000);
    },
    elapsedTime(): string {
      return Math.floor(this.elapsedTimeInSeconds / 60) + ':' + this.elapsedTimeInSeconds % 60;
    },
  },
  created() {
    this.startWorkout(this.workoutId);
  },
  methods: {
    ...mapActions('currentWorkout', ['startWorkout', 'addSetToCurrentWorkout']),
    addSet(id: Exercise['id']) {
      this.addSetToCurrentWorkout(id);
    },
  },

});
</script>

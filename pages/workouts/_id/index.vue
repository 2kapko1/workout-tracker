<template>
  <v-container>
    <div class="d-flex align-center">
      <span class="text-h5">{{ workout.name }}</span>
      <v-spacer/>
      <span>00:30</span>
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from "vuex";
import {Workout} from "~/types";

export default Vue.extend({
  name: 'WorkoutIndexPage',
  computed: {
    ...mapGetters('workout', ['getWorkoutById']),
    workoutId(): Workout['id'] {
      return Number.parseInt(this.$route.params.id);
    },
    workout(): Workout {
      return this.getWorkoutById(this.workoutId);
    }
  },
})
</script>

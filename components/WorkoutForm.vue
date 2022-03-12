<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-text-field label="Name"/>
      </v-col>
    </v-row>
    <div class="d-flex align-center">
      <span>Exercises</span>
      <v-spacer/>
      <exercises-dialog @addExercises="addExercises"/>
    </div>

    <v-expansion-panels class="mt-4">
      <exercise-form-panel
        v-for="(exercise, index) in exercises"
        :key="index"
        v-model="exercises[index]"
        @removeExercise="removeExercise(index)"
      />
    </v-expansion-panels>

  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import {Exercise, WorkoutExercise} from "~/types";

export default Vue.extend({
  name: 'WorkoutForm',
  data() {
    return {
      exercises: [] as Array<WorkoutExercise>,
    }
  },
  methods: {
    addExercises(exercises: Exercise[]) {
      exercises.forEach(exercise => this.addExercise(exercise))
    },
    addExercise(exercise: Exercise) {
      this.exercises.push({
        exercise: exercise,
        sets: []
      })
    },
    removeExercise(index: number) {
      this.exercises.splice(index, 1)
    },
  }
})
</script>

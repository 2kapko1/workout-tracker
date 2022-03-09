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
      <v-btn text @click="addExercise">
        <v-icon left>mdi-plus</v-icon>
        ADD EXERCISE
      </v-btn>
    </div>

    <v-expansion-panels class="mt-4">
      <exercise-form-panel
        v-for="(exercise, index) in exercises"
        :key="index"
        v-model="exercises[index]"
      />
    </v-expansion-panels>

  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import {Exercise} from "~/types";

export default Vue.extend({
  name: 'WorkoutForm',
  data() {
    return {
      exercises: [] as Array<Exercise>,
    }
  },
  methods: {
    addExercise() {
      this.exercises.push({
        name: 'Deadlift',
        sets: []
      })
    }
  }


})
</script>

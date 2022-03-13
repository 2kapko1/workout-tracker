<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-text-field label="Name" v-model="name"/>
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

    <v-row>
      <v-col cols="5">
        <v-btn outlined color="warning" block to="/workout">
          BACK
        </v-btn>
      </v-col>
      <v-col cols="5" offset="2">
        <v-btn outlined color="primary" block @click="save">
          SAVE
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import {Exercise, Workout, WorkoutExercise} from "~/types";

export default Vue.extend({
  name: 'WorkoutForm',
  data() {
    return {
      exercises: [] as Array<WorkoutExercise>,
      name: '',
    }
  },
  methods: {
    save() {
      const workout: Workout = {
        id: null,
        name: this.name,
        created_at: new Date().toISOString(),
        performed_at: null,
        exercises: this.exercises,
      }

      this.$emit('save', workout);
    },
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

<template>
  <v-expansion-panel class="expansion-panel__with-button">
    <v-expansion-panel-header>
      <span>
        <v-btn tile @click.stop="removeExercise">
          <v-icon color="error">
            mdi-delete
          </v-icon>
        </v-btn>
      {{ exercise.exercise.name }}
      </span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col cols="2">
          Set
        </v-col>
        <v-col cols="4">
          Reps
        </v-col>
        <v-col cols="4">
          Weight
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>
      <v-row v-for="(set, index) in exercise.sets" :key="index" align="center">
        <v-col cols="2">
          {{ index + 1 }}
        </v-col>
        <v-col cols="4">
          <v-text-field solo hide-details dense v-model="exercise.sets[index].reps"/>
        </v-col>
        <v-col cols="4">
          <v-text-field solo hide-details dense v-model="exercise.sets[index].weight"/>
        </v-col>
        <v-col cols="2">
          <v-btn icon color="error" @click="removeSet(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div class="text-center mt-4">
        <v-btn text @click="addSet">
          <v-icon left>mdi-plus</v-icon>
          ADD SET
        </v-btn>
      </div>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Exercise, WorkoutExercise} from "~/types";

export default Vue.extend({
  name: 'ExerciseFormPanel',
  props: {
    value: Object as PropType<WorkoutExercise>
  },
  computed: {
    exercise: {
      get(): WorkoutExercise {
        return this.value;
      },
      set(exercise: WorkoutExercise) {
        this.$emit('input', exercise);
      }
    }
  },
  methods: {
    addSet() {
      this.exercise.sets.push({
        weight: null,
        reps: null
      })
    },
    removeSet(index: number) {
      this.exercise.sets.splice(index, 1)
    },
    removeExercise() {
      this.$emit('removeExercise');
    }
  }
})
</script>

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
      <sets-form v-model="exercise.sets"/>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Exercise, WorkoutExercise} from '~/types';

export default Vue.extend({
  name: 'ExerciseFormPanel',
  props: {
    value: Object as PropType<WorkoutExercise>,
  },
  computed: {
    exercise: {
      get(): WorkoutExercise {
        return this.value;
      },
      set(exercise: WorkoutExercise) {
        this.$emit('input', exercise);
      },
    },
  },
  methods: {
    removeExercise() {
      this.$emit('removeExercise');
    },
  },
});
</script>

<template>
  <v-card class="my-2">
    <v-card-title>
      <span class="headline">{{ workout.name }}</span>
      <v-spacer/>
      <workout-card-menu :workout-id="workout.id"/>
    </v-card-title>
    <v-card-text>
      <template v-if="workout.performed_at !== null">
        Last performed: {{ performed }} ago
      </template>

      <ul>
        <li v-for="exercise in workout.exercises">
          {{exercise.sets.length}} x {{exercise.name}}
        </li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn text :to="'workout/'+workout.id" color="primary">
        START
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Workout} from "~/types";

export default Vue.extend({
  name: 'WorkoutCard',
  props: {
    workout: {
      type: Object as PropType<Workout>,
      required: true
    }
  },
  computed: {
    performed(): string {
      const diff = (new Date().getTime() - new Date(this.workout.performed_at).getTime()) / 1000;
      if (diff >= 172800) return Math.floor(diff / 86400) + ' days';
      if (diff >= 86400) return Math.floor(diff / 86400) + ' day';
      if (diff >= 7200) return Math.floor(diff / 3600) + ' hours';
      if (diff >= 3600) return Math.floor(diff / 3600) + ' hour';
      if (diff >= 120) return Math.floor(diff / 60) + ' minutes';
      if (diff >= 60) return Math.floor(diff / 60) + ' minute';
      return diff + ' seconds';
    }
  }

})
</script>

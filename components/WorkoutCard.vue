<template>
  <v-card class="my-2">
    <v-card-title>
      <span class="headline">{{ workout.name }}</span>
      <v-spacer/>
      <workout-card-menu/>
    </v-card-title>
    <v-card-text>
      Last performed: {{performed}} ago

      <ul>
        <li>
          4 x Deadlift
        </li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn text :to="'workout/1'" color="primary">
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
      //TODO
      return '25 days'
    }
  }

})
</script>

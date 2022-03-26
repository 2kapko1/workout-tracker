<template>
  <v-card class="my-2">
    <v-card-title>
      <span class="headline">{{ sample.name }}</span>
    </v-card-title>
    <v-card-text>
      <ul>
        <li v-for="{exercise, sets} in sample.exercises">
          {{ sets.length }} x {{ exercise.name }}
        </li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="warning" text @click="addSample" :disabled="disabled">
        ADD TO YOUR TEMPLATES
        <v-icon right>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Workout} from '~/types';
import {mapActions} from 'vuex';

export default Vue.extend({
  name: 'WorkoutCardSample',
  props: {
    sample: {
      type: Object as PropType<Workout>,
    },
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions('workout', ['addWorkout']),
    addSample() {
      this.addWorkout({...this.sample, created_at: new Date().toISOString()});
    },
  },
});
</script>

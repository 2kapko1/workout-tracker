<template>
  <v-menu
    bottom
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :disabled="disabled"
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item :to="'/workouts/'+workoutId+'/edit'">
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
      <v-list-item @click="copyWorkout">
        <v-list-item-title>Copy</v-list-item-title>
      </v-list-item>
      <v-list-item @click="removeWorkout">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WorkoutCardMenu',
  props: {
    workoutId: {
      type: Number,
    },
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    removeWorkout() {
      this.$store.dispatch('workout/removeWorkout', this.workoutId);
    },
    editWorkout() {

    },
    copyWorkout() {
      this.$store.dispatch('workout/copyWorkout', this.workoutId);
    },
  },
});
</script>

<template>
  <v-container>
    <v-btn block color="primary">start an empty workout</v-btn>
    <v-divider class="my-3"/>
    <div class="d-flex">
      <span class="text-h6">My templates</span>
      <v-spacer/>
      <v-btn text :to="'/workouts/create'">
        <v-icon left>mdi-plus</v-icon>
        ADD NEW
      </v-btn>
    </div>
    <workout-card v-for="workout in workouts" :key="workout.id" :workout="workout"/>
    <div class="d-flex">
      <span class="text-h6">Samples</span>
    </div>
    <workout-card-sample/>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import WorkoutCard from "~/components/WorkoutCard.vue";
import {Workout} from "~/types";

export default Vue.extend({
  name: 'WorkoutIndexPage',
  components: {WorkoutCard},
  computed: {
    ...mapGetters('workout', ['getWorkouts']),
    workouts(): Array<Workout> {
      return this.getWorkouts;
    }
  }
})
</script>

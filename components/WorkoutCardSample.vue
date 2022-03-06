<template>
  <v-card class="my-2">
    <v-card-title>
    <span class="headline">Title</span>
    </v-card-title>
    <v-card-text>
      <ul>
        <li>
          4 x Deadlift
        </li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn text color="warning">
        ADD TO YOUR TEMPLATES <v-icon right>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'WorkoutCardSample'

})
</script>

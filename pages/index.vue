<template>
  <v-container>
    <v-date-picker width="100%" :events="workoutHistory" v-model="selected" :max="today"/>
    <v-card class="mt-2">
      <v-card-title>Title</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-icon left>mdi-clock</v-icon>
            1h 12m
          </v-col>
          <v-col cols="4">
            <v-icon left>mdi-weight</v-icon>
            7000kg
          </v-col>
          <v-col cols="4">
            <v-icon left>mdi-trophy</v-icon>
            3 PRs
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      selected: new Date().toISOString().slice(0, 10),
      workoutHistory: [] as Array<string>
    };
  },
  computed: {
    today(): string {
      return new Date().toISOString().slice(0, 10);
    }
  },
  mounted() {
    this.workoutHistory = [...Array(6)].map(() => {
      const days = Math.floor(Math.random() * 10);
      const d = new Date(Date.now() - days * 86400000);
      return d.toISOString().substr(0, 10);
    })
  }
})
</script>

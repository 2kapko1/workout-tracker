<template>
  <v-dialog>
    <template #activator="{on, attrs}">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus</v-icon>
        ADD EXERCISE
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Exercises</span>
        <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </v-card-title>
      <v-list>
        <v-list-item @click="">
          <v-list-item-content>
            <v-list-item-title>
              Deadlift
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ExercisesDialog',
  data() {
    return {
      exercises: [],
    }
  },
  methods: {}
})
</script>

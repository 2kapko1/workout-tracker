<template>
  <v-dialog v-model="show" persistent scrollable>
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
        <v-btn icon @click="show=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text  style="height: 500px;padding: 0">

        <v-list>
          <v-list-item-group v-model="selected" multiple>
            <v-list-item v-for="exercise in exercises" :value="exercise" :key="exercise.id">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-icon v-if="active">mdi-check-circle</v-icon>
                  <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ exercise.name }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn outlined color="primary" @click="addExercises">
          <v-icon>mdi-plus</v-icon>
          ADD SELECTED
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from "vuex";
import {Exercise} from "~/types";

export default Vue.extend({
  name: 'ExercisesDialog',
  data() {
    return {
      show: false,
      selected: [] as Exercise[],
    }
  },
  computed: {
    ...mapGetters('exercise', ['getExercises']),
    exercises(): Exercise[] {
      return this.getExercises;
    }
  },
  watch: {
    show(n) {
      if (n) this.selected = [];
    }
  },
  methods: {
    addExercises() {
      this.$emit('addExercises', this.selected);
      this.show = false;
    }
  }
})
</script>

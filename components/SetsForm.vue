<template>
  <div>
    <v-row>
      <v-col cols="2">
        Set
      </v-col>
      <v-col cols="4">
        Reps
      </v-col>
      <v-col cols="4">
        Weight
      </v-col>
      <v-col cols="2">
      </v-col>
    </v-row>
    <set-row
      v-for="(set, index) in sets"
      :key="index"
      v-model="sets[index]"
      :number="index+1"
      @removeSet="removeSet(index)"
    />
    <div class="text-center mt-4">
      <v-btn text @click="addSet">
        <v-icon left>mdi-plus</v-icon>
        ADD SET
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Set} from '~/types';

export default Vue.extend({
  name: 'SetsForm',
  props: {
    value: {
      type: Array as PropType<Set[]>,
    },
  },
  computed: {
    sets: {
      get(): Set[] {
        return this.value;
      },
      set(sets: Set[]) {
        this.$emit('input', sets);
      },
    },
  },
  methods: {
    addSet() {
      this.sets = [...this.sets, {
        weight: null,
        reps: null,
      }];
    },
    removeSet(index: number) {
      this.sets = this.sets.filter((set, i) => index !== i);
    },
  },
});
</script>

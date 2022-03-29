<template>
  <div>
    <v-row>
      <v-col cols="2">
        Set
      </v-col>
      <v-col :cols="selectable?3:4">
        Reps
      </v-col>
      <v-col :cols="selectable?3:4">
        Weight
      </v-col>
      <v-col cols="2">
      </v-col>
      <v-col v-if="selectable" cols="2">
        <v-simple-checkbox/>
      </v-col>
    </v-row>
    <set-row
      v-for="(set, index) in sets"
      :key="index"
      :number="index+1"
      :selectable="selectable"
      :value="sets[index]"
      @input="updateSet(index, $event)"
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
    selectable: {
      type: Boolean,
      default: false,
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
    updateSet(index: any, value: Set) {
      this.sets = this.sets.map((set, i) => {
        if (index === i) return value;
        return set;
      });
    },
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

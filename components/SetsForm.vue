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
        <v-simple-checkbox @input="selectAll" :value="allSetsFinished"/>
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
      @check="select(index)"
      :selected="selected.includes(index)"
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
  data() {
    return {
      selected: [] as Number[],
    };
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
    allSetsFinished() {
      return this.sets.length > 0 && this.selected.length === this.sets.length;
    },
  },
  methods: {
    select(index: Number) {
      if (this.selected.includes(index)) {
        this.selected.splice(this.selected.findIndex(i => i === index), 1);
      } else {
        this.selected.push(index);
      }
    },
    selectAll() {
      if (this.allSetsFinished) {
        this.selected = [];
      } else {
        this.selected = [...Array(this.sets.length).keys()]
      }
    },
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

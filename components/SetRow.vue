<template>
  <v-row align="center">
    <v-col cols="2">
      {{ number }}
    </v-col>
    <v-col :cols="selectable?3:4">
      <v-text-field v-model="reps" dense hide-details solo/>
    </v-col>
    <v-col :cols="selectable?3:4">
      <v-text-field v-model="weight" dense hide-details solo suffix="kg"/>
    </v-col>
    <v-col cols="2">
      <v-btn color="error" icon @click="removeSet()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>
    <v-col v-if="selectable" cols="2">
      <v-simple-checkbox @input="$emit('check')" :value="selected"/>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Set} from '~/types';

export default Vue.extend({
  name: 'SetForm',
  props: {
    value: {
      type: Object as PropType<Set>,
    },
    number: {
      type: Number,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    weight: {
      get(): Set['weight'] {
        return this.value.weight;
      },
      set(weight: Set['weight']) {
        this.$emit('input', {...this.value, weight});
      },
    },
    reps: {
      get(): Set['reps'] {
        return this.value.reps;
      },
      set(reps: Set['reps']) {
        this.$emit('input', {...this.value, reps});
      },
    },


  },
  methods: {
    removeSet() {
      this.$emit('removeSet');
    },
  },
});
</script>

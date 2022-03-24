<template>
  <v-row align="center">
    <v-col cols="2">
      {{ number }}
    </v-col>
    <v-col cols="4">
      <v-text-field v-model="exerciseSet.reps" dense hide-details solo/>
    </v-col>
    <v-col cols="4">
      <v-text-field v-model="exerciseSet.weight" dense hide-details solo suffix="kg"/>
    </v-col>
    <v-col cols="2">
      <v-btn color="error" icon @click="removeSet()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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
  },
  computed: {
    exerciseSet: {
      get(): Set {
        return this.value;
      },
      set(set: Set) {
        this.$emit('input', set);
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

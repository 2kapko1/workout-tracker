<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="name" label="Name"/>
      </v-col>
    </v-row>
    <div class="d-flex align-center">
      <span>Exercises</span>
      <v-spacer/>
      <exercises-dialog @addExercises="addExercises"/>
    </div>

    <v-expansion-panels class="mt-4">
      <exercise-form-panel
        v-for="(exercise, index) in exercises"
        :key="index"
        v-model="exercises[index]"
        @removeExercise="removeExercise(index)"
      />
    </v-expansion-panels>

    <v-row class="mt-2">
      <v-col cols="5">
        <v-btn
          block
          color="warning"
          exact-path
          outlined
          to="/workouts"
        >
          BACK
        </v-btn>
      </v-col>
      <v-col cols="5" offset="2">
        <v-btn block color="primary" outlined @click="save">
          SAVE
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Exercise, Workout, WorkoutExercise} from "~/types";

export default Vue.extend({
  name: 'WorkoutForm',
  props: {
    workout: {
      type: Object as PropType<Workout>,
      required: false,
      default: null,
    }
  },
  data() {
    return {
      exercises: [] as Array<WorkoutExercise>,
      name: '',
    }
  },
  created() {
    if (!this.workout) return;
    this.name = this.workout.name;
    this.exercises = JSON.parse(JSON.stringify(this.workout.exercises));
  },
  methods: {
    save() {
      const workout: Workout = {
        id: this.workout?.id ?? null,
        name: this.name,
        created_at: new Date().toISOString(),
        performed_at: this.workout?.performed_at ?? null,
        exercises: this.exercises,
      }

      this.$emit('save', workout);
    },
    addExercises(exercises: Exercise[]) {
      exercises.forEach(exercise => this.addExercise(exercise))
    },
    addExercise(exercise: Exercise) {
      this.exercises.push({
        exercise: exercise,
        sets: []
      })
    },
    removeExercise(index: number) {
      this.exercises.splice(index, 1)
    },
  }
})
</script>

import {GetterTree, MutationTree, ActionTree} from 'vuex';
import {Exercise, Workout, Set} from '~/types';
import {RootState} from '~/store/index';

export const state = () => ({
  current: null as Workout | null,
});

export type CurrentWorkoutState = ReturnType<typeof state>

export const mutations: MutationTree<CurrentWorkoutState> = {
  SET_CURRENT_WORKOUT(state, workout: Workout) {
    state.current = workout;
  },
  SET_CURRENT_WORKOUT_SETS(state, {index, sets}: { index: any, sets: Set[] }) {
    if (!state.current) return;
    state.current.exercises[index].sets = sets;
  },
  ADD_SET_TO_CURRENT_WORKOUT(state, index) {
    state.current?.exercises[index].sets.push({weight: null, reps: null});
  },
  ADD_EXERCISE_TO_CURRENT_WORKOUT(state, exercise: Exercise) {
    state.current?.exercises.push({
      exercise: exercise,
      sets: [],
    });
  },
};

export const actions: ActionTree<CurrentWorkoutState, RootState> = {
  startWorkout({getters, commit, rootGetters}, id) {
    const workout = JSON.parse(JSON.stringify(rootGetters['workout/getWorkoutById'](id)));
    workout.performed_at = new Date().toISOString();
    commit('SET_CURRENT_WORKOUT', workout);
  },
  startEmptyWorkout({commit}) {
    const workout: Workout = {
      id: null,
      created_at: '',
      exercises: [],
      name: '',
      performed_at: new Date().toISOString(),
    };
    commit('SET_CURRENT_WORKOUT', workout);
  },
  addSetToCurrentWorkout({getters, commit}, id: Exercise['id']) {
    const index = getters.getExerciseIndexById(id);
    commit('ADD_SET_TO_CURRENT_WORKOUT', index);
  },
  addExercisesToCurrentWorkout({commit}, exercises: Exercise[]) {
    exercises.forEach(exercise => {
      commit('ADD_EXERCISE_TO_CURRENT_WORKOUT', exercise);
    });
  },
};

export const getters: GetterTree<CurrentWorkoutState, RootState> = {
  getCurrentWorkout: state => state.current,
  getElapsedTimeInSeconds: state => state.current?.performed_at ? Math.floor((new Date().getTime() - new Date(state.current.performed_at).getTime()) / 1000) : 0,
  getElapsedTime: (state, getters) => {
    const elapsedTimeInSeconds = getters.getElapsedTimeInSeconds;
    return ('0' + Math.floor(elapsedTimeInSeconds / 60)).slice(-2)
      + ':' + ('0' + (elapsedTimeInSeconds % 60)).slice(-2);
  },
  getExerciseIndexById: state => (id: Exercise['id']) => state.current?.exercises.findIndex(({exercise}) => exercise.id === id),
};

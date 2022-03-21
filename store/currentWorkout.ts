import {GetterTree, MutationTree, ActionTree} from 'vuex';
import {Exercise, Workout} from '~/types';
import {RootState} from '~/store/index';

export const state = () => ({
  current: {
    id: null,
    name: 'Not set',
    exercises: [],
    performed_at: null,
    created_at: '',
  } as Workout,
});

export type CurrentWorkoutState = ReturnType<typeof state>

export const mutations: MutationTree<CurrentWorkoutState> = {
  SET_CURRENT_WORKOUT(state, workout: Workout) {
    state.current = workout;
  },
  ADD_SET_TO_CURRENT_WORKOUT(state, index) {
    state.current.exercises[index].sets.push({weight: null, reps: null});
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
};

export const getters: GetterTree<CurrentWorkoutState, RootState> = {
  getCurrentWorkout: state => state.current,
  getExerciseIndexById: state => (id: Exercise['id']) => state.current.exercises.findIndex(({exercise}) => exercise.id === id),
};

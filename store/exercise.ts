import {GetterTree, MutationTree, ActionTree} from "vuex";
import {Exercise, Workout} from "~/types";
import {RootState} from "~/store/index";

export const state = () => ({
  list: [
    {id: 1, name: 'Deadlift'},
    {id: 2, name: 'Squats'},
    {id: 3, name: 'Bench press'},
  ] as Exercise[],
});

export type ExerciseState = ReturnType<typeof state>

export const mutations: MutationTree<ExerciseState> = {
  SET_EXERCISE(state, v) {
    state.list = v;
  },
  ADD_EXERCISE(state, v) {
    state.list.push(v);
  },
  REMOVE_EXERCISE(state, index) {
    state.list.splice(index, 1);
  },
};

export const actions: ActionTree<ExerciseState, RootState> = {

};

export const getters: GetterTree<ExerciseState, RootState> = {
  getExercises: state => state.list,
};

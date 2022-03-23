import {GetterTree, MutationTree, ActionTree} from 'vuex';
import {Workout} from '~/types';
import {RootState} from '~/store/index';

export const state = () => ({
  list: [] as Workout[],
});

export type WorkoutState = ReturnType<typeof state>

export const mutations: MutationTree<WorkoutState> = {
  SET_WORKOUT(state, v) {
    state.list = v;
  },
  UPDATE_WORKOUT(state, workout: Workout) {
    const index = state.list.findIndex(w => w.id === workout.id);
    state.list[index] = workout;
  },
  ADD_WORKOUT(state, v) {
    state.list.push(v);
  },
  REMOVE_WORKOUT(state, index) {
    state.list.splice(index, 1);
  },
};

export const actions: ActionTree<WorkoutState, RootState> = {
  fetchWorkouts({commit}) {
    const data: Workout =
      {
        id: 1,
        name: 'Title',
        created_at: new Date().toISOString(),
        performed_at: new Date().toISOString(),
        exercises: [
          {
            exercise: {id: 1, name: 'Deadlift'},
            sets: [
              {
                weight: 60,
                reps: 8,
              },
              {
                weight: 80,
                reps: 8,
              },
              {
                weight: 100,
                reps: 8,
              },

            ],
          },
        ],
      };

    commit('ADD_WORKOUT', data);
  },
  addWorkout({getters, commit}, workout: Workout) {
    workout.id = getters.getWorkoutMaxId + 1;
    commit('ADD_WORKOUT', workout);
  },
  editWorkout({commit}, workout: Workout) {
    commit('UPDATE_WORKOUT', workout);
  },
  copyWorkout({getters, commit}, id) {
    const item = {...getters.getWorkoutById(id)};
    item.id = getters.getWorkoutMaxId + 1;
    item.created_at = new Date().toISOString();
    item.performed_at = null;
    item.name = item.name + ' (copy)';
    commit('ADD_WORKOUT', item);
  },
  removeWorkout({getters, commit}, id) {
    const index = getters.getWorkoutIndexById(id);
    commit('REMOVE_WORKOUT', index);
  },
};

export const getters: GetterTree<WorkoutState, RootState> = {
  getWorkouts: state => state.list,
  getWorkoutById: state => (id: Workout['id']) => state.list.find(workout => workout.id === id),
  getWorkoutIndexById: (state: WorkoutState) => (id: Workout['id']) => state.list.findIndex(workout => workout.id === id),
  getWorkoutMaxId: state => state.list[state.list.length - 1]?.id ?? 0,
};

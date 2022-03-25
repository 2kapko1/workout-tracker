import {GetterTree, MutationTree, ActionTree} from 'vuex';
import {Workout} from '~/types';
import {RootState} from '~/store/index';

export const state = () => ({
  list: [
    {
      id: 1,
      name: 'Title',
      created_at: new Date().toISOString(),
      performed_at: null,
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
              reps: 6,
            },
            {
              weight: 100,
              reps: 4,
            },

          ],
        },
        {
          exercise: {id: 2, name: 'Squats'},
          sets: [
            {
              weight: 50,
              reps: 8,
            },
            {
              weight: 70,
              reps: 6,
            },
            {
              weight: 90,
              reps: 4,
            },

          ],
        },
      ],
    }
  ] as Workout[],
});

export type WorkoutSampleState = ReturnType<typeof state>

export const mutations: MutationTree<WorkoutSampleState> = {

};

export const actions: ActionTree<WorkoutSampleState, RootState> = {

};

export const getters: GetterTree<WorkoutSampleState, RootState> = {
  getWorkoutSamples: state => state.list,
};

export const state = () => ({
  list: [],
});

export const mutations = {
  list(state, v) {
    state.list = v;
  },
};

export const actions = {
  load({commit}) {
    const data = [
      {
        id: 1,
        name: 'Title',
        created_at: new Date(),
        performed_at: new Date(),
        exercises: [
          {
            name: 'Deadlift',
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
      },
    ];

    commit('list', data);
  },
};

export const getters = {
  list: state => state.list,

};

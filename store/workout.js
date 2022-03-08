export const state = () => ({
  list: [],
});

export const mutations = {
  list(state, v) {
    state.list = v;
  },
  add(state, v) {
    state.list.push(v);
  },
  remove(state, index) {
    state.list.splice(index, 1);
  },
};

export const actions = {
  load({commit}) {
    const data = [
      {
        id: 1,
        name: 'Title',
        created_at: new Date().toISOString(),
        performed_at: new Date().toISOString(),
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
  copy({getters, commit}, id) {
    const item = {...getters.find(id)};
    item.id = getters.maxId + 1;
    item.created_at = new Date().toISOString();
    item.performed_at = null;
    item.name = item.name + ' (copy)'
    commit('add', item);
  },
  remove({getters, commit}, id) {
    const index = getters.findIndex(id);
    commit('remove', index);
  },
};

export const getters = {
  list: state => state.list,
  find: state => id => state.list.find(workout => workout.id === id),
  findIndex: state => id => state.list.findIndex(workout => workout.id === id),
  maxId: state => state.list[state.list.length - 1].id,

};

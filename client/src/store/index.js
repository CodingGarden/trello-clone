import Vue from 'vue';
import Vuex from 'vuex';

import feathersVuex from './feathersVuex';

import localAuth from './localAuth';
import board from './board';

const {
  service,
  auth,
  FeathersVuex,
} = feathersVuex;

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  modules: {
    localAuth,
    board,
  },
  plugins: [
    service('users', {
      instanceDefaults: {
        username: '',
        password: '',
        displayName: '',
        imageUrl: '',
      },
    }),
    service('boards', {
      instanceDefaults: {
        name: '',
        background: '',
      },
    }),
    service('lists', {
      instanceDefaults: {
        name: '',
        order: 0,
        boardId: '',
        archived: false,
      },
    }),
    service('cards', {
      instanceDefaults: {
        title: '',
        description: '',
        order: 0,
        archived: false,
        listId: '',
        boardId: '',
        members: [],
      },
    }),
    service('activities', {
      instanceDefaults: {
        text: '',
        boardId: '',
        userId: null,
        user: 'User',
      },
    }),
    auth({
      userService: 'users',
    }),
  ],
});

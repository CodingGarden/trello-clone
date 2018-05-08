import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const {
  service,
  auth,
  FeathersVuex,
} = feathersVuex(feathersClient, {
  idField: '_id',
});

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
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
        order: '',
        boardId: '',
        archived: false,
      },
    }),
    auth({
      userService: 'users',
    }),
  ],
});

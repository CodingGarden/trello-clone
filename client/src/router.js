import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
import Boards from './views/Boards.vue';
import Board from './views/Board.vue';

import store from './store';

Vue.use(Router);

function isLoggedIn(to, from, next) {
  store.dispatch('auth/authenticate').then(() => {
    next();
  }).catch(() => {
    next('/login');
  });
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate').then(() => {
          next('/boards');
        }).catch(() => {
          next('/login');
        });
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: isLoggedIn,
    },
    {
      path: '/boards/:id',
      name: 'board',
      component: Board,
      beforeEnter: isLoggedIn,
    },
  ],
});

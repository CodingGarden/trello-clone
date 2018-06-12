import feathersVuex from 'feathers-vuex';
import feathersClient from '../feathers-client';

const {
  service,
  auth,
  FeathersVuex,
} = feathersVuex(feathersClient, {
  idField: '_id',
});

export default {
  service,
  auth,
  FeathersVuex,
};

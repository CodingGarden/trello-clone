// Initializes the `activities` service on path `/activities`
const createService = require('feathers-mongoose');
const createModel = require('../../models/activities.model');
const hooks = require('./activities.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'activities',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/activities', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('activities');

  service.hooks(hooks);
};

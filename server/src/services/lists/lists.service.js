// Initializes the `lists` service on path `/lists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/lists.model');
const hooks = require('./lists.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'lists',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/lists', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('lists');

  service.hooks(hooks);
};

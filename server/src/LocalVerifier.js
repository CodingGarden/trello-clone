const Debug = require('debug');
const {
  omit
} = require('lodash');

const debug = Debug('@feathersjs/authentication-local:verify');

const Verifier = require('@feathersjs/authentication-local/lib/verifier');

class LocalVerifier extends Verifier {
  verify(req, username, password, done) {
    debug('Checking credentials', username, password);

    const id = this.service.id;
    const usernameField = this.options.entityUsernameField || this.options.usernameField;
    const params = Object.assign({
      'query': {
        [usernameField]: username,
        '$limit': 1
      }
    }, omit(req.params, 'query', 'provider', 'headers', 'session', 'cookies'));

    if (id === null || id === undefined) {
      debug('failed: the service.id was not set');
      return done(new Error('the `id` property must be set on the entity service for authentication'));
    }

    // Look up the entity
    this.service.find(params)
      .then(response => {
        const results = response.data || response;
        if (!results.length) {
          debug(`a record with ${usernameField} of '${username}' did not exist`);
        }
        return this._normalizeResult(response);
      })
      .then(entity => this._comparePassword(entity, password))
      .then(entity => {
        const id = entity[this.service.id];
        const payload = {
          [`${this.options.entity}Id`]: id
        };

        delete entity.password;
        payload.user = entity;

        done(null, entity, payload);
      })
      .catch(error => error ? done(error) : done(null, error, {
        message: 'Invalid login'
      }));
  }
}

module.exports = LocalVerifier;

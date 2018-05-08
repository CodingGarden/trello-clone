const assert = require('assert');
const app = require('../../src/app');

describe('\'boards\' service', () => {
  it('registered the service', () => {
    const service = app.service('boards');

    assert.ok(service, 'Registered the service');
  });
});

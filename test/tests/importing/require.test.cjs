const assert = require('chai').assert;

describe('Require Test', () => {
  it('should import using require', async () => {
    const ktrUtil = require('ktr-util');
    assert.isObject(ktrUtil, 'ktrUtil should be an object');
  });
});

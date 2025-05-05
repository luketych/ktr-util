import { assert } from 'chai';

import { getFilename } from 'ktr-util'

describe('Import Test', () => {
  it('should import using import', async () => {
    assert.isFunction(getFilename, 'getFilename should be a function');
  });
});

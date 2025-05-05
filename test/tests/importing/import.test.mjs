import { assert } from 'chai';

describe('Import Test', () => {
  it('should import using import', async () => {
    const ktrUtil = await import('ktr-util').then(m => m.default);
    assert.isObject(ktrUtil, 'ktrUtil should be an object');
  });
});

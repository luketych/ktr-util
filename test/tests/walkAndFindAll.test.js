import chai from 'chai'
import { describe, it, before, after } from 'mocha'
import path from 'path'
import fs from 'fs/promises'
import { rimrafSync } from 'rimraf'

const expect = chai.expect

import {getDirname} from 'ktr-util'
import {walkUpAndFindAll} from '#src'


const dirname = getDirname(import.meta.url)
const baseTestResourcesDir = path.resolve(dirname, '..', 'test_resources') 
const testResourcesDir = path.join(baseTestResourcesDir, 'walkAndFind')


describe("Starting in given dir, walk up dirs until endDir, adding all dirs that match name.", function() {

  before(async function() {
    try {
      await fs.mkdir(path.join(testResourcesDir, 'a/b/c/d'), { recursive: true });
      await fs.mkdir(path.join(testResourcesDir, 'a/b/config'), { recursive: true });
      await fs.writeFile(path.join(testResourcesDir, 'a/b/config/config.json'), '');
      console.log('Test resources created for walkAndFindAll');
    } catch (err) {
      console.error('Error creating test resources:', err);
      throw err; 
    }
  });

  after(function() {
    try {
      console.log('Attempting synchronous cleanup...');
      rimrafSync(testResourcesDir);
      console.log('Test resources synchronously cleaned up for walkAndFindAll using rimrafSync');
    } catch (err) {
        console.error('Error cleaning up test resources with rimrafSync:', err);
    }
  });

  it("should return config folder.", async function() {
      const startDirname = path.join(testResourcesDir, 'a/b/c/d')
      const res = await walkUpAndFindAll('config', startDirname, testResourcesDir)

      expect(res).to.include(path.join(testResourcesDir, 'a/b/config'))
  })

  it("shouldn't return anything.", async function() {
      const startDirname = path.join(testResourcesDir, 'a/b/c/d')
      const res = await walkUpAndFindAll('config.json', startDirname, testResourcesDir)

      expect (res).to.have.length(0)
  })

  it("should return config/config.json file.", async function() {
      const startDirname = path.join(testResourcesDir, 'a/b/c/d')
      const res = await walkUpAndFindAll('config/config.json', startDirname, testResourcesDir)

      expect(res).to.include(path.join(testResourcesDir, 'a/b/config/config.json'))
  })

})

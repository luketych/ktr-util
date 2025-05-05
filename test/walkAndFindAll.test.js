import chai from 'chai'
import { describe, it } from 'mocha'
import path from 'path'

const expect = chai.expect

import {getDirname} from 'ktr-util'

import {walkUpAndFindAll} from '#src'


const dirname = getDirname(import.meta.url)


describe("Starting in given dir, walk up dirs until endDir, adding all dirs that match name.", function() {

  it("should..", async function() {
      const res = await walkUpAndFindAll('package.json', dirname, '/')
      console.log(res)
  })

})

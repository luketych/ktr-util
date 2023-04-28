import chai from 'chai'
import { describe, it } from 'mocha'
import path from 'path'

const expect = chai.expect

import {getDirname} from '@ktr-srt/util'

import {walkAndFindOne} from '#src'


describe("Starting in given dir, walk up dirs until file given file is found.", function() {

  it("should..", async function() {
      const dir = path.resolve( getDirname(import.meta.url) )
      const res = await walkAndFindOne('package.json', dir, '.')
      console.log(res)
  })

})

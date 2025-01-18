import chai from 'chai'
import { describe, it } from 'mocha'
import path from 'path'

import {flatten} from '#src'

const expect = chai.expect


describe("Flatten an object", function() {

  it("should flatten an object completely using __ as the separator", function() {
    const obj = {a: {b: {c: 1}}}
    const flattened = flatten(obj, {numLevelsToFlatten: 2, separator: "__"})
    expect(flattened).to.deep.equal({a__b__c: 1})
  })

  it("should flatten an object to numLevelsToFlatten=1 using __ as the separator", function() {
    const obj = {a: {b: {c: 1}}}
    const flattened = flatten(obj, {numLevelsToFlatten: 1, separator: "__"})
    expect(flattened).to.deep.equal({a__b: {c: 1}})
  })

  it("should flatten an object to numLevelsToFlatten=1 using - as the separator", function() {
    const obj = {a: {b: {c: 1}}}
    const flattened = flatten(obj, {numLevelsToFlatten: 1, separator: "-"})
    expect(flattened).to.deep.equal({"a-b": {c: 1}})
  })

  it("should flatten an object completely using . as the separator", function() {
    const obj = {a: {b: {c: 1}}}
    const flattened = flatten(obj, {numLevelsToFlatten: 2, separator: "."})
    expect(flattened).to.deep.equal({"a\\.b\\.c": 1})
  })
}) 

/* eslint-env mocha */
'use strict'

var tape = require('tape')
var tests = require('abstract-record-store/tests')
var DistributedRecordStore = require('../src')
var MerkleDAGStore = require('merkledag-store')

describe('node', function (done) {
  this.timeout(60000)
  it('follows the abstract record spec', (done) => {
    var common = {
      setup: function (t, cb) {
        var mdagStore = new MerkleDAGStore()
        var drs = new DistributedRecordStore(mdagStore)
        cb(null, drs)
      },
      teardown: function (t, cb) {
        cb()
      }
    }
    tests(tape, common)
    done()
  })
})

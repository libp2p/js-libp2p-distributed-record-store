var tape = require('tape')
var tests = require('abstract-record-store/tests')
var DistributedRecordStore = require('../src')
var MerkleDAGStore = require('merkledag-store')

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

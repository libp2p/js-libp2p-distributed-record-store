var MerkleDAGStore = require('merkledag-store')
var iprs = require('ipfs-record')
var ipld = require('ipld')
var multihashing = require('multihashing')

exports = module.exports = DRS

function DRS (mdagStore) {
  var self = this

  if (!(self instanceof DRS)) {
    throw new Error('DRS must be called with new')
  }

  self.mdagStore = mdagStore || new MerkleDAGStore()
  self.mapping = {} // {key: [recordSignatureHash]}

  self.get = function (key) {
  
  }

  // expects that recordSignature, record and pubkey mdag objs are already put in mdagStore
  self.put = function (key, recordSignature) {
    // 1. check if valid
    // 2. do the mapping
    // 3. add to other recordStores if any

    var recordSignatureMH = multihashing(ipld.marshal(recordSignature))
    iprs.validator(recordSignatureMH, self.mdagStore)

  }

}

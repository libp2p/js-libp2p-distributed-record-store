var iprs = require('ipfs-record')
var ipld = require('ipld')
var multihashing = require('multihashing')

exports = module.exports = DRS

function DRS (mdagStore) {
  var self = this

  if (!(self instanceof DRS)) {
    throw new Error('DRS must be called with new')
  }

  self.mdagStore = mdagStore
  self.mapping = {} // {key: [recordSignatureHash]}

  self.get = function (key, callback) {
    if (!self.mapping[key]) {
      return callback(null, [])
    }

    var stillValid = []
    self.mapping[key].forEach(function (recordSignature) {
      var recordSignatureMH = multihashing(ipld.marshal(recordSignature), 'sha2-256')
      var isValid = iprs.validator(recordSignatureMH, self.mdagStore)
      if (isValid) {
        stillValid.push(recordSignature)
      }
      return
    })
    self.mapping[key] = stillValid
    callback(null, stillValid)
  }

  // expects that recordSignature, record and pubkey mdag objs are already put in mdagStore
  self.put = function (key, recordSignature, callback) {
    // 1. check if valid
    // 2. do the mapping
    // 3. add to other recordStores if any

    var recordSignatureMH = multihashing(ipld.marshal(recordSignature), 'sha2-256')
    var isValid = iprs.validator(recordSignatureMH, self.mdagStore)

    if (!isValid) {
      return callback(new Error('record is not valid'))
    }

    if (!self.mapping[key]) {
      self.mapping[key] = []
    }
    self.mapping[key].push(recordSignature)

    callback()
  }
}

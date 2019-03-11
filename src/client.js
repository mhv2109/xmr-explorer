import _ from 'lodash'
import axios from 'axios'
import TTLCache from 'ttl-cache-js'

const DEFAULT_PATH = '/json_rpc'
const ttlCache = new TTLCache()

/**
 * Build the body of a JSON RPC request.
 * @private
 * @param {String} method - JSON RPC method
 * @param {Object} params - Method parameters
 * @returns {Object} JSON RPC body
 */
function buildRequestBody (method, params=null) {
  return {
    jsonrpc: '2.0',
    id: '0',
    method,
    params
  }
}

/**
 * Perform a JSON RPC request.
 * @private 
 * @param {Object} body - JSON RPC body 
 * @param {String} path - HTTP path
 * @returns {Promise} JSON RPC response
 */
async function request (body, path=DEFAULT_PATH) {
  let response = await axios.post(path, body, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.data
}

export default {
  /**
   * Get highest block known to this Daemon.
   * @returns {Number}
   */
  async getBlockCount () {
    // check cache for # blocks
    let cached = ttlCache.get('blockCount')
    if (cached != null) { 
      return cached
    }
    // get # blocks and store in cache for 1s (max poll period)
    let body = buildRequestBody('getblockcount')
    let response = await request(body)
    let result = response.result.count
    ttlCache.set('blockCount', result, 1000)
    return result
  },
  /**
   * Get block by height or hash.
   * @param {Number} height - block height
   * @param {String} hash - block hash 
   * @returns {Object}
   */
  async getBlock (height, hash) {
    let body = buildRequestBody('getblock', {
      height, hash
    })
    let response = await request(body)
    let block = response.result
    block.json = JSON.parse(block.json)
    return block
  },
  /**
   * Get block header by height.
   * @param {Number} height - block height
   * @returns {Object}
   */
  async getBlockHeaderByHeight (height) {
    let body = buildRequestBody('get_block_header_by_height', {
      height
    })
    let response = await request(body)
    return response.result.block_header
  },
  /**
   * Get block header by hash.
   * @param {Number} hash - block hash
   * @returns {Object}
   */
  async getBlockHeaderByHash (hash) {
    let body = buildRequestBody('get_block_header_by_hash', {
      hash
    })
    let response = await request(body)
    return response.result.block_header
  },
  /**
   * Get block size in bytes by height or hash.
   * @param {Number} height - block height
   * @param {String} hash - block hash 
   * @returns {Number}
   */
  async getBlockSize (height, hash) {
    let blockHeader
    if (hash != null) {
      blockHeader = await this.getBlockHeaderByHash(hash)
    } else {
      blockHeader = await this.getBlockHeaderByHeight(height)
    }
    return blockHeader.block_size
  },
  /**
   * Get last N blocks from this Daemon.
   * @param {Number} n - Number of blocks to fetch
   * @returns {Array}
   */
  async getLastNBlocks (n) {
    let nBlocks = await this.getBlockCount()
    return await Promise.all(
      _.rangeRight(nBlocks - n, nBlocks)
        .map(async (blockHeight) => {
          return await this.getBlock(blockHeight)
        })
    )
  },
  /**
   * Get last N block headers from this Daemon.
   * @param {Number} n - Number of blocks to fetch
   * @returns {Array}
   */
  async getLastNBlockHeaders (n) {
    let nBlocks = await this.getBlockCount()
    return await Promise.all(
      _.rangeRight(nBlocks - n, nBlocks)
        .map(async (blockHeight) => {
          return await this.getBlockHeaderByHeight(blockHeight)
        })
    )
  },
  /**
   * Get the coinbase ammount and the fees amount for n last blocks starting at particular height.
   * @param {Number} height - block height
   * @param {Number} count - number of blocks to include in the sum 
   * @returns {Object}
   */
  async getCoinbaseTxSum (height, count) {
    let body = buildRequestBody('get_coinbase_tx_sum', {
      height, count
    })
    let response = await request(body)
    return response.result
  },
  /**
   * Get the total tx fee amount for a given block height.
   * @param {Number} height - block height
   * @returns {Number}
   */
  async getTxFeeSum (height) {
    let result = await this.getCoinbaseTxSum(height, 1)
    return result.fee_amount
  },
  /**
   * Get the total tx fee per kb for a given block height.
   * @param {Number} height - block height
   * @returns {Number}
   */
  async getTxFee (height) {
    let fee = await this.getTxFeeSum(height)
    let size = await this.getBlockSize(height)
    return fee / (size / 1024)
  },
  /**
   * Look up one transaction by hash.
   * @param {String} hash - Transaction hash
   */
  async getTransaction (hash) {
    let response = await request({
      txs_hashes: [hash],
      decode_as_json: true
    }, '/get_transactions')
    let txs = response.txs
    txs.forEach(tx => {
      tx.as_json = JSON.parse(tx.as_json)
    })
    return txs
  },
  /**
   * Look up one or more transactions by hash.
   * @param {String} hashes - Transaction hashes
   */
  async getTransactions (...hashes) {
    let response = await request({
      txs_hashes: hashes,
      decode_as_json: true
    }, '/get_transactions')
    let txs = response.txs
    txs.forEach(tx => {
      tx.as_json = JSON.parse(tx.as_json)
    })
    return txs
  }
}
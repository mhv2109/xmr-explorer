<template>
  <div>
    <p>Blocks Analysis</p>
  </div>
</template>

<script>
import localforage from 'localforage'
import _ from 'lodash'
import client from '@/client'

/**
 * Function to get block data given the block height.
 * 
 * @param {Number} height
 * @returns {Object}
 */
async function getBlock (height) {
  let block = await client.getBlock(height)
  let block_header = block.block_header
  let coinbase = await client.getTransaction(block.miner_tx_hash)
  let tx_json = coinbase.as_json

  return {
    reward: _.divide(block_header.reward, 1e12),
    block_size: block_header.block_size,
    num_txes: block_header.num_txes,
    difficulty: block_header.difficulty,
    nonce: block_header.nonce,
    fee: _.divide(tx_json.vout[0].amount, 1e12)
  }
}

/**
 * Function to fetch data from localStorage.  If not in localStorage, fetch from
 * api.
 * 
 * @param {Number} height
 * @returns {Object}
 */
async function getBlockFromCache (height) {
  let value = await localforage.getItem('block-' + height)
  if (value) {
    return value
  }
  value = await getBlock(height)
  localforage.setItem('block-' + height, value)
  return value
}

export default {
  name: 'blocks-analysis',
  data () {
    return {
      blocks: []
    }
  },
  async created () {
    let nBlocks = await client.getBlockCount()
    this.blocks = await Promise.all(
      // trial-and-error suggests that 1000 concurrent requests is the limit
      _.range(nBlocks - 1000, nBlocks).map(async (i) => {
        let block = await getBlockFromCache(i)
        return {
          height: i,
          block
        }
      })
    )
  }
}
</script>

<style>

</style>
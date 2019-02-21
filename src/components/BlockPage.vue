<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col>
        <b-card-group>
          <b-card title="Block Info">
            <b-list-group>
              <b-list-group-item class="text-left"><strong>Height:</strong> {{ height }}</b-list-group-item>
              <b-list-group-item class="text-left"><strong>Timestamp:</strong> {{ datetime }}</b-list-group-item>
              <b-list-group-item class="text-left"><strong>Transactions:</strong> {{ num_txes }}</b-list-group-item>
            </b-list-group>
          </b-card>
          <b-card>
            <b-list-group>
              <b-list-group-item class="text-left"><strong>Difficulty:</strong> {{ difficulty }}</b-list-group-item>
              <b-list-group-item class="text-left"><strong>Block Size:</strong> {{ block_size }}</b-list-group-item>
              <b-list-group-item class="text-left"><strong>Fee Sum:</strong> {{ txFeeSum }}</b-list-group-item>
              <b-list-group-item class="text-left"><strong>Block Reward:</strong> {{ reward }}</b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col>
        <b-card-group>
          <b-card title="Coinbase Transaction">
            <data-table 
              :items="[coinbase]"
              :nItems="1"
              :pageSize="1"
              :fields="['hash', 'fee']" />
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col>
        <b-card-group>
          <b-card title="Transactions">
            <data-table
              :items="transactions"
              :nItems="num_txes"
              :pageSize="10"
              :fields="['hash', 'fee']"
              :callback="getTransactions" />
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from 'lodash'
import DataTable from '@/components/common/DataTable'
import client from '@/client'

export default {
  name: 'block-page',
  components: {
    DataTable
  },
  props: {
    height: Number
  },
  data () {
    return {
      blob: '',
      block_size: 0,
      depth: 0,
      difficulty: 0,
      hash: '',
      major_version: 0,
      minor_version: 0,
      nonce: 0,
      num_txes: 0,
      orphan_status: false,
      prev_hash: '',
      reward: 0,
      timestamp: 0,
      datetime: null,
      json: {},
      miner_tx_hash: '',
      status: '',
      untrusted: true,
      txFeeSum: 0,
      transactions: [],
      coinbase: {}
    }
  },
  async created () {
    let block = await client.getBlock(this.height)
    block = await this.formatBlock(block)

    let header = block.block_header
    delete block.block_header
    delete header.height
    
    _.keys(block).forEach(key => {
      this[key] = block[key]
    })

    _.keys(header).forEach(key => {
      this[key] = header[key]
    })

    this.$store.commit('setBreadcrumb', [
      { text: 'Blocks', href: '/#/blocks' },
      { text: `${this.height}`, href: `/#/block/${this.height}`}
    ])
  },
  methods: {
    async formatBlock (block) {
      block.block_header.datetime = this.formatTimestamp(block.block_header.timestamp)
      try {
        let fees = await client.getTxFeeSum(block.block_header.height)
        block.block_header.txFeeSum = _.divide(fees, 1e12) 
      } catch (err) {
        // typically thrown because of restricted JSON_RPC
        block.block_header.txFeeSum = 'NOT AVAIL'
      }
      return block
    },
    formatTimestamp (ts) {
      return new Date(ts*1000).toString()
    },
    formatTransaction (tx, is_coinbase=false) {
      let json = tx.as_json
      let fee = is_coinbase ? json.vout[0].amount : json.rct_signatures.txnFee
      return {
        hash: tx.tx_hash,
        fee: _.divide(fee, 1e12)
      }
    },
    async getTransactions (page, count) {
      let transactions = await client.getTransactions(...this.json.tx_hashes)
      let chunk = _.chunk(transactions, count)[page - 1]
      this.transactions = chunk.map(tx => this.formatTransaction(tx, false))

      let coinbase = await client.getTransactions(this.miner_tx_hash)
      this.coinbase = this.formatTransaction(coinbase[0], true)
    }
  }
}
</script>

<style>

</style>

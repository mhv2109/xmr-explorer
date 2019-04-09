<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col>
        <b-card-group>
          <b-card title="Transactions in Pool">
            <data-table
              :items="poolTransactions"
              :nItems="nPoolTransactions"
              :pageSize="10"
              :fields="poolFields"
              :callback="getTransactionPool"
              :selectable="true"
              :rowSelected="viewTransaction" />
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col>
        <b-card-group>
          <b-card title="Mined Transactions">
            <data-table
              :items="minedTransactions"
              :nItems="nBlocks"
              :pageSize="1"
              :fields="minedFields"
              :callback="getMinedTransactions"
              :currentPage="blockPage"
              :selectable="true"
              :rowSelected="viewTransaction" />
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import DataTable from '@/components/common/DataTable'
import client from '@/client'

export default {
  name: 'transactions-page',
  components: {
    DataTable
  },
  data () {
    return {
      poolTransactions: [],
      nPoolTransactions: 0,
      poolFields: [
        'hash',
        'receive_time',
        'heighest_used_block',
        'weight',
        'fee'
      ],
      minedTransactions: [],
      nMinedTransactions: 0,
      minedFields: [
        'block_height',
        'hash',
        'unlock_time',
        'num_signatures',
        'double_spend'
      ],
      nBlocks: 0,
      blockPage: 1
    }
  },
  async created () {
    let nBlocks = await client.getBlockCount()
    this.nBlocks = this.blockPage = nBlocks - 1

    this.$store.commit('setBreadcrumb', [
      { text: 'Transactions', href: '/#/transactions' }
    ])
  },
  methods: {
    async getTransactionPool (page, count) {
      let transactionPool = await client.getTransactionPool()
      let transactions = transactionPool.transactions
      let chunked = _.chunk(transactions, count)

      this.nPoolTransactions = transactions.size
      this.poolTransactions = chunked[page - 1].map(tx => {
        return {
          hash: tx.id_hash,
          receive_time: moment(tx.receive_time*1000).format('lll'),
          heighest_used_block: tx.max_used_block_height,
          weight: tx.weight,
          fee: _.divide(tx.fee, 1e12)
        } 
      })
    },
    async getMinedTransactions (page) {
      let block = await client.getBlock(page)
      let transactions = await client.getTransactions(
        block.miner_tx_hash, ...block.json.tx_hashes)

      this.blockPage = page
      this.nMinedTransactions = transactions.size
      this.minedTransactions = transactions.map(tx => {
        let unlock_time = tx.as_json.unlock_time
        let block_time = tx.block_timestamp
        if (unlock_time == 0) {
            unlock_time = 'Now'
        } else if (unlock_time <= block_time) {
          unlock_time = `Block ${unlock_time}`
        } else {
          unlock_time = moment(unlock_time*1000).moment('lll')
        }

        let num_signatures 
        if (tx.as_json.version == 1) {
          num_signatures = tx.as_json.signatures.length
        } else {
          num_signatures = tx.as_json.rct_signatures.length
        }

        return {
          hash: tx.tx_hash,
          block_height: tx.block_height,
          unlock_time,
          num_signatures,
          double_spend: tx.double_spend_seen
        }
      })
    },
    viewTransaction (transArray) {
      let hash = transArray[0].hash
      this.$router.push({ path: `/transaction/${hash}` })
    }
  }
}
</script>

<style>

</style>

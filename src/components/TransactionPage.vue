<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col>
        <b-card-group>
          <b-card title="Transaction Info">
            <b-list-group>
              <b-list-group-item class="text-left">
                <strong>Hash:</strong> {{ tx_hash }}
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>Block Height:</strong> {{ block_height }}
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>Block Timestamp:</strong> {{ block_datetime }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <b-card>
            <b-list-group>
              <b-list-group-item class="text-left">
                <strong>Fee:</strong> {{ fee }} XMR
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>Double Spend:</strong> {{ double_spend_seen }}
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>In Pool:</strong> {{ in_pool }}
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>Unlock Time:</strong> {{ unlock_time }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import client from '@/client'

export default {
  name: 'transaction-page',
  props: {
    hash: String,
    coinbase: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      version: null,
      unlock_time: null,
      vin: null,
      vout: null,
      extra: null,
      rct_signatures: null,
      rctsig_prunable: null,
      block_height: null,
      block_timestamp: null,
      block_datetime: null,
      double_spend_seen: null,
      in_pool: null,
      output_indices: null,
      tx_hash: null,
      fee: null
    }
  },
  async created () {
    let transaction = await client.getTransaction(this.hash)
    transaction = this.formatTransaction(transaction)

    let as_json = transaction.as_json
    delete transaction.as_json

    _.keys(transaction).forEach(key => {
      this[key] = transaction[key]
    })

    _.keys(as_json).forEach(key => {
      this[key] = as_json[key]
    })

    this.$store.commit('setBreadcrumb', [
      { text: 'Transactions', href: '/#/transactions' },
      { text: `${this.hash}`, href: `/#/transaction/${this.hash}`}
    ])
  },
  methods: {
    formatTransaction (transaction) {
      transaction.block_datetime = this.formatTimestamp(
        transaction.block_timestamp)
      
      let unlock_time = transaction.as_json.unlock_time
      if (unlock_time == 0) {
        unlock_time = 'Now'
      } else if (unlock_time <= transaction.block_timestamp) {
        unlock_time = `Block ${unlock_time}`
      } else {
        unlock_time = moment(unlock_time*1000).format('lll')
      }
      transaction.as_json.unlock_time = unlock_time

      let fee = transaction.as_json.rct_signatures.txnFee
      transaction.fee = _.divide(fee == null ?
        transaction.as_json.vout[0].amount : fee, 1e12)

      return transaction
    },
    formatTimestamp (ts) {
      return moment(ts*1000).format('lll')
    },
  }
}
</script>

<style>

</style>

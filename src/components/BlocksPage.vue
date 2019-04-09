<template>
  <b-row class="justify-content-md-center">
    <b-col>
      <b-card-group>
        <b-card title="Mined Blocks">
          <data-table
            :items="blocks"
            :nItems="nBlocks"
            :pageSize="10"
            :fields="fields"
            :callback="getBlocks"
            :selectable="true"
            :rowSelected="viewBlock" />
        </b-card>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import DataTable from '@/components/common/DataTable'
import client from '@/client'

export default {
  name: 'blocks-page',
  components: {
    DataTable
  },
  data () {
    return {
      blocks: [],
      nBlocks: 0,
      fields: [
        { key: 'height' },
        { key: 'datetime' },
        { key: 'hash' },
        { key: 'block_size' },
        { key: 'num_txes' },
        { key: 'fees' }
      ]
    }
  },
  created () {
    client.getBlockCount().then(nBlocks => {
      this.nBlocks = nBlocks
    })

    this.$store.commit('setBreadcrumb', [
      { text: 'Blocks', href: '/#/blocks' }
    ])
  },
  methods: {
    async getBlocks (page, count) {
      let topBlock = this.nBlocks
      let hiBlock = topBlock - (page - 1) * count
      let loBlock = hiBlock - count 
      loBlock = loBlock < 0 ? 0 : loBlock
      let blocks = await Promise.all(
        _.rangeRight(loBlock, hiBlock)
          .map(async (blockHeight) => {
            return await client.getBlockHeaderByHeight(blockHeight)
          })
      )
      this.blocks = await this.formatBlocks(blocks)
    },
    async formatBlocks (blocks) {
      return Promise.all(blocks.map(async block => {
        block.datetime = this.formatTimestamp(block.timestamp)
        block.block_size = block.block_size + ' B'
        try {
          let fees = await client.getTxFeeSum(block.height)
          block.fees = _.divide(fees, 1e12) + ' XMR'
        } catch (err) {
          // typically thrown because of restricted JSON_RPC
          block.fees = 'NOT AVAIL'
        }
        return block
      }))
    },
    formatTimestamp (ts) {
      return moment(ts*1000).format('lll')
    },
    viewBlock (blockArray) {
      let height = blockArray[0].height
      this.$router.push({ path: `/block/${height}` })
    }
  }
}
</script>

<style>

</style>

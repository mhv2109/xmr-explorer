<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col>
        <b-tabs>
          <b-tab title="Blocks">
            <blocks-analysis/>
          </b-tab>
          <b-tab title="Transactions">
            <transactions-analysis/>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>  
</template>

<script>
import TransactionsAnalysis from '@/components/analysis/TransactionsAnalysis.vue'
import BlocksAnalysis from '@/components/analysis/BlocksAnalysis.vue'

export default {
  name: 'analysis-page',
  components: {
    TransactionsAnalysis,
    BlocksAnalysis
  },
  created () {
    this.$store.commit('setBreadcrumb', [
      { text: 'Analysis', href: '/#/analysis' }
    ])
  }
}
</script>

<style>

</style>

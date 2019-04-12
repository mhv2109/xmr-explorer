import BlocksPage from '@/components/BlocksPage.vue'
import BlockPage from '@/components/BlockPage.vue'
import TransactionsPage from '@/components/TransactionsPage.vue'
import TransactionPage from '@/components/TransactionPage.vue'
import AnalysisPage from '@/components/AnalysisPage.vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/blocks', component: BlocksPage },
  { path: '/block/:height', component: BlockPage , props: true },
  { path: '/transactions', component: TransactionsPage },
  { path: '/transaction/:hash', component: TransactionPage, props: true },
  { path: '/analysis', component: AnalysisPage },
  { path: '*', redirect: '/blocks'}
]

export default new VueRouter({
  routes
})
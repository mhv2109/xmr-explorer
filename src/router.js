import BlocksPage from '@/components/BlocksPage.vue'
import BlockPage from '@/components/BlockPage.vue'
import TransactionsPage from '@/components/TransactionsPage.vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/blocks', component: BlocksPage },
  { path: '/block/:height', component: BlockPage , props: true },
  { path: '/transactions', component: TransactionsPage },
  { path: '*', redirect: '/blocks'}
]

export default new VueRouter({
  routes
})
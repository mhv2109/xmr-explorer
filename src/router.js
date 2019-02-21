import BlocksPage from './components/BlocksPage.vue'
import TransactionsPage from './components/TransactionsPage.vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/blocks', component: BlocksPage },
  { path: '/transactions', component: TransactionsPage },
  { path: '*', redirect: '/blocks'}
]

export default new VueRouter({
  routes
})
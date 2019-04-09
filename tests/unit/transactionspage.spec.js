import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TransactionsPage from '@/components/TransactionsPage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlocksPage.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store()
  })

  it('Renders "Transactions in Pool"', () => {
    const wrapper = shallowMount(TransactionsPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain('<b-card title="Transactions in Pool">')
  })

  it('Renders "Mined Transactions"', () => {
    const wrapper = shallowMount(TransactionsPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain('<b-card title="Mined Transactions">')
  })

})
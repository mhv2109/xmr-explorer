import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BlockPage from '@/components/BlockPage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlocksPage.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store()
  })

  it('Renders "Block Info"', () => {
    const wrapper = shallowMount(BlockPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain('<b-card title="Block Info">')
  })

  it('Renders "Coinbase Transaction"', () => {
    const wrapper = shallowMount(BlockPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain('<b-card title="Coinbase Transaction">')
  })

  it('Renders "Transactions"', () => {
    const wrapper = shallowMount(BlockPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain('<b-card title="Transactions">')
  })

})
import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TransactionPage from '@/components/TransactionPage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlocksPage.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store()
  })

  it('Renders "Transaction Info"', () => {
    const wrapper = shallowMount(TransactionPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain('<b-card title="Transaction Info">')
  })

})
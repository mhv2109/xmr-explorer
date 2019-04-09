import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import IndexPage from '@/components/IndexPage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('IndexPage.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store()
  })

  it('Renders "XMR Explorer"', () => {
    const wrapper = shallowMount(IndexPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain(
      '<b-navbar-brand>XMR Explorer</b-navbar-brand>')
  })

  it('Renders router links', () => {
    const wrapper = shallowMount(IndexPage, {
      store, localVue
    })
    const html = wrapper.html()
    expect(html).to.contain('<router-link to="/blocks">Blocks</router-link>')
    expect(html).to.contain(
      '<router-link to="/transactions">Transactions</router-link>')
  })

})

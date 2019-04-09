import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BlocksPage from '@/components/BlocksPage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlocksPage.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store()
  })

  it('Renders "Mined Blocks"', () => {
    const wrapper = shallowMount(BlocksPage, {
      store, localVue
    })
    expect(wrapper.html()).to.contain('<b-card title="Mined Blocks">')
  })

})
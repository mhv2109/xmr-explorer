import { assert } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DataTable from '@/components/common/DataTable.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DataTable.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store()
  })

  it('"created" triggers callback', () => {
    let called = false
    shallowMount(DataTable, {
      store, localVue, propsData: {
        items: [],
        callback: (page, size) => { // eslint-disable-line
          called = true
        }
      }
    })
    assert.equal(called, true)
  })

  it('Changing page triggers callback', () => {
    let nCalled = 0 
    const wrapper = shallowMount(DataTable, {
      store, localVue, propsData: {
        items: [],
        callback: (page, size) => { // eslint-disable-line
          nCalled++
        },
        currentPage: 1
      }
    })
    wrapper.vm.currentPage_ = 2
    assert.equal(nCalled, 2) 
  })

  it('Changing number of items triggers callback', () => {
    let nCalled = 0
    const wrapper = shallowMount(DataTable, {
      store, localVue, propsData: {
        items: [],
        nItems: 0,
        callback: (page, size) => { // eslint-disable-line
          nCalled++
        }
      }
    })
    wrapper.vm.nItems = 1
    assert.equal(nCalled, 2)
  })

  it('Returns "empty"', () => {
    const wrapper = shallowMount(DataTable, {
      store, localVue, propsData: {
        items: []
      }
    })
    assert.isTrue(wrapper.vm.empty)
    wrapper.vm.items = ['an item']
    assert.isFalse(wrapper.vm.empty)
  })

  it('Gets currentPage', () => {
    const wrapper = shallowMount(DataTable, {
      store, localVue, propsData: {
        items: []
      }
    })
    assert.equal(wrapper.vm.currentPage_, 1)
    wrapper.vm.currentPage_ = 2
    assert.equal(wrapper.vm.currentPage_, 2)
  })

})
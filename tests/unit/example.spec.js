import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import IndexPage from '@/components/IndexPage.vue'

describe('IndexPage.vue', () => {
  it('renders "XMR Explorer"', () => {
    const wrapper = shallowMount(IndexPage, {
      propsData: {}
    })
    expect(wrapper.text()).to.include('XMR Explorer')
  })
})

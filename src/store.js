import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumb: []
  },
  mutations: {
    /**
     * Set the breadcrum for the page.
     * @param {Object} state - vuex state
     * @param {Array} breadcrumb - Array of { path, href } Objects
     */
    setBreadcrumb (state, breadcrumb) {
      state.breadcrumb = breadcrumb
    }
  }
})

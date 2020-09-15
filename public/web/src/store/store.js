import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:false,
    openedTab: [
      {
      "icon":"el-icon-menu",
      "path":"/index",
      "title":'首页',
      "name":"index"
    }
  ],
    activeTab: ''
  },
  mutations: {
    toggleMenu (state,collapse) {
      state.isCollapse=collapse
    },
    addTab (state, component) {
      state.openedTab.push(component)
    },
    changeTab (state, component) {
      state.activeTab = component
    },
    deductTab (state, component) {
      let index = state.openedTab.findIndex(item => item.title == component.title)
      state.openedTab.splice(index, 1)
    }
  }
})
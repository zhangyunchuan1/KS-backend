export default {
  state: {
    tabs: []
  },
  getters: {
    showTabsInfo (state) {
      return state.tabs
    }
  },
  actions: {
    getTabsInfo ({commit, state}, tabs) {
      commit('getTabs', tabs)
    }
  },
  mutations: {
    getTabs (state, tabs) {
      if(tabs===null){
        state.tabs = []
      }else{
        state.tabs.push(tabs)
      }

    }
  }
}

export default {
  state: {
    user: {}
  },
  getters: {
    showUserInfo (state) {
      return state.user
    }
  },
  actions: {
    getUserInfo ({commit, state}, user) {
      commit('getUser', user)
    }
  },
  mutations: {
    getUser (state, user) {
      state.user = {
        name: user.name,
        password: user.password
      }
    }
  }
}

export default {
  state: {
    menu: {},
    select_menu:{},  //已选择的菜单及菜单下的权限信息
    role_jur:{}     //角色权限信息（角色id，角色在该菜单下的权限）
  },
  getters: {
    showMenusInfo (state) {
      return state.menu
    }
  },
  actions: {
    getMenuInfo ({commit, state}, menu) {
      commit('getMenu', menu)
    },
    getSelectMenuInfo ({commit, state}, select_menu) {
      commit('getSelectMenu', select_menu)
    },
    getSelectRoleMenuInfo ({commit, state}, role_jur) {
      commit('getSelectRoleMenu', role_jur)
    },
  },
  mutations: {
    getMenu (state, menu) {
      if(menu===null){
        state.menu = {}
      }else{
        state.menu = menu
      }

    },
    getSelectMenu (state, select_menu) {
      if(select_menu===null){
        state.select_menu = {}
      }else{
        state.select_menu = select_menu
      }

    },
    getSelectRoleMenu (state, role_jur) {
      if(role_jur===null){
        state.role_jur = {}
      }else{
        state.role_jur = role_jur
      }

    },
  }
}

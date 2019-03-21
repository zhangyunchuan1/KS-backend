import Vue from 'vue'
import vuex from 'vuex'
import user from './modules/user' // 引进模块
import tab from './modules/tab'
import menu from './modules/menu'
import frame from './modules/frame'
Vue.use(vuex)

export default new vuex.Store({
  modules: {
    user,
    tab,
    menu,
    frame
  }
})

export default {
        state: {
                frameState: {}  //浮框状态
        },
        getters: {
          showInfo (state) {
            return state.frameState
          }
        },
        actions: {
          getShowInfo ({commit, state}, i) {
            commit('getUser', i)
          }
        },
        mutations: {
          getUser (state, i) {
            state.frameState = {
                isShow:i.isShow,
                top: i.top,
                left: i.left,
                info:i.info
            }
          }
        }
      }
      
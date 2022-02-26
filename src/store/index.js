import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地数据操作模块
import {
  setItem,
  getItem
} from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})

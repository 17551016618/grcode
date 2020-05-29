import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 这是详情弹出框的数据
    show:false,
    showid:"",
    detaildata: {},
    detaildata2: [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 14:47:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 14:57:43
 * @FilePath: \vueInone\vue-demo\src\store\modules\errorLog.js
 * @Description: file content
 */
const state = {
  logs: []
}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG: (state) => {
    state.logs.splice(0)
  }
}

const actions = {
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
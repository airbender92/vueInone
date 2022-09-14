/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 14:47:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 14:57:43
 * @FilePath: \vueInone\vue-demo\src\store\modules\errorLog.js
 * @Description: file content
 */
import { MutationTree, ActionTree } from 'vuex';
import { RootState } from '../types';
import { ErrorLogState } from './types'

const state: ErrorLogState = {
  logs: []
}

const mutations: MutationTree<ErrorLogState> = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG: (state) => {
    state.logs.splice(0)
  }
}

const actions: ActionTree<ErrorLogState, RootState> = {
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
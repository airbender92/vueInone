/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 10:08:04
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 10:21:40
 * @FilePath: \vueInone\vue-demo\src\store\modules\app.js
 * @Description: file content
 */

import { MutationTree, ActionTree} from 'vuex';
import Cookies from 'js-cookie';
import { AppState, Size } from './types'
import { RootState } from '../types'

const state: AppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: (Cookies.get('size') || 'medium') as Size
}

const mutations: MutationTree<AppState> = {
  TOOGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions: ActionTree<AppState, RootState> = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
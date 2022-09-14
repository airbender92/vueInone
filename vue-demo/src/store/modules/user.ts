
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router'

import { MutationTree, ActionTree } from 'vuex';
import { RouteRecordRaw } from 'vue-router'
import { UserState } from './types';
import { RootState } from '../types'

const state: UserState = {
  token: getToken(),
  id: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations: MutationTree<UserState> = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
}

const actions: ActionTree<UserState, RootState> = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise<void>((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response: any) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then((response: any) => {
        const { data } = response;

        if (!data) {
          reject('Verification failed, please Login again')
        }

        const { roles, name, avatar, introduction, id } = data

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_ID', id)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch((error: any) => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise<void>((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise<void>(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes: RouteRecordRaw[] = await dispatch('permission/generateRoutes', roles, { root: true })
    
    // dynamically add accessible routes
    accessRoutes.forEach(route => {
      router.addRoute(route)
    })

    // reset visited views and cahced views
    dispatch('tagsView/delAllViews', null, { root: true })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
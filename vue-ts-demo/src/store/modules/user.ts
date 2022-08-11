/*
 * @Author: wangyunbo
 * @Date: 2022-07-22 08:41:22
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-27 08:57:01
 * @FilePath: \vue-ts-demo\src\store\modules\user.ts
 * @Description: file content
 */
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo} from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'

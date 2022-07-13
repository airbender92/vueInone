/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 09:47:57
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 09:56:52
 * @FilePath: \vueInone\vue-demo\src\store\getters.js
 * @Description: file content
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}

export default getters;
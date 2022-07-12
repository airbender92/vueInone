/*
 * @Author: wangyunbo
 * @Date: 2022-07-11 17:25:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-11 17:31:44
 * @FilePath: \vueInone\vue-demo\src\settings.js
 * @Description: file content
 */
module.exports = {
  title: 'Vue Element Admin',

  /**
   * @type {boolean} true | false
   * @description whether show the settings right-panel
   */
  showSetting: true,

  /**
   * @type {boolean} true | false
   * @description whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component
   * the default is only used in the production env
   * if you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
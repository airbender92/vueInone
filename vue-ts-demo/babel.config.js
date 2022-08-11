/*
 * @Author: wangyunbo
 * @Date: 2022-07-20 17:42:05
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-08-04 17:06:10
 * @Description: file content
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    ["@babel/proposal-decorators", { "legacy": true }],
    ["@babel/proposal-class-properties", { "loose": true }]
  ]
}

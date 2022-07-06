/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 11:09:41
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 11:27:38
 * @FilePath: \vueInone\OOS\sso-server\index.js
 * @Description: file content
 */
const app = require('./app');
const PORT = 3010;

app.listen(PORT, () => {
  console.info(`sso-server listening on port ${PORT}`)
})
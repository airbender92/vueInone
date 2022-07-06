/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 15:04:57
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 15:05:59
 * @FilePath: \vueInone\OOS\sso-consumer\index.js
 * @Description: file content
 */
const app = require('./app');
const PORT = 3020;

app.listen(PORT, () => {
  console.info(`sso-consumer listening on port ${PORT}`)
})
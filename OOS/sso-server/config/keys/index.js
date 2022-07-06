/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 14:20:42
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 14:23:56
 * @FilePath: \vueInone\OOS\sso-server\config\keys\index.js
 * @Description: file content
 */

const fs = require('fs');
const path = require('path');

const privateKeyFilePath =
  process.env.JWT_SSO_PRIVATE_KEY_FILE ||
  path.resolve(__dirname, "./jwtPrivate.key");

const privateCert = fs.readFileSync(privateKeyFilePath)

const jwtValidatityKey = "simple-sso-jwt-validatity";

module.exports = Object.assign(
  {},
  {
    privateCert,
    jwtValidatityKey
  }
)
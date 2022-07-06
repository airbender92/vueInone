/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 15:03:27
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 15:03:28
 * @FilePath: \vueInone\OOS\sso-consumer\config\keys\index.js
 * @Description: file content
 */
const fs = require("fs");
const path = require("path");

const publicKeyFilePath =
  process.env.JWT_CW_PLATFORM_PUBLIC_KEY_FILE ||
  path.resolve(__dirname, "./jwtPublic.key");

const publicKey = fs.readFileSync(publicKeyFilePath);

const jwtValidatityKey = "simple-sso-jwt-validatity";

module.exports = Object.assign(
  {},
  {
    publicKey,

    jwtValidatityKey
  }
);
/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 15:08:05
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 15:08:06
 * @FilePath: \vueInone\OOS\sso-consumer\jwt_verify.js
 * @Description: file content
 */
const jwt = require("jsonwebtoken");
const { publicKey } = require("./config").keys;

const ISSUER = "simple-sso";
const verifyJwtToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      { issuer: ISSUER, algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
  });
module.exports = Object.assign({}, { verifyJwtToken });
/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 14:12:15
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 14:17:44
 * @FilePath: \vueInone\OOS\sso-server\controller\jwt_helper.js
 * @Description: file content
 */
const jwt = require('jsonwebtoken')
const { privateCert } = require('../config').keys;

const ISSUER = 'simple-sso'

const genJwtToken = payload =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { ...payload },
      privateCert,
      {
        algorithm: "RS256",
        expiresIn: '1h',
        issuer: ISSUER
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token)
      }
    )
  });

module.exports = Object.assign({}, { genJwtToken })
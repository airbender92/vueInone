/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 11:28:26
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 14:07:21
 * @FilePath: \vueInone\OOS\sso-server\router\index.js
 * @Description: file content
 */
const express = require('express')

const router = express.Router();
const controller = require('../controller')

router.route('/login')
  .get(controller.login)
  .post(controller.doLogin)

router.get('/verifytoken', controller.verifySsoToken)

module.exports = router;
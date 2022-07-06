/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 15:09:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 15:15:48
 * @FilePath: \vueInone\OOS\sso-consumer\isAuthenticated.js
 * @Description: file content
 */

const isAuthenticated = (req, res, next) => {
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
  if (req.session.user === null) {
    return res.redirect(
      `http://sso.ankuranand.com:3010/simplesso/login?serviceURL=${redirectURL}`
    )
  }
  next();
};

module.exports = isAuthenticated;
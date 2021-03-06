/*
 * @Author: wangyunbo
 * @Date: 2022-07-06 15:16:40
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 16:09:16
 * @FilePath: \vueInone\OOS\sso-consumer\checkSSORedirect.js
 * @Description: file content
 */
const url = require('url');
const axios = require('axios');

const { URL } = url;
const { verifyJwtToken } = require("./jwt_verify");
const validReferOrigin = "http://sso.ankuranand.com:3010";
const ssoServerJWTURL = "http://sso.ankuranand.com:3010/simplesso/verifytoken";

const ssoRedirect = () => {
  return async function (req, res, next) {
    const { ssoToken } = req.query;
    if (ssoToken != null) {
      const redirectURL = url.parse(req.url).pathname
      try {
        const response = await axios.get(
          `${ssoServerJWTURL}?ssoToken=${ssoToken}`,
          {
            headers: {
              Authorization: "Bearer l1Q7zkOL59cRqWBkQ12ZiGVW2DBL"
            }
          }
        );
        const { token } = response.data;
        const decoded = await verifyJwtToken(token)
        req.session.user = decoded;
      } catch (err) {
        return next(err);
      }
      return res.redirect(`${redirectURL}`);
    }

    return next();
  }
}

module.exports = ssoRedirect;
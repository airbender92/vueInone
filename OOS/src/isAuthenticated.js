/*
 * @Author: wangyunbo
 * @Date: 2022-07-05 10:12:36
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-05 10:18:55
 * @FilePath: \vueInone\OOS\src\isAuthenticated.js
 * @Description: file content
 */
const isAuthenticated = (req, res, next) => {
  // simple check to see if the user is authenicated or not
  // if not redirect the user to the SSO Server for login
  // pass the redirect URL as current URL
  // ServiceURL is where the sso should redirect in case if valid user
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
  if (req.session.user === null) {
    return res.redirect(
      `http://sso.ankuranand.com:3010/simplesso/login?serviceURL=${redirectURL}`
    )
  }
  next();
}
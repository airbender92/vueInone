/*
 * @Author: wangyunbo
 * @Date: 2022-07-05 10:19:34
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-06 09:50:59
 * @FilePath: \vueInone\OOS\src\login.js
 * @Description: file content
 */
const login = (req, res, next) => {
  // the req.query will have the redirect url where we need to redirect after successful
  // login and with sso token
  // this can alse be used to verify the origin from where the request has comein
  // for the redurection
  const { serviceURL } = req.query;
  // direct access will give the error inside new URL
  if (serviceURL != null) {
    const url = new URL(serviceURL);
    if (alloweOrigin[url.origin] !== true) {
      return res.status(400).json({
        message: "You are not allowed to access the sso-server"
      })
    }
  }
  // if global session already has the user directly redirect with the token
  if (req.session.user != null && serviceURL != null) {
    const url = new URL(serviceURL);
    const intrmid = encodedId();
    storeApplicationInCache(url.origin, req.session.user, intrmid);
    return res.redirect(`${serviceURL}?ssoToken=${intrmid}`);
  }

  return res.render('login', {
    title: "SSO-Server|Login"
  })
}
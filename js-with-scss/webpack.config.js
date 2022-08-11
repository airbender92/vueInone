/*
 * @Author: wangyunbo
 * @Date: 2022-07-29 10:20:28
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-29 10:22:00
 * @Description: file content
 */
module.exports = {
  entry: 'src/index.js',
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-laoder", "css-loader", "sass-loader"]
      }
    ]
  }
}
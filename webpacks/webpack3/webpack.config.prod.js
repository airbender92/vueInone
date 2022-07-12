/*
 * @Author: wangyunbo
 * @Date: 2022-07-12 14:33:14
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 17:05:43
 * @FilePath: \vueInone\webpacks\webpack3\webpack.config.prod.js
 * @Description: file content
 */
const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    // vendor.js 包含两个厂商文件
    "vendor": ['jquery', 'analytics'],
    "indexEntry": './src/index.js',
    "profileEntry": "./src/profile.js"

  },
  output: {
    publicPath: 'assets',
    // absolute path
    path: resolve('./dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      /**
       * Webpack searches for CSS files dependencies inside the modules. That is Webpack checks to see if a JS file has “require(myCssFile.css)”. 
       * If it finds the dependency, then the Webpack gives that file first to the “css-loader”
        css-loader loads all the CSS and CSS’ own dependencies (i.e @import otherCSS) into JSON. Webpack then passes the result to “style-loader”.
        style-loader to take the JSON and add it to a style tag — <style>CSS contents</style> and inserts the tag into the index.html file.
       */
      {
        test: /\.css$/,
        use: [
          // Adds CSS to the DOM by injecting a <style> tag
          'style-loader',
          // 查找js文件是否有require|import css，解析样式导入js
          'css-loader'
        ]
      },
      /**
       * It's also important that you can specify size limit for url-loader.
       * It will automatically fall back to file-loader for all files beyond this size:
       */
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024
            }
          }
        ]
      }
    ]
  },
  plugins: [
  ],
  devServer: {
    // live reloading for the entire page
    inline: true,
    // hot module relaoding
    hot: true
  },
  resolve: {
    extensions: ['*', '.js', 'jsx']
  }
}
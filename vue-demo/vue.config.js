/*
 * @Author: wangyunbo
 * @Date: 2022-06-28 09:38:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 09:31:23
 * @FilePath: \vueInone\vue-demo\vue.config.js
 * @Description: file content
 */
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// page title
const name = defaultSettings.title || 'Vue Element Admin'

// if your port is set to 80,
// use administrator privileges to execcute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port=9527 npm run dev OR npm run dev --port=9527
const port = process.env.port || process.env.npm_config_port || 9527


module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example Github Pages, if you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/",
   * In most cases please use '/'
   */
  publicPath: '/',
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    client: {
      logging: "info",
      // Can be used only for `errors`/`warnings`
      //
      overlay: {
        errors: false,
        warnings: false,
      },
      progress: true,
    },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new PreloadWebpackPlugin({
        rel: 'preload',
        // include: 'asyncChunks'
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
       include: 'initial'
      })
    ]
  },
  chainWebpack(config) {

    // when there are many pages, it will cause too many meaningless requests
    // config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
      symbolId: 'icon-[name]'
      })
      .end()
  },
  // transpileDependencies: true,
  css: {
    // 打包时是否抽离css样式到单独文件-> true:抽离 | false: 内联
    extract: false
  }
}

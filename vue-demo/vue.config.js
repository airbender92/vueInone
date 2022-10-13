
const { defineConfig } = require('@vue/cli-service');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');

const assetsDir = './src/assets/'
const path = require('path')
const defaultSettings = require('./src/settings.js');

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


module.exports = defineConfig({
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example Github Pages, if you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/",
   * In most cases please use '/'
   * 静态资源的公有前缀
   */
  publicPath: '/',
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
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
  css: {
    loaderOptions: {
      css: {

      },
      postcss: {

      },
      less: {

      },
      scss: {
        
      }
    }
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
      }),
      new WebpackIconfontPluginNodejs({
        fontName: 'my-icons',
        cssPrefix: 'ico',
        svgs: path.resolve( './src/icons/svg/*'),
        fontsOutput: path.join(assetsDir, 'fonts/'),
        cssOutput: path.join(assetsDir, 'fonts/font.css'),
        htmlOutput: path.join(assetsDir, 'fonts/_font-preview.html'),
        jsOutput: path.join(assetsDir, 'fonts/fonts.js'),
        namesOutput: path.join(assetsDir, 'fonts/names.txt')
      })
    ]
  },
  chainWebpack(config) {
    // 让其他svg loader不对src/icons/svg进行操作
    config.module.rule('svg').exclude.add(resolve('src/icons/svg')).end();
    const iconRule = config.module.rule('icon');
    iconRule.uses.clear();
    iconRule
      .test(/.svg$/)
      .include.add(path.join(__dirname, 'src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
      symbolId: "icon-[name]"
      })
      .end()
  },
})

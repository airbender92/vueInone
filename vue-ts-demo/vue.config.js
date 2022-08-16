/*
 * @Author: wangyunbo
 * @Date: 2022-07-20 17:42:05
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-08-05 14:52:25
 * @Description: file content
 */
const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const { resolve } = require('path');
const fs = require('fs');

const devServerPort = 9527;
const mockServerPort = 9528;
const name = 'Vue Ts Admin';
// defineConfig 可以更好的上下文感知
module.exports = defineConfig({
  // 静态资源路由前缀
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-ts-admin-tempalte/' : '/vue-dev/',
  outputDir: 'dist',
  // 构建后生成的静态文件相对outputDir的目录
  assetsDir: './assets',
  // 构建后的html文件路径，相对于outputDir
  indexPath: 'index.html',

  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境资源映射，false可提高编译速度
  productionSourceMap: true,
  devServer: {
    port: devServerPort,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${mockServerPort}/mock-api/v1`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.tsx', '.ts', '.mjs', '.js', 'jsx', '.vue', '.json']
    }
  },
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [
  //       path.resolve(__dirname, 'src/styles/_variables.scss'),
  //       path.resolve(__dirname, 'src/styles/_mixins.scss')
  //     ]
  //   }
  // },
  chainWebpack(config) {


    // 通过 style-resources-loader 来添加scss全局变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
      let rule = config.module.rule('scss').oneOf(type)
      rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
           path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
        ]
      })
    })

    // `svg-sprite-loader`： 将svg图片以雪碧图的方式在项目中加载
    config.module
      .rule('svg')
      .test(/\.svg$/) // 匹配svg文件
      .include.add(resolve('src/icons/svg')) // 主要匹配src/svg
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-[name]' }) // 参数配置

    config.module.rule('images')
      .use('url-loader')
      .tap(options => ({
        name: './assets/images/[name].[ext]',
        quality: 85,
        limit: 0,
        esModule: false
    }))

    // 处理ts文件
    config.module
      .rule('ts')
      .test(/\.tsx?$/)
      .exclude
      .add(resolve('node_modules'))
      .end()
      .use('cache-loader')
      .loader('cache-loader')
      .options({
        cacheDirectory: resolve('node_modules/.cache/ts-loader')
      })
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true,
      })
    .end()

    config.plugin('html').use(HtmlWebpackPlugin).tap(args => {
      args.title = name;
      return args;
    })

    config.plugin('preload').use(PreloadWebpackPlugin).tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                elementUI: {
                  name: 'chunk-elementUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve(__dirname, 'src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
      }
    )
  },
  css: {
    extract: process.env.NODE_ENV === 'production'
  }
})

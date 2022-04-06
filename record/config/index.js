const path = require('path');

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../elm/index.html'),
    assetsRoot: path.resolve(__dirname, '../elm'),
    assetsSubDirectory: 'static',
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 8000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    context: [
      '/shopping'
    ],
    proxypath: 'http://cangdu.org.8001',
    cssSourceMap: false
  }
}
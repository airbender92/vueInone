const HtmlWebPackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
});

const vueLoaderPlugin = new VueLoaderPlugin();

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults'}]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': './src'
    }
  },
  plugins: [
    htmlPlugin,
    vueLoaderPlugin
  ]
}
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";


console.log('__dirname', path.resolve(__dirname)) // D:\study\vueInone\record\build


module.exports = {
  entry: ["./example/css-loader-example/file.js", "./example/css-loader-example/index.js"],
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: 'bundle.js',
  },
  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-app',
      template: './example/index.html',
      publicPath: './',
      favicon: './example/css-loader-example/assets/img/favicon.svg'
    })
  ].concat(devMode ? [] : [new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
    })]),

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode
            ? { loader: "style-loader", options: { attributes: { id: 'id' } } }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // publicPath: "/public/path/to/",
                    // publicPath: (resourcePath, context) => {
                    //   console.log('resourcePath: ', resourcePath);
                    //   console.log('context: ', context);
                    //   console.log('resultPath: ', path.relative(path.dirname(resourcePath), context))
                    //   return path.relative(path.dirname(resourcePath), context) + '/'
                    // },
                    emit: true, // true-构建会生成[name].css文件 | false-构建不会生成[name].css文件
                  }
              },
          {
            loader: "css-loader",
            options: {
              esModule: true,
              // modules: {
                // namedExport: true,
                // localIdentName: "foo_[name]_[local]" // 给在js文件中的css类名统一添加前缀foo_js文件名_原名
              // }
            }
            }
          
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  // devtool: 'eval-source-map'
}

// ==========================注释===============================
// https://www.edc4it.com/blog/webpack-tutorial#article
/**
 * @params entry - [String]
 * @description Requests that should resolve in the current directory need to start with './'.
    Requests that start with a name are treated as module requests and
    resolve within module directories (node_modules).
    If changing the source code is not an option there is also a resolve options called 'preferRelative' which tries to resolve these kind of requests in the current directory too.
 */

/**
 *@params css-loader
  @description The css-loader interprets @import and url() like import/require() and will resolve them.
 */

  /**
   * @params style-loader
   * @description Inject CSS into the DOM
   */


  /**
   *@params mini-css-extract-plugin
   *@description This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
   *@description loader/options/publicPath -[为在css中使用到的其他资源，譬如img等指定一个公共的自定义路径] Specifies a custom public path for the external resources like images, files, etc inside CSS. 
   Works like output.publicPath
   */

   /**
    * @param - html-webpack-plugin
    * @description The plugin will generate an HTML5 file for you that includes all your webpack bundles in the head using script tags
    * @description options/publicPath - 模板中加载的资源(js, link)提供公共路径
    */
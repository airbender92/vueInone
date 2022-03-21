const path = require('path');
console.log('__dirname', path.resolve(__dirname)) // D:\study\vueInone\record\build
module.exports = {
  entry: "./example/css-loader-example/file.js",
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {loader: "style-loader", options: { injectType: "styleTag" }},
          "css-loader",
        ]
      }
    ]
  }
}

// ==========================注释===============================
/**
 * @params entry - [String]
 * @description Requests that should resolve in the current directory need to start with './'.
                Requests that start with a name are treated as module requests and
                resolve within module directories (node_modules).
                If changing the source code is not an option there is also a resolve options called 'preferRelative' which tries to resolve these kind of requests in the current directory too.
 */
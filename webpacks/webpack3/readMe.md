<!--
 * @Author: wangyunbo
 * @Date: 2022-07-12 14:46:00
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 14:49:11
 * @FilePath: \vueInone\webpacks\webpack3\readMe.md
 * @Description: file content
-->
### PROBLEMS：

## ERROR in bundle.js from UglifyJs Unexpected token: punc (.) [bundle.js:87,18]
 Yes, UglifyJS only supports ES5 syntax. You'll need to correctly configure Babel to transform your sources down to ES5 syntax.

Since you're using Webpack 2, the bare-minumum Babel configuration that you need is:
```js
{
  "presets": [
    ["es2015", {"modules": false}]
  ]
}
```
This will require the `babel-preset-es2015` preset. Throw the above in a `.babelrc` and your `babel-loader` will take care of the rest.

Alternatively, you can try `babelify`, which is Babel's modern minifier that supports ES6 syntax. If you're targetting newever releases, I would heartily recommend.
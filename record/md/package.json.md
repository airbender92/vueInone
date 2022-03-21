## webpack-dev-server

### 一、安装
- 安装`npm install webpack-dev-server --save-dev` 推荐安装到工作目录，不要全局安装污染环境

### 二、使用
- CLI 在与webpack.config.js同级的目录下执行`npx webpack serve`

- With NPM Scripts
  ```json
  {
    "scripts": {
      "serve": "webpack serve"
    }
  }
  ```

  ## Autoprefixer
  - 解析css， 添加厂商前缀

  ### 0、Browserslist
  
  ### 一、Browsers
  Autoprefixer uses Browserslist
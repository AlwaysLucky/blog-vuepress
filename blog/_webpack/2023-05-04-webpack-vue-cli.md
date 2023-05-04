---
title: vue-cli(vue2)升级webpack5
date: 2023-05-04
tags:
  - webpack
summary: webpack vue-cli
---

## 准备

1. 删除@cli 相关的依赖
2. 新建 webpack.dev.js

```js
module.exports = env => {
  return {}
}
```

## webpack 准备

> yarn add webpack webpack-cli webpack-dev-server -D

```
"webpack": "^5.76.1",
"webpack-cli": "^5.0.1",
"webpack-dev-server": "^4.11.1"
```

## vue 准备

> yarn add vue-template-compiler@2.6.13 vue-loader@15.9.8 -D

**注意**

1. vue-template-compiler 的版本要与 vue 的版本一致
2. vue-loader@15.9.8（支持 vue2）

## css 准备

> yarn add sass sass-loader css-loader style-loader mini-css-extract-plugin postcss-loader autoprefixer -D

`mini-css-extract-plugin`是 webpack5 抽离 css 为单文件的插件

## babel 准备

> yarn add @babel/core @babel/preset-env @babel/plugin-transform-runtime -D

修改之前的`babel.config.js`,移除之前的@vue/\*\* \*/

```js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ],
    '@babel/plugin-transform-runtime'
  ]
}
```

## 配置 webpack（dev 环境）

```js
const path = require('path')
const Webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  return {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/main.js',
    devServer: {
      hot: true,
      port: 9800,
      compress: true,
      proxy: {
        '/backend/': {
          target: 'https://backend-dev.com',
          changeOrigin: true,
          pathRewrite: {
            '^/backend/': '/backend/'
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.vue', '.js'],
      modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
      mainFields: ['main']
    },
    module: {
      noParse: /^(vue|vue-router|vuex|vuex-router-sync|lib-flexible)$/,
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ]
            ]
          }
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['autoprefixer']]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                @import "@/assets/css/mixin.scss";
                @import "@/assets/css/variables.scss";
              `
              }
            }
          ]
        },
        {
          test: /\.(png|jpeg|jpg|gif)$/,
          include: path.resolve(__dirname, 'src/assets'),
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 // 4kb
            }
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ]
  }
}
```

以上配置需要根据项目实际情况配置

## 添加运行命令

package.json

```json
scripts": {
  "serve": "webpack serve --mode=development --config ./webpack.dev.js"
}
```

> yarn serve

## 遇到的问题

1. Error: Cannot find package 'babel-plugin-import' imported from D:\project\babel-virtual-resolve-base.js
    * 安装`babel-plugin-import`
2. Module parse failed: Unexpected character '@' 
    * 这个是由于没有plugins里忘了配置`VueLoaderPlugin`
3. ERROR in ./node_modules/pdfh5/js/pdf.js 10:29309-29324
Module not found: Error: Can't resolve 'http' in 'D:\project\node_modules\pdfh5\js'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "http": require.resolve("stream-http") }'
        - install 'stream-http'
If you don't want to include a polyfill, you can use an empty module like this:

  * 因为项目里没有用到http模块，可以将它关闭
  ```
    fallback: {
      http: false,
      https: false,
      zlib: false,
      url: false
    }
    ```
4.  ReferenceError: process is not defined
    * 项目里使用了process.env，而浏览器里是没有这个全局变量的
    * 需要安装`dotenv`,根据环境变量读取相应的env文件
    * plugins
      ```json
      new Webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed)
      })
      ```
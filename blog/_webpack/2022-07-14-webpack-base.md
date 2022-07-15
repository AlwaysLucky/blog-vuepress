---
title: webpack基础配置
date: 2022-07-14
tags:
  - webpack
  - webpack.config.js
summary: webpack
---

上一章我们打包了第一个应用，但是使用的是`./node_modules/.bin/webpack`来打包的

其实我们还可以用`npx webpack`来打包，与上面的命令是一样的效果，但是我们平时项目里用到的大部分是`npm build`或`yarn build`之类的命令，下面我们在package.json中配置一下

## 在package.json中添加scripts

```json
"scripts": {
  "build": "webpack"
}
```
现在可以使用`yarn build` 来打包了

到这里为止我们还没有为webpack配置任何参数，但是就可以实现打包的效果，这是因为webpack内置了很多默认配置参数,接下来我们新建一个webpack配置文件

## 新建文件webpack.config.js(如无特殊说明，默认都是根目录)

写入如下内容

```
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
* entry: 就是我们的入口文件, 只有一个入口时可以写成string，后面我们打包多页面的时候还可以写成object类型
* output: 就是我们打包后dist的配置，filename是打包后的模块文件名，`[name]`是webpack内置变量，path是node内置模块

## 配置devServer，让我们的页面跑起来

```
yarn add webpack-dev-server -D // 安装webpack-dev-server
yarn add html-webpack-plugin -D // 用来输出html
```

在webpack.config.js中做如下配置

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

devServer: {
  port: 8090,
  hot: true
},
plugins: [
  new HtmlWebpackPlugin()
]
```

## 在package.json中的scripts添加dev命令

```
"scripts": {
  "dev": "webpack-dev-server --mode=development",
  "build": "webpack"
},
```
webpack-dev-server --mode=development在启动时添加参数，开发环境下最好添加mode=development,不然会报错
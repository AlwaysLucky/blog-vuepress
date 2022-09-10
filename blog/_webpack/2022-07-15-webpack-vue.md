---
title: webpack构建Vue3项目
date: 2022-07-15
tags:
  - webpack
  - vue
summary: webpack
---

接下来我们快马加鞭构建一个vue项目来了解webpack
## 安装vue相关依赖
1. yarn add vue 
2. yarn add  @vue/compiler-sfc vue-loader -D
## 配置vue文件解析
```js
// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')
module: {
  rules: [
    {
      test: /\.vue$/,
      use: ['vue-loader']
    }
  ]
},
plugins: [
  new HtmlWebpackPlugin({
    template: './public/index.html' // 这里需要使用自定义模版文件
  }),
  new VueLoaderPlugin()
]
```
## 修改public/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack构建Vue3项目</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
## 添加vue文件
1. src -> App.vue 新建App.vue文件
```vue
<template>
  {{ msg }}
</template>

<script setup>
  const msg = 'hello vue3'
</script>
```
2. 修改index.js
之前index.js里的东西注释掉或者清空
```js
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App)
app.mount('#app')
```
## 测试vue是否正常编译
```bash
yarn dev
```
## 添加scss
1. yarn add style-loader css-loader sass-loader sass -D // 安装依赖
2. 添加loader
```js
{
  test: /\.s?css$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```
## 添加图片
1. src -> assets // src下新建文件夹 assets
2. 配置图片资源解析
```js
{
  test: /\.(png|jpg|jpeg|gif)$/,
  type: 'asset'
}
```
`webpack4`使用的是`url-loader`和`file-loader`
## 添加babel
1. yarn add @babel/core @babel/preset-env babel-loader -D
2. 配置js文件解析
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env'
          ]
        ]
      }
    }
  ]
}
```
## 目前的目录结构
```
├── node_modules
├── public
│   └── index.html
├── src
│   └── assets
│       └── dog.jpg
│   └── App.vue
│   └── index.js
├── package.json
└── yarn.lock
```
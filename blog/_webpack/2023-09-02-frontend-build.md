---
title: 前端工程化之构建
date: 2023-09-02
summary: 前端工程化之构建
---

## 为什么需要构建
- es6需要转译es5
- css预处理器
- css各种前缀
- ts需要转译
- 图片压缩
- 代码混淆
- \--------

> 构建工具早期有`grant`、`gulp`，现在有`webpack`、`rollup`、`parcel`、`vite`等等。

本章我们使用`webpack`沿用规范篇中的项目改造为vue项目

## 安装webpack
```bash
npm install webpack webpack-cli webpack-dev-server -D
```

## 解析vue

**安装**
```bash
npm install vue -S
npm install @vue/compiler-sfc vue-loader -D # 现在默认是vue3
```

**配置**

新增配置文件`webpack.config.js`
```js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

### App.vue
```vue
<!-- src/App.vue -->
<template>
  <header class="header">
    <h1>sticky footer</h1>
  </header>
  <main class="main">
    <button id="main-btn">add a item</button>
    <p>item1</p>
    <p>item2</p>
  </main>
  <footer class="footer">
    <p>i am footer</p>
  </footer>
</template>

<script setup>
</script>
```

### main.js
```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.mount('body')
```
> main.js其实就是webpack的入口

## 解析scss

**安装**

```bash
npm install style-loader css-loader sass-loader sass -D
```

**配置**
```
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

**改index.css为index.scss**
```scss
body {
  padding: 0 20px;
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  flex: 1;
  p {
    color: red;
  }
}
```

**App.vue中引入**
```vue
<style src="./index.scss" scoped></style>
```

## 添加babel

**安装**
```bash
npm install @babel/core @babel/preset-env babel-loader -D
```

**配置babel**
```
{
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]
}
```

## 自动生成html

**安装**
```bash
npm install html-webpack-plugin -D
```

**配置**

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```

## 添加clean
webpack5无需再使用`clean-webpack-plugin`
```js
module.exports = {
  output: {
    clean: true
  }
}
```

## 测试

**添加serve/build**
```json
"scripts": {
  "serve": "webpack-dev-server --mode=development",
  "build": "webpack --mode=production"
}
```
```bash
npm run serve # 开发环境
npm run build # 生产环境
```

显然本章不是针对`webpack`的专题，很多地方写的过于简陋，也没有什么优化，因为`webpack`
的文章早就烂大街了，我就不搞了，大家自行优化吧

本篇其实是为下一篇《前端工程化-自动化部署》打个基础

**项目package.json**
```json
{
  "name": "frontend-project",
  "version": "1.0.0",
  "description": "> npm install",
  "main": "index.js",
  "scripts": {
    "lint:eslint": "eslint src/**/*.css",
    "lint:style": "stylelint src/**/*.css",
    "commit": "git add . && cz && git push",
    "serve": "webpack-dev-server --mode=development",
    "build": "webpack --mode=production",
    "prepare": "husky install"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.22.11",
    "@babel/preset-env": "^7.22.14",
    "@commitlint/cli": "^17.7.1",
    "@commitlint/config-conventional": "^17.7.0",
    "@vue/compiler-sfc": "^3.3.4",
    "babel-loader": "^9.1.3",
    "commitizen": "^4.3.0",
    "css-loader": "^6.8.1",
    "cz-conventional-changelog-zh": "^0.0.2",
    "eslint": "^8.48.0",
    "eslint-config-standard": "^17.1.0",
    "eslint-plugin-import": "^2.28.1",
    "eslint-plugin-n": "^16.0.2",
    "eslint-plugin-promise": "^6.1.1",
    "html-webpack-plugin": "^5.5.3",
    "husky": "^8.0.0",
    "lint-staged": "^14.0.1",
    "sass": "^1.66.1",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "stylelint": "^15.10.3",
    "stylelint-config-standard": "^34.0.0",
    "vue-loader": "^17.2.2",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog-zh"
    }
  },
  "lint-staged": {
    "src/**/*.css": [
      "stylelint --fix"
    ],
    "src/**/*.js": [
      "eslint --fix"
    ]
  },
  "dependencies": {
    "vue": "^3.3.4"
  }
}
```
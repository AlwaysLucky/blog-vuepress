## 玩转webpack笔记

## 进阶篇
**autoprefixer**
postcss-loader autoprefixer 

**解决分辨率**
px2rem + flexible

**资源內联**
raw-loader
<!-- ${ require() } -->

**treeshaking**
mode: none // 查看
if(false) {

}

{ testA }

**source-map**

devtool: eval source-map 

**scope-hoisting**
mode: production // 默认开启
闭包包裹；作用域变多；开销大

**cdn**
html-webpack-externals-plugin // webpack4
webpack5:
  html中添加<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  webpack.config.js
    externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }


**split chunks**
分离基础库
分离公共模块 
懒加载（动态import ）

**eslint**
eslint-config-ivweb 
eslint-config-airbnb

**打包组件库**
大整数

**日志提示**
stats:
插件：friendlyerrorswebpackplugin

**ssr**

1. window/self处理
2. 模版字符串替换<!--HTML_PLACEHOLDER-->
3. 样式问题
4. 数据问题

**首屏数据处理**
1. 设置数据占位符<!--INITIAL_DATA_PLACEHOLDER-->
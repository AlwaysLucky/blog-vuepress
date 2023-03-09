## 玩转webpack笔记

## 基础篇
**为什么需要构建工具**
1. 转译ES6
2. JSX
3. css前缀/预处理器
4. 压缩混淆
5. 图片压缩


**默认配置文件**
webpack.config.js
webpack --config  // 指定配置文件

**配置组成（五大模块）**
1. entry
2. output
3. mode
4. module
5. plugin

**默认配置**
1. entry：src/index.js
2. output： dist/main.js

**默认打包**
./node_modules/.bin/webpack // webpack 指令不跟参数；


**软连接**
npm run build // 模块局部安装会在node_modules/.bin目录创建软连接

**添加scripts**
scripts: {
  "build": "webpack"
}

### entry
**单入口**
entry: "src/index.js"
**多入口（多页应用）**
entry: {
  app: '',
  home: ''
}

### output
output{
  path: path.json(__dirname, 'dist'),
  filename: '[name].js' // 多入口需要使用占位符
}

### loaders
module: {
  rules: [
    {
      test: '/.css/'
      use: 'css-loader'
    }
  ]
}
作用： webpack默认只支持js/json两种格式的解析；loaders就是用来处理webpack不能处理的文件

### plugins
用于bundle文件的优化；资源管理，环境变量注入；作用域整个构建过程
plugins: [
  new HTMLWEBPACKPLUGIN()
]

### mode
1. production // 默认
2. development
3. none 


### 基础进阶
**解析es6**
.babelrc
{
  presets: [
    '@babel/preset-env', //es6
    '@babel/preset-react' // react
  ],
  plugins: [
    @babel/proposal-class-properties
  ]
}

// presets: 一些列plugins 集合
// plugins: 对应一个个的功能

npm i @babel/core @babel/preset-env babel-loader -D

{
  modules: {
    rules: [

    ]
  }
}

**react jsx**
npm i react react-dom @babel/preset-react

**解析css**
npm i style-loader css-loader
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}
{
  test: /\.less$/,
  use: [
    'style-loader',
    'css-loader',
    'less-loader'
  ]
}

// css 內联
1. style-loader
{
  loader: 'style-loader',
  options: {
    insertAt: 'top', // 样式插入到head
    singleton: true // 所有style合并成一个
  }
}
2. html-inline-css-webpack-plugin

**图片**
{
  rules: [
    {
      test: /\.(png|jpg)/,
      use: 'file-loader'
    }
  ]
}
url-loader: 可以设置小文件 base64

{
  rules: [
    {
      test: /\.(png)/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }]
    }
  ]
}

**注意**

webpack5之后file-loader,url-loader,raw-loader统一使用：
type: "asset" | "asset-resource" | "asset-inline"
{
  test: /\.(png|jpg)/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 5 * 1024 // 5kb
    }
  }
}


output: {
    assetModuleFilename: 'img/[hash][ext][query]' // 打包到指定目录
}


**自动监听**
webpack --watch
webpack.config.js
{
  watch: true 
}


**文件指纹**
1. hash
2. Chunkhash
3. Contenthash
js使用Chunkhash
css使用Contenthash 
图片指纹使用hash

**提取css**
MiniCssExtractPlugin


**压缩**
html
css cssnano
js

### 22 章节
---
title: 前端工程化之规范
date: 2023-08-26
tags:
  - editorconfig
  - eslint
  - stylelint
  - commitlint
summary: 前端工程化之规范
---

## editorconfig
* `editorconfig`可以在不同的编辑器下使其格式统一
* `webstorm`本身就支持
* `vs code`需要安装单独的插件(EditorConfig for VS Code)

常用配置如下
```
root = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = crlf
```

## node版本管理
* 不同项目使用不同的node版本
* 解决方案：nvm

nvm命令使用
```bash
nvm install 16.18.1
nvm use 16.18.1
```

npm registry切换
```bash
# 淘宝镜像
npm config set registry https://registry.npmmirror.com/
```

## ESLint

**安装**
```bash
npm install eslint -D
```

**初始化**
```bash
npm init @eslint/config
```
这里会根据提问选择一些配置，最后生成一个.eslintrc.js（json/yml）文件，配置如下
```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
}
```

**使用**
1. 新建src/index.js，随便写点东西
```js
// 翻转字符串
const reverse = str => str.split('').reverse().join('');
reverse('hello world');
```
2. 校验
```bash
npx eslint src/index.js
# 出现如下报错
1:56  error  Extra semicolon                                semi
2:23  error  Extra semicolon                                semi
2:24  error  Newline required at end of file but not found  eol-last
```

3. 修复
```bash
npx eslint src/index.js --fix
# 自动修复后还有错误的就需要手动修复了
```

4. 集成到package.json
```json
"scripts": {
  "lint:eslint": "eslint src/**/*.js"
},
```

## Stylelint

**安装**
```bash
npm install --save-dev stylelint stylelint-config-standard
```

**创建配置文件**
.stylelintrc.json
```json
{
  "extends": "stylelint-config-standard"
}
```

**测试**
1. 新建index.html
```html
<body>
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
</body>
```
2. 新建index.css
```css
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
}
.main p {
  colorr: red;
}
```
3. 校验
```bash
npx stylelint src/index.css
# Unexpected unknown property "colorr"  property-no-unknown
```

4. 集成到package.json
```json
"scripts": {
  "lint:eslint": "eslint src/**/*.js",
  "lint:style": "stylelint src/**/*.css"
}
```

## 代码提交校验
上面的ESLint和Stylelint项目中虽然都开启了，但是如果不在代码提交时做校验，则有可能还是带着error提交的

**准备**

1. `git init frontend-project` 初始化一个git仓库
2. 可以把上面创建的那些文件移动到这里

**git hooks**

1. .git/hooks文件夹下存放着一堆hook
2. 我们可以在代码提交阶段做一些前置后置操作
3. 常见hook
    - pre-commit
    - post-update

**pre-commit**
git提交前置钩子，去除后缀.simple
```bash
#!/bin/sh
npm run lint:eslint
npm run lint:style
```
> #!/bin/sh 这一行不可省略，表示是一段shell脚本
然后在package.json中添加
```json
"scripts": {
  "lint:style": "stylelint src/**/*.css"
}
```

**测试**
```bash
git add .
git commit -m "commit 测试"
```

### husky
husky可以代替上面git hook的操作

**安装**
```bash
npm install husky -D
```

**初始化**
```bash
npx husky-init && npm install
```
执行之后生成了.husky文件夹，里面有一个pre-commit，修改pre-commit添加刚才的lint
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint:style
npm run lint:eslint
```

### lint-staged
上面的`pre-commit`已经可以完成校验工作了，但是是针对所有的文件校验的，而这货则可以只针对提交的文件做校验，所以它来了

**安装**
```bash
npm i lint-staged -D
```

**修改package.json**
```json
"lint-staged": {
  "src/**/*.css": ["stylelint --fix"],
  "src/**/*.js": ["eslint --fix"]
}
```

### commitizen
让git提交更专业

**安装**

```bash
npm install commitizen -D
```

**初始化**
```bash
npx commitizen init cz-conventional-changelog-zh --save-dev --save-exact
# cz-conventional-changelog-zh是汉化版
```
执行之后会在package.json中添加
```json
"scripts": {
  "prepare": "husky install"
},
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog-zh"
  }
}
```
当然不执行命令直接添加上面的内容也是可以的

**测试**
```bash
git add .
npx cz # 代替git commit
```

### commitlint
上面已经有了提交规范，但是你不用怎么办，不用这货就拦住你。。。

**安装**

```bash
npm install @commitlint/config-conventional @commitlint/cli -D
```

**添加commitlint.config.js**

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

**添加git commit钩子**
```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

**测试**
```bash
git add .
git commit -m "commitlint" # 不能通过
⧗   input: add commitlint
# ✖   subject may not be empty [subject-empty]
# ✖   type may not be empty [type-empty]
# 
# ✖   found 2 problems, 0 warnings
npx cz # 选择一个类型，输入内容描述之后便可正确提交
# feat(添加commitlint): commlint可真好啊😄
```

**集成**

上面的提交命令太麻烦了，可以整合成一条更方便
```json
"scripts": {
  "commit": "git add . && cz && git push",
}
```
再次提交`npm run commit`就可以了
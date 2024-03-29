---
title: HTML查漏补缺
date: 2022-11-14
tags:
  - html
summary: 复习
---

## HTML嵌套规则
1. 块级元素可以包含內联元素
2. 块级元素不一定能包含块级元素
```html
<p>
  this is p element
  <p>this is p element child</p>
</p>
```
**p**包含**p/div/section**都是不合法的
3. 內联元素不能包含块级元素（a 除外）
```html
<a>
  <div>this is correct</div>
</a>
```
**a**包含**div**是合法的

* [参考文档](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
## HTML5的更新
  ### 新增语义化标签
  header、main、footer、section、article、nav、aside ...
  ### 移除的标签
  big、center、font、frame、frameset ...
  ### 媒体标签
    1. audio
    ```html
    <audio src="" controls autoplay loop="true">
    ```
    2. video
    ```html
    <video scr="" poster="1.jpg" controls>
      <source src='aa.flv' type='video/flv'></source>
      <source src='aa.mp4' type='video/mp4'></source>
    </video>
    ```
  poster: 未播放时封面；controls: 控制面板；source: 兼容浏览器支持格式
  ### 表单
  - email
  - url
  - number
  - search: 输入框后跟一个清除的图标
  - range: 
  - color
  - time
  - date
  ### DOM查询
  1. document.querySelector
  2. document.querySelectorAll
  ### web存储
  1. sessionStorage
  2. localStorage
  ### darg/canvas
  搁置
  ### 进击的HTML
  1. 汉子拼音
  ```html
  <ruby>
    前端开发进阶
    <rt>qianduankaifajinjie</rt>
  </ruby>
  ```
  2. 展开收起
  ```html
  <details>
    <summary>前端开发核心知识进阶</summary>
    前端领域，入门简单，可是想要更上一层楼，切难上加难，市场上高级/资深前端工程师凤毛麟角。这当然未必完全是坏事，一旦突破瓶颈，在技能上脱颖而出，便是更广阔的空间，那么，如何夯实基础到突破瓶颈？
  </details>
  ```
  3. 进度条
  ```html
  <progress value="20" max="100"></progress>
  ```
  4. 度量
  ```html
  <meter value="50" min="0" max="100" low="20" high="66"></meter>
  ```

## src与href的区别

**src**
* source的缩写，指向外部资源位置；指向的内容会嵌入到标签所在位置；请求src资源时会将其指向的资源下载并应用到文档内，如：js脚本、img、iframe。
如`<script src="1.js">`请求js时，会暂停其他资源的下载与处理，直到将该资源`加载`、`编译`、`执行`完毕,这也是为什么将js放在底部的原因

**href**
* Hypertext Reference(超文本引用);它指向网络资源所在位置，建立和当前元素(锚点)或文档(链接)的链接关系。浏览器识别到它指向的文件时，会并行下载，不会停止对当前文档的处理。
这也是为什么使用link加载css，而不使用@import的原因

## HTML语义化
> 语义化是指根据内容的结构化，选择合适的标签。通俗来讲就是选择正确的标签做正确的事

**优点**
1. 对机器友好，带有语义的文字表现力丰富，利于搜索引擎爬虫爬取信息，利于SEO。 支持读屏软件，根据文章自动生成目录
2. 对开发友好，增强可读性，结构清晰，开发者能够清晰的看出结构，有利与团队开发维护

**语义化标签**
> header、main、footer、section、article、nav、aside

## DOCTYPE的作用
- **DOCTYPE**是HTML5一种标准通用标记语言的文档类型声明，目的是告诉浏览器(解析器)以什么文档类型定义来解析文档，不同的渲染模式会影响css，甚至js代码的解析。必须放在第一行。
- **DOCTYPE**不存在或格式不正确会以怪异模式渲染

## 渲染页面的两种方式
### 标准模式
`CSS1Compat`; 使用W3C标准解析渲染页面，以支持的最高标准渲染页面。（默认模式）
### 怪异模式(混杂模式)
`BackCompat`; 浏览器使用自己的怪异模式解析渲染页面，页面以一种宽松向后兼容的方式呈现
> `document.compatMode`获取当前浏览器渲染方式

## async与defer
> 都是使用异步方式加载JS文件，不会阻塞页面的解析
### 执行顺序
* defer: 并行加载，按照script标签顺序执行
* async: 并行加载，下载完立刻执行，不会按照script标签顺序执行
![@assets/browser/async-defer.png](@assets/browser/async-defer.png)
### defer的执行时机
* document.readState状态为interactive时执行。
### readState的几种状态
```js
document.addEventListener('readystatechange', event => {
	console.log(event.target.readState)
})
```
1. loading: 文档加载中，处于正在加载状态
2. interactive: 文档结束"正在加载状态"，dom可以被访问；图像，样式表等资源还在加载
3. complete: 页面所有内容都已加载

## meta标签
> meta由name,content定义，用来描述网页文档的属性，比如：网页作者，关键词，描述。除http固定了一些name，还可以自定义name
1. `<meta charset="UTF-8">` 描述HTML文档编码类型
2. `<meta name="keywords" content="关键词">` 页面关键词
3. `<meta name="description" content="描述">` 页面描述
4. `<meta http-equiv="refresh" content="60;url=page.html">` 重定向和刷新
5. `<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">` 适配移动端，控制视口大小和比例
- content值为
	1. width: 数值/device-width
	2. height: 数值/device-height
	3. initial-scale 初始缩放比例
	4. maximum-scale 最大缩放比例
	5. minimum-scale 最小缩放比例
	6. user-scale 是否允许用户缩放 yes/no
6. `<meta name="robots" content="index,follow">` 搜索引擎索引方式
- content参数
	1. all: 文件将被检索，页面上的链接可以被查询
	2. none: 不被检错，链接不可被查询
	3. index: 文件将被检索
	4. follow: 页面上的链接可被查询
	5. noindex: 文件将不被检索
	6. nofollow: 页面链接不可被查询
7. 跳转
```html
<meta http-equiv="Refresh" content="5; URL=https://www.baidu.com">
```
8. 刷新
```html
<meta http-equiv="Refresh" content="5">
```

## link（预加载）
1. **rel=dns-prefetch**；对某个域名先进行DNS解析并缓存
2. **rel=preconnect**；HTTP请求发出之前，先进行DNS解析、TCP握手、TLS协商，消除往返延迟节省时间
3. **rel=prefetch/preload**；预先下载并缓存某资源，**prefetch**可能在浏览器忙时被忽略，**preload**一定会被预先下载
4. **rel=prerender**；加载资源并进行渲染

## 移动端注意事项
1. 打电话/发短信/写邮件
```html
<a href="tel: 110">打电话给110</a>
<a href="sms: 110">发短信给110</a>
<a href="mailto: 110@govn.com">发邮件给110</a>
<a href="mailto: 110@govn.com?cc=baby@family.com&bcc=mother@family.com">发邮件给100并抄送baby，mother</a>
```

## img的srcset属性的作用
根据`srcset`的设置来选择合适的图片
```html
<img src="small.png" srcset="middle.png 50w, large.png 3x" size="(min-width: 10em) 50vw">
<!-- srcset与size结合；大于10em时显示视口一半宽 -->
```
> srcset的格式为 图片名称 数值/像素比,图片名称 数值/像素比 使用`,`分隔；
不支持srcset的情况下，使用src作为显示; w是告诉浏览器图片大致是50像素宽,并不是真是大小

## web worker?
html页面中，在执行脚本时，页面状态不可呼应；直到加载结束。worker运行在后台，独立于其他脚本，不会阻塞主线程。
```js
const worker = new Worker('worker.js')
worker.onmessage = function(event){
	const result = event.data
}
worker.postMessage('hello')
```

## 离线存储怎么使用？工作原理是什么
### 离线存储方案
1. html5 manifest(App Cache)已废弃，不推荐使用
2. Service Worker
    - 运行在主线程之外，不会阻塞渲染
    - 只支持https，也支持本地localhost
    - 页面和网络之间的拦截器角色，缓存和拦截请求
    - 拦截请求 -> 检查是否缓存过 -> 是: 使用缓存, 否: 发起请求
### 如何使用
1. 注册
```js
/*
 * 注册路径是相对于origin，不是当前js文件位置
 * /demo/serviceWorker/worker.js只能管理/demo/serviceWorker/路径下的页面和资源
 * /worker.js根路径则可以接管所以页面资源
*/
window.navigator.serviceWorker.register('/demo/serviceWorker/worker.js')
.then(function () {
	console.log('注册成功')
}).catch(err => {
	console.error("注册失败")
})
```
2. 安装和激活
```js
const CACHE_NAME = 'fed-cache'
// 注册成功之后会触发install，这里可以做一些初始化工作，也可以等在此访问的时候利用fetch做缓存
self.addEventListener('install', event => {
  // 创建和打开一个缓存库
  caches.open(CACHE_NAME)
  let cacheResources = ['/demo/serviceWorker/']
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(cacheResources)
    })
  )
})
// install之后出发active
self.addEventListener('active', event => {
  console.log('service worker is active')
})
```
3. fetch资源添加cache
```js
// 激活之后就能监听fetch事件了
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      // 命中缓存
      if (res) {
        return res
      }
      return util.fetchPut(event.request.clone())
    })
  )
})

let util = {
  fetchPut: function(request, callback) {
    fetch(request).then(response => {
      console.log('fetchPut')
      // 跨域直接return
      if(!response || response.status !== 200 || response.type !== 'basic') {
        return response
      }
      util.putCache(request, response)
      typeof callback === 'function' && callback()
      return response.clone();
    })
  },
  putCache: function(request, resource) {
    if (request.method === 'GET') {
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, resource)
      })
    }
  }
}
```
4. 添加到桌面
准备一个manifest.json文件
```json
{
  "background_color": "purple",
  "description": "test pwa",
  "display": "standalone",
  "icons": [
    {
      "src": "./icon/dog.png",
      "sizes": "192x192"
    }
  ],
  "name": "Awesome dog",
  "short_name": "dog",
  "start_url": "."
}
```
在html中引入manifest.json文件
```html
<link rel="manifest" href="manifest.json">
```
添加完成后，在地址栏中就会出现一个安装的按钮

demo: 
[https://tzhen.vip/demo/serviceWorker](https://tzhen.vip/demo/serviceWorker)
## 离线存储资源如何更新？
1. worker.js容更新，或文件名更新，会重新出发install
2. 浏览器重启时就会替换worker.js，也可以使用self.skipWaiting()跳过重启
### HTML如何更新
service worker是在html中注册的，但是如果把html也缓存了，html从缓存中取，就会导致无法更新service worker

## title与h1，b与strong，i与em的区别
* title属性没有明确意义，只表示是个标题；h1表示层次明确的标题，对页面信息抓取seo有很大影响
* b与strong都用来加粗字体；strong有语义，表示加重语气，搜索引擎侧重strong
* i与em都是用来表示斜体字体；em表示强调，有语义

## iframe有哪些优缺点
**优点：**
1. 脚本并行加载
2. ajax跨域和跨子域通信

**缺点：**
1. 阻塞主页面的onload事件
2. 无法被搜索引擎识别，不利于seo
3. iframe和主页面共享连接池，而浏览器对相同域的连接有限制，影响页面的并行加载
> 使用javascript动态给iframe添加src，可以绕过1，3


## label的作用？如何使用？
用来定义表单控件的关系，当点击label时，会自动聚焦到和label标签相关的表单控件上
```html
<!--方式1-->
<label for="input"></label>
<input id="input">
<!--方式2-->
<label for="input"><input id="input"></label>
```
for + id 表示一组有关系的控件

## canvas和svg的区别
搁置

## 浏览器乱码的原因？如何解决？
产生原因：
* 网页源代码使用gbk编码，网页是utf-8编码，这样浏览器打开即会出现html乱码，反之亦然;[https://tzhen.vip/demo/gbk.html](https://tzhen.vip/demo/gbk.html)
* html网页编码是gbk，程序从数据库中调出呈现utf-8编码的内容也会造成编码乱码
* 浏览器不能自动检测网页编码，造成网页乱码

解决办法：
* 使用编辑器编辑html
* 浏览器中找到编码菜单转换（set character encoding）

## 渐进增强与优雅降级
渐进增强：
* 针对低版本浏览器进行重构，在保证基本功能前提下，在针对高版本浏览器进行效果、交互等方面的改进和功能追加，来获得更好的用户体验

优雅降级：
* 开始就构建完整的功能，在针对低版本进行兼容

两者区别：
* 优雅降级是从复杂开始，试图减少用户体验供给；渐进增强是从基础能起作用的版本开始，在此基础上扩展，以适应未来环境的需要。

## drag api
搁置

## WEB标准和W3c标准
* [HTML Living Standard](https://html.spec.whatwg.org/multipage/#toc-semantics)
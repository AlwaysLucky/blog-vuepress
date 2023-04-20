---
title: 使用JSSDK获取地理位置
date: 2023-04-20
tags:
  - jssdk
summary: weixin
---

### 一、正确配置JSSDK
[具体配置参照微信公众号JSSDK文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
```
wx.config end
{errMsg: "config:ok", jsApiList: Array(6), openTagList: Array(0)}
```
当出现`config:ok`时配置成功

### 二、配置获取location权限
```js
wx.config({
  jsApiList: [
    'getLocation'
  ]
})
```

### 注意事项
1. 路由设置`history`模式，否则需要截取`#`前面的部分
2. 如果需要分享；`url`需要`encodeURIComponent`
3. 传输url时须是动态路由（有坑）
    1. 安卓是需要动态获取的
    2. `ios`则需要使用进入页面时使用的url；并做保存；后续都要使用此url

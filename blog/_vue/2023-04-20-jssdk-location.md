---
title: 使用JSSDK获取地理位置
date: 2023-04-20
tags:
  - jssdk
summary: weixin
---

### 正确配置JSSDK
[具体配置参照微信公众号JSSDK文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
```
wx.config end
{errMsg: "config:ok", jsApiList: Array(6), openTagList: Array(0)}
```
当出现`config:ok`时配置成功

### 注意事项
1. 路由设置`history`模式，`hash`模式需要截取`#`前面的部分
2. 传输url时须是动态路由（有坑）
    1. `IOS`要获取首次进入是的`url`，并存储已备后续使用
    2. `Android`需要动态获取`url`
3. 对url参数做`encodeURIComponent`
    1. 复杂参数还需要进行`base64`或其他加密传输
      * 如：&model=iPhone X (GSM+CDMA)<iPhone10,3>iOS 16.0.2
      * 上述问题在传参手机型号时，一直出现`invalid signature`，最终进行`base64`传输解决

### 配置获取location权限
```js
wx.config({
  jsApiList: [
    'getLocation'
  ]
})
```
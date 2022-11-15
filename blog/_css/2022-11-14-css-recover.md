---
title: css review
date: 2022-11-15
tags:
  - css
summary: css review
---


## 移动端1px的问题
### 像素知识了解
- 误区：1px=1物理像素；这是一个错误的认知；因为桌面浏览器上大多数是这样，所以产生了误解
- 认识：1px是css单位；物理像素指设备分辨率：1980*1080；640*960
- dpr：设备像素比；retina屏出现之后；由于分辨率变大而屏幕尺寸没有变大；所以就出现了DPR = 分辨率/设备屏幕尺寸
### 1px问题出现的原因
以DRP=2为例，由于屏幕尺寸没有发生变化，而像素确多了一倍；所以此时1px=2物理像素













## display:none与visibility:hidden
- 渲染： 渲染树；占据空间
- 继承： 继承与非继承；设置visibility:visible显示的原因；渲染树中存在
- 重排/重绘：常规流display->文档重排；visibility本元素重绘
- 读屏设备：忽略display:none; 读取visibility:hidden
## link与@import
- 兼容：link出现更早，兼容性更好
- 从属关系：link属于html标签，不仅加载css，还可以定义RSS等；@import时css语法规则，用于导入样式
- 加载顺序：link并行加载；@import页面加载完成之后加载
- @import还会发起http请求
> 总体上link优于@import
## BFC
搁置
## 层叠上下文
搁置












## position:absolute
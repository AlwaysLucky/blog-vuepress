---
title: css review
date: 2022-11-15
tags:
  - css
summary: css review
---


## 移动端1px的问题
移动端设置1px而实际情况要比1px粗一点
### 像素知识了解
- 误区：1px=1物理像素；这是一个错误的认知；因为桌面浏览器上大多数是这样，所以产生了误解
- 认识：1px(px)是css单位；物理像素指设备分辨率：1980`*`1080；640`*`960
- dpr：设备像素比；retina屏出现之后；由于分辨率变大而屏幕尺寸没有变大；所以就出现了DPR = 分辨率/设备屏幕尺寸
### 1px问题出现的原因
1. retina屏出现之后；设备屏幕像素密度越来越高；出现了2倍3倍屏；
2. 手机尺寸却没有发生变化，但是分辨率却提高了一倍，即像素多了一倍，此时1px(css)=2/3/4倍物理像素
3. 以dpr=2为例；1px(css像素) = 1drp / 2; 这就是设计稿为什么以2倍为基准的原因(750*1334)
4. 所以设计稿上的1px;换算css之后就是0.5px
5. 移动端基本上又是以rem来适配，1px换算之后得到的数值又不尽相同(小数),而移动端对小数像素处理存在极大的兼容性问题
### 解决
```css
.border::after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border: 1px solid;
  transform: scale(0.5);
  transform-origin: 0 0;
}
```
实现单边1px与上述方法类似；不再展示代码
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
Block Formatting Context: 块级格式化上下文；
css世界的结界：内部形成一个封闭空间，里面的元素不会影响到外面
### 创建BFC
1. 根元素html
2. overflow: scroll, auto, hidden
3. position: absolute, fixed
4. display: table-cell, table-caption, inline-block
5. floag的值不为none
## 层叠上下文
搁置
## position:absolute相对于哪个元素定位
非static的父级元素；sticky是否有影响还需再研究。
## block\inline-block\inline

## 隐藏元素的方法
## 单行多行文本溢出
## 伪元素伪类
## 预处理器、后处理器
## 判断元素是否达到可视区域
## line-height

## 场景应用：
1. 三角形
2. 扇形
3. 小于12px字体

## 浮动
清除浮动的原理？clear: both
由于clear只对块级元素有效；所以伪元素清除浮动需设置display: table;
```css
.clear::after{
  content: '';
  display: table;
  clear: both;
}
```
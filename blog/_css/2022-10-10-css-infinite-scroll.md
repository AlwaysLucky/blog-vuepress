---
title: css实现无缝滚动
date: 2022-10-10
tags:
  - css
summary: css
---

## 效果
![http://tzhen.vip/assets/infinite.gif](http://tzhen.vip/assets/infinite.gif)
## 如何实现？
通过上图可以发现，滚动中内容犹如长江之水连绵不绝，而这其中的奥秘就是把内容主体复制了一份，再通过`transform`实现滚动
## 实现
1. 需要有一个定高的容器
2. 滚动的内容主体copy一份
3. 使用css3动画translateY向上移动(-50%)做动画
4. 利用css3无限循环即可实现无限滚动
## 分析
- 因为内容高度现在是原来的2倍 所以50%刚好就是之前的内容高度
- 如果出现抖动问题请检查`margin`设置使用`padding`代替
## 核心代码
```css
.rowup {
  -webkit-animation: 12s rowup linear infinite normal;
  animation: 12s rowup linear infinite normal;
}
@keyframes rowup {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}
```
## demo
[https://tzhen.vip/demo/css-infinite-scroll.html](https://tzhen.vip/demo/css-infinite-scroll.html)
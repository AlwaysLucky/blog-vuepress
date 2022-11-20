---
title: flex查漏补缺
date: 2022-11-17
tags:
  - flex
summary: flex查漏补缺
---

## 先来分析一道题
```html
<div class="flex">
  <div class="flex-child">1</div>
  <div class="flex-child">2</div>
  <div class="flex-child">3</div>
</div>
```
```css
.flex{
  display: flex;
  width: 800px;
  outline: 1px solid red;
}
.flex-child{
  height: 100px;
}
.flex-child:nth-of-type(1) {
  width: 100px;
  flex: 2 1 0%;
}
.flex-child:nth-of-type(2) {
  width: 100px;
  flex: 2 1 auto;
}
.flex-child:nth-of-type(3) {
  flex: 1 1 200px;
}
```
请问1/2/3的宽度都是多少？
### 分析
1. flex三个值都是什么？
    - flex-grow: 分配剩余空间的比例；默认值：0
    - flex-shrink: 剩余空间不足时缩小比例；默认值：1
    - flex-basis: 分配剩余空间之前，项目占据的空间。默认值：auto

2. 这里的剩余空间是多少？
    - 800-100-200=500;因为0%其实就是0
    - 在flex-basis不时auto时候，width其实是不生效的，也就是摆设
3. 剩余500；按比例分配就好了
    - 第一个：500/(2+2+1) = 100, 100*2=200
    - 第二个：500/(2+2+1) = 100, 100*2=200 + 100(width)
    - 第三个：500/(2+2+1) = 100, 100*1=100 + 200(200px)
> 所以最后结果是: 200 300 300
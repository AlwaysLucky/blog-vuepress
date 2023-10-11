---
title: flex查漏补缺
date: 2022-11-17
tags:
  - flex
summary: flex查漏补缺
---

## flex单值语法
1. flex: initial = flex: 0 1 auto
2. flex: 0 = flex: 0 1 0%
3. flex: none = flex: 0 0 auto
4. flex: 1 = flex: 1 1 0%
5. flex: auto = flex: 1 1 auto

## 分析1/2/3各占的宽度是多少
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
  background-color: darkblue;
}
.flex-child:nth-of-type(2) {
  width: 100px;
  flex: 2 1 auto;
  background-color: olive;
}
.flex-child:nth-of-type(3) {
  flex: 1 1 200px;
  background-color: aqua;
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
    - 在flex-basis不为auto时候，width其实是不生效的，也就是摆设
3. 剩余500；按比例分配就好了
    - 第一个：500/(2+2+1) = 100, 100*2=200
    - 第二个：500/(2+2+1) = 100, 100*2=200 + 100(width)
    - 第三个：500/(2+2+1) = 100, 100*1=100 + 200(200px)
> 所以最后结果是: 200 300 300
### 空间不足时怎么分配？
现在稍微修改一下
```css
.flex{
  width: 300px;
}
// 为了方便计算, 我们为第一项分配固定18px
.flex-child:nth-of-type(1){
  flex: 2 0 18px;
}
```
现在总空间只有300px, 1占了18px，2占了100px，3占了200px,320px该如何分配
### 空间不足分析
1. `1`分配固定的18，则剩余282
2. 现在`2`和`3`加起来是300，300>282，没有多余空间
3. 现在需要flex-shrink出场了，就是flex的第二个值
4. `2`和`3`的flex-shrink都是1；则表示按1:1分配
5. `2`和`3`分别占100和200，就是1:2，也就是多着多出
5. 300-282=18；18/3=6，6*2=12
6. 100-6=94；200-12=188
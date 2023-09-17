---
title: CSS查漏补缺
date: 2022-11-15
tags:
  - css
summary: CSS查漏补缺
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
- 渲染： display:none: 不在渲染树中，不占空间；visibility:hidden：存在渲染树中，占据空间
- 继承： 继承与非继承；设置visibility:visible显示的原因；渲染树中存在
- 重排/重绘：常规流修改display会触发文档重排；visibility在本元素触发重绘
- 读屏设备：忽略display:none; 读取visibility:hidden
## link与@import
- 兼容：link出现更早，兼容性更好
- 从属关系：link属于html标签，不仅加载css，还可以定义RSS等；@import是css语法规则，用于导入样式
- 加载顺序：link并行加载；link混合@import会破坏并行加载，导致原本的并行加载变成同步下载
- 只使用link可以按顺序并行加载
> 总体上link优于@import
## BFC
Block Formatting Context: 块级格式化上下文；
css世界的结界：内部形成一个封闭空间，里面的元素不会影响到外面
### 创建BFC
1. 根元素html
2. overflow: scroll, auto, hidden
3. position: absolute, fixed
4. display: table-cell, table-caption, inline-block
5. display: flex/grid的直接子元素
6. float的值不为none
## 层叠上下文
是HTML中的一个三维的概念。如果一个元素含有层叠上下文，则比不具有层叠上下文的层级要高。
### 创建层叠上下文
1. 根层叠上下文`<html>`元素
2. position: relative/absolute; 且z-index: 数值
3. position: fixed;
4. CSS3中的层叠上下文
    - 父元素display:flex/inline-flex, 子元素z-index: 数值
    - opacity值不是1
    - transform值不是none
    - mix-blend-mode值不是normal
    - filter值不是none
### 层叠水平
![层叠水平](https://img0.baidu.com/it/u=2071015463,1032901003&fm=253&fmt=auto&app=138&f=PNG?w=570&h=500)
### 层叠顺序
同一层叠上下文下：
* 具有层叠水平的元素；层叠水平值大的在最上面
* 水平相同情况下后来者覆盖前者
## position:absolute相对于哪个元素定位
position: static|relative|absolute|fixed|sticky
> 非static的父级元素都可以限制absolute范围，包括它自己
## block\inline-block\inline

## 隐藏元素的方法
### 文本
1. text-ident: -99999px; // 设置足够大的值
2. color: transparent
### element
1. display: none
2. visibility: hidden
3. clip: react(0,0,0,0)
## 单行多行文本溢出
### 单行
```css
.单行溢出 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
/* 
  1. 上述代码只适用块级元素
  2. white-space: 控制空白字符排版问题；nowrap: 空白符合并，换行符无效；值还有: normal、pre、pre-line、pre-wrap
  3. overflow: hidden; 必须要配合white-space: nowrap；才能生效
  4. 内联元素还需设置display: block/inline-block + width; 这样overflow:hidden,white-space:nowrap；才生效
*/
```
> class名称使用中文是支持的，你没有看错
### 多行
```css
.多行溢出 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
```
## 伪元素与伪类
1. 伪类表状态
2. 伪元素是真实元素（内容元素前后插入额外的元素），但不在文档中生成
3. `:`表示伪类，`::`表示伪元素；
4. 由于早期css伪元素与伪类都是`:`表示，css3规定了`::`表示伪元素，使用`:`是为了兼容旧版本浏览器（单双冒号的区别）
## 预处理器、后处理器
**PostCss可以做什么**
1. 取决于插件可以做什么
2. autoprefixer cssnext precss等
3. import模块合并
4. css语法检查 兼容性检查
5. 压缩文件

**css modules**
1. 解决类名冲突问题
2. 使用PostCss或者webpack等构件工具进行编译
3. 在HTML模版中使用编译过程产生的类名

## 判断元素是否达到可视区域
## line-height
### 高度是谁决定的
```
<div class="l1">line-height 1</div>
<div class="l2">line-height 2</div>
<div class="l3"></div>

.l1{
  line-height: 0
}
.l2,.l3{
  line-height: 20px
}
```
* l1 高度为0
* l2 高度为20px
* l3高度为0
> line-height只能作用于內联元素；所以l3高度为0；l1虽然有内容，但是受line-height作用；高度也为0
### 內联元素的line-height
1. 非替换纯內联元素的高度完全由line-height决定（文本）
2. 內联元素的高度由固定高度和行距决定
    - 行距：在css中，行距在文本的上方下方
    - 计算行距：(line-height - font-size)
### line-height的值
1. normal：因字体的不同具体值也不同，所以需要重置normal
2. 数值：1.5；计算规则：1.5 * font-size
3. 百分比：150%；计算规则：150% * font-size
4. 长度值：20px；1.5em = 1.5 * font-size；(em是相对font-size的相对单位)
### line-height与vertical-align
```html
<style>
  .box { line-height: 32px; }
  .box > span { font-size: 24px; }
</style>
<div class="box">
  <span>天真</span>
</div>
```
此时的box高度并不是40px;此时已出现幽灵空白节点；所以box的高度是40px;而span的高度也是40px;但是由于span的字体设置了24px;而box默认的字体是16px；24px与16px明显无法在基线上对其；所以产生了位移；而位移值够大的话就会出现box高度偏大的情况
#### 解决
1. 方法一：span设置vertical-align: top // 改变对齐位置
2. 方法二：box设置font-size: 24px // 字号与span一致

#### 区别
1. 对于数值；子元素会继承数值
2. 对于百分比或长度；则会继承最终的计算值
## 场景应用：
1. 三角形
2. 扇形
3. 小于12px字体

## 浮动
清除浮动的原理？clear: both
> 由于clear只对块级元素有效；所以伪元素清除浮动需设置display: table/block;
```css
.clear::after{
  content: '';
  display: table;
  clear: both;
}
```
## 圣杯与双飞翼
[https://tzhen.vip/demo/web/my-app/layout.html](https://tzhen.vip/demo/web/my-app/layout.html)

## 选择器分类
1. 元素选择器
2. 伪元素选择器
3. 类选择器
4. 属性选择器
5. 伪类选择器
6. ID
7. 组合
8. 否定:not()
9. 通用选择器

## css选择器的优先级
1. 0级：通配符、选择符、逻辑组合伪类
    - 通配符： *
    - 选择符：+ > ~ 空格
    - 逻辑组合伪类：:not() :is() :where
2. 1级：标签
3. 2级：类、属性、伪类
4. 3级： ID
5. 內联`<style></style>`
6. `!important`
### 选择器优先级计算规则：数值计算法
| 选择器 | 计算值 |
|--------|--------|
| *      | 0      |
| 标签   | 1      |
| class  | 10     |
| ID     | 100    |
> .box > a.item:hover = 10 + 1 + 10 + 10
### 优先级不可越级
比如11个class计算值是110；但是优先级还是不能大于ID

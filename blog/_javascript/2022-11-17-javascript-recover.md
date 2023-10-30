---
title: JavaScript查漏补缺
date: 2022-11-17
tags:
  - javascript
summary: JavaScript查漏补缺
---

## 暂时性死区
> ES6规定，如果区块中存在let和const命令，声明变量的区块从一开始就形成封闭区域。声明之前使用这些变量就会报错

```js
var num = 0
{
  num = 1
  let num = 0
}
```
## 数据类型
### 基本类型
    - string
    - number
    - boolean
    - null
    - undefined
    - symbol
    - bigInt
- 存储位置：栈
- 存储特性：占用空间小，大小固定，操作频繁
- 效果：赋值后，不存在引用关系
### 引用类型
      - object(Array, Function, Math, Regexp)
- 存储位置：堆
- 存储特性：数据量大，大小不固定，赋值是赋址(地址)
- 效果：赋值后，存在引用关系
### 类型转换
#### 转字符串
    - String(null) // 'null'
    - String(undefined) // 'undefined'
    - String(true) // 布尔值 'true' 'false'
    - String(123) // '123', 大数值 => 指数形式
    - String(Symbol()) // 'Symbol()'
    - String({}) // '[object Object]'
#### 转数字
    - Number(null) // 0
    - Number(undefined) // NaN
    - Number(true) // 1, 0
    - Number('123') // 123, '指数形式'
    - Number('012') // 12 忽略前导0
    - Number('123a') // 包含非数字 NaN
    - Number({}) // valueOf() ? NaN : toString()
#### 转布尔
    - undefined | null | false | +0 -0 | '' | NaN => false
    - 除以上情况，都为true
### NaN与Number.isNaN
```js
isNaN(NaN) // true
Number.isNaN(NaN) // true

isNaN('a') // true
Number.isNaN('a') // false
```
> isNaN存在的问题：非数字会尝试转换数字，如果不能转换，则返回true

## 执行上下文
1. `全局执行上下文`：执行JS前就已创建
2. `函数执行上下文`：函数执行前创建
3. `eval`：使用场景有限，不做讨论
### 执行上下文的三个属性
1. 变量对象(VO: variable object)； 包含变量、函数声明、函数形参；
2. 作用域链(JS采用词法作用域: 就是说作用域在定义时就确定好了)
3. `this`
### 用代码分析
```js
var a = 20;
function bar() {
  console.log(a);
}
function foo(fn) {
  var a = 10;
  fn();
}
foo(bar); // 20
```
> 上述代码分别存在：全局执行上下文、bar函数执行上下文、foo函数执行上下文；fn其实是bar的引用，所以bar=fn
* 多个执行上下文如何管理->执行上下文栈
```js
// 执行函数以前只有globalContext
stack = [
  globalContext
]
// 执行函数foo；发现要执行fn函数，移交控制权到fn
stack = [
  fooContext, // 创建foo上下文，压入执行栈
  globalContext
]
// 执行函数fn
stack = [
  barContext, // 创建bar上下文，压入执行栈；fn是bar的引用
  fooContext, // 创建foo上下文，压入执行栈
  globalContext
]
// fn执行完毕 barContext出栈
stack = [
  fooContext,
  globalContext
]
// foo执行完毕，fooContext出栈
stack = [
  globalContext
]
// 执行全局代码 globalContext直到程序退出
```
### 变量对象(VO)
不同的执行上下文有不同的变量对象。
```js
// global VO
globalContext.VO = global // 全局上下文中的VO是全局对象this(this = window)
globalContext.VO = {
  a: undefined,
  bar: undefined,
  foo: undefined
}

// 函数foo VO
fooContext.VO = AO
fooContext.VO = {
  arguments: {
    0: 'fn',
    length: 1
  },
  a: undefined, // 激活AO之后会赋值
  fn: pointer to function bar,
  scope: undefined,
  this: globalContext.VO
}
/*
 * 对于函数来说，VO用AO(Active Object)表示；因为进入一个执行上下文中，这个变量对象才被激活，属性才能被访问。函数的VO是不能访问的
 * arguments是函数独有的对象，箭头函数没有
 * arguments是伪数组，有length属性且通过下标访问
 * arguments.caller：调用者，arguments.callee函数本身
*/

// 函数bar VO
barContext.VO = AO
barContext.VO = {
  arguments: {},
  scope: undefined,
  this: globalContext.VO
}
```
> 普通函数的`this`都是指向全局对象(非严格模式下)
### 作用域链
> 查找变量时，先在自己执行上下文中查找，如果没有找到，再到上级执行上下文中查找，最后到全局上下文中查找; 这样由多个执行上下文的变量对象构成的链表就叫作用域链
- 函数声明时，内部会绑定`[[scope]]`内部属性;
```js
// 可以理解为包含自身变量对象和上级变量对象的列表
foo.[[scope]] = [globalContext.VO]
fooContext.scope = [
  fooContext.VO,
  foo.[[scope]]
]
```
### 再来分析一下上面代码的结果
执行fn时，其实就是执行bar，此时bar函数的执行上下文没有a变量，则去全局上下文中查找，所以找到了20

## 原型、原型链与继承
这一块比较抽象，直接用代码来分析
### 原型
```js
function Person() {}
```
* 函数Person的原型是什么？--`Person.__proto__ === Function.prototype`这个就叫做函数Person的原型
* 每一个函数都有`prototype`，它的值是一个对象
* `prototype`中又有一个`constructor`,它指向函数本身。Person.prototype.constructor === Person
### 原型链
原型链的主角是`__proto__`，又叫做隐式原型(因为看不见)，接着修改下上面的代码
```js
function Person(name) {
  this.name = name
}
Person.prototype.running = function() {
  console.log(this.name + 'is running')
}
const p = new Person('tianzhen')
p.running()
```
关于new一个function可以参考另一篇文章[new 一个函数内部发生了什么](/js/2022/08/22/new-function/)
* 为什么p.running可以运行?
1. 每一个**对象**都有__proto__属性，它指向创建该对象的函数的prototype
2. 即`p.__proto__ === Person.prototype`
3. 如果一个属性在自己内部找不到就会去原型上找,running方法在Person.prototype找到
* Person函数有没有__proto__？，指向哪里？
1. 函数也是对象，所以它也有`__proto__`
2. 上面说到`__proto__`指向创建该对象的函数的prototype
3. 那么是谁创建了Person? -- `Function`
4. 即`Person.__proto__` === `Function.prototype`
* 像`apply`,`call`这些方法就是在Function.prototype中定义的，所以可以直接使用
```js
Function.prototype.hasOwnProperty('apply') // true
// 唯一一个__proto__指向自身的prototype, 函数自己创建了自己
Function.__proto__ === Function.prototype
// Function.prototype是函数，但是Function.prototype__proto__=Object.Prototype，据说是为了兼容旧ECMAScript
typeof Function.prototype === 'function' 
```
### 继承
见另一篇[继承的几种方式](/js/2022/11/24/jicheng/)

## 事件
### 事件类型
1. 鼠标类
- click
- dbclick
- mousedown 按下未弹起
- mouseup 鼠标弹起
- mousemove 移动
- mouseover 移动到元素上方
- mouseenter 首次从外部移入目标元素上方
- mouseleave 移除
2. 键盘类
- keydown 键盘按下任意键
- keyup 按键收起
- keypress 按下任意字符，按住不放会一直触发
3. HTML类型
    1. 表单
        - select 选择文本框(text/textarea)一个或多个字符触发
        - change
        - input
        - focus
        - blur
        - submit
        - reset
    2. 窗口
        - load
        - unload
        - resize
        - scroll
### 事件传播
1. 传播类型
    - 冒泡：由内而外，粒度从细到粗
    - 捕获: 由外而内，粒度从粗到细
2. 事件流
捕获阶段 => 目标触发阶段 =>  冒泡阶段
> 阻止冒泡: stopPropagation

### 事件绑定
1. dom0级事件
    - 行内绑定
2. dom2级事件
    - addEventListener
    - removeEventListener
> dom2级 > dom0级

## {} 与 Object.create
1. {}创建空对象，原型指向**Object.prototype**
2. **Object.create**创建空对象，原型指向传入的参数，没有则为**null**



## 跨域 
页面间跨域
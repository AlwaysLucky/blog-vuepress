---
title: JavaScript查漏补缺
date: 2022-11-17
tags:
  - javascript
summary: JavaScript查漏补缺
---

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
> 上述代码分别存在：全局执行上下文、bar函数执行上下文、foo函数执行上下文；fn其实时bar的引用，所以bar=fn
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
```js
function Person() {}
```
* 函数Person的原型是什么？---- `Person.prototype`这个就叫做函数Person的原型
* 每一个函数都有`prototype`，它的值是一个对象
* `prototype`中又有一个`constructor`,它指向函数本身。Person.prototype.constructor === Person
### 原型链
原型链的主角是`__proto__`，又叫做隐式原型，接着修改下上面的代码
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
* 





















## 事件机制

## 渲染机制 
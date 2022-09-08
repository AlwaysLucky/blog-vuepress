---
title: 函数七重关(JavaScript百炼成仙)
date: 2022-08-21
tags:
  - function
summary: JavaScript百炼成仙
---

## 七重关之一（函数定义）
### 函数定义(一)
```javascript
function foo() {
  console.log('JavaScript百炼成仙')
}
```
### 定义函数(二)
```javascript
var foo = function() {
  console.log('JavaScript百炼成仙')
}
```
与第一种的区别
1. 函数赋值给变量foo，调用：foo()
2. 在声明foo之前，不可以调用foo()
### 定义函数(三)：书中没有写
```javascript
var foo = function bar() {
  console.log('JavaScript百炼成仙')
}
```
看似鸡肋，实则在特殊场景有用武之地(替代arguments.callee)
### 定义函数(四)：书中没有写
```javascript
var foo = new Function()
```
这种定义函数的方式极为罕见，不建议使用
## 七重关之二（作用域）
1. 全局作用域
2. 函数作用域
```javascript
function test() {
  console.log(a)
  var b = 20
}
var a = 10
test()
console.log(b)
```
* a和test变量暴露在外面，属全局作用域
* test函数{}内属函数作用域，函数作用域内可以访问到上层作用域变量，反之则不可以
* 所以`console.log(b)`会报错
## 七重关之三（参数传递）
```javascript
function foo(a, b, c) {
  var sum = a + b +c
}
```
* foo(a, b, c) 可以近似理解为在函数体内声明了 var a, b, c
* 如果少传了参数，则默认为undefined
* foo(1): 1 + undefined + undefined = NaN
* 参数可以使用arguments接收, 是一个类数组, es6以后更推荐使用剩余参数
## 七重关之四（闭包）
```javascript
function test() {
  var a = 0;
  return function(increment) {
    console.log(a + increment)
  }
}
test()(1) // 1
test()(1) // 2
```
闭包产生的条件
1. 函数内部也有一个函数
2. 内部函数用到了外部函数的变量
3. 外部函数把内部函数作为返回值return
作用：不会随着原函数销毁而销毁，重复调用的话会发现a变量一直在累加
* 阮一峰：闭包就是能够读取其他函数内部变量的函数
* MDN: 闭包让开发者可以从内部函数访问外部函数的作用域，在JavaScript中，随着函数的创建而被同时创建
## 七重关之五（自执行）
```javascript
(function() {
  console.log(123)
})()
```
这只是其中的一种，下面是书里没有讲到的
```javascript
!function() {
  console.log(123)
}()
// ! + - 都是可以的，这与javascript的解析规则有关
```
与闭包配合
```javascript
var inner = (function() {
  var a = 0
  return function(increment) {
    a = a + increment
    console.log(a)
  }
})()
```
## 七重关之六（new 一个函数）
```javascript
function  hello() {
  console.log(this)
}
```
* `this`是javascript的关键字
* `this`永远指向函数的调用者(this铁律)
* `this`要么不出现，出现就一定在函数中
* 全局作用域下，变量、函数都属于window，hello()又可以写成window.hello(),window['hello']()
* 严格模式下hello()中的this是undefined，并不是window
下面看一下new 一个函数
```javascript
function Hello() {
  console.log(this)
}
new Hello()
```
* 这种方式又叫构造函数
这里讲的比较粗略，详细见[new 一个函数内部发生了什么](/js/2022/08/22/new-function/)
## 七重关之七（回调函数）
> 回调函数：函数做参数传递给另一个函数
```javascript
function eat(food, callback) {
  callback(food)
}
eat('饺子', function(food) {
  console.log('今天晚上吃' + food)
})
```
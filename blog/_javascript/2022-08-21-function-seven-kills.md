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
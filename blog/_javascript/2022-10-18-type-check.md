---
title: 类型检测的几种方法
date: 2022-10-18
tags:
  - type
summary: 类型检测
---

## JavaScript中有几种数据类型？
1. String
2. Number
3. Boolean
4. undefined
5. null
6. Symbol
7. BigInt
8. Object
    1. Function
    2. Regexp
    3. Math
    4. Date
    5. Array
## typeof
```javascript
typeof '1' // "string"
typeof 1 // "number"
typeof true // "boolean"
typeof 100n // "bigint"
typeof undefined // "undefined"
typeof null // "object"
typeof function(){} // "function"
typeof {} // "object"
typeof [] // "object"
typeof new Date() // "object"
```
### typeof的问题
1. 引用数据类型除了`function`可以正常检测，其他结果都是object
2. `typeof null === object`这是一个历史悠久的bug
## instanceof
```javascript
function Person(name) {
  this.name = name
}
const p = new Person('tianzhen')
p instanceof Person // true
[] instance Array // true
{} instance Object // true
1 instanceof Number // false
```
> `instanceof`判断规则：左边是否是右边的实例，p的原型链上是否存在Person的构造函数

推荐阅读：[深入理解javascript原型和闭包（5）——instanceof](https://www.cnblogs.com/wangfupeng1988/p/3979533.html)
### instanceof的问题
1. 只能检测对象类型
2. 如果在iframe中使用instanceof检测父窗口的数据类型存在bug
## constructor
```javascript
(1).constructor // ƒ Number() { [native code] }
'1'.constructor // ƒ String() { [native code] }
true.constructor // ƒ Boolean() { [native code] }
Symbol('1').constructor // ƒ Symbol() { [native code] }
[].constructor // ƒ Array() { [native code] }
{}.constructor // ƒ Object() { [native code] }
(function(){}).constructor // ƒ Function() { [native code] }
undefined.constructor // Uncaught TypeError: Cannot read properties of undefined (reading 'constructor')
null.constructor // Uncaught TypeError: Cannot read properties of null (reading 'constructor')
```
> 可以使用`constructor.name`拿到函数名
### constructor的问题
1. 不能检测`undefined`,`null`
## Object.prototype.toString.call
```javascript
Object.prototype.toString.call(1) // '[object Number]'
Object.prototype.toString.call('') // '[object String]'
Object.prototype.toString.call(true) // '[object Boolean]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call({}) // '[object Object]'
Object.prototype.toString.call(Symbol('')) // '[object Symbol]'
Object.prototype.toString.call(null) // '[object Null]'
Object.prototype.toString.call(Undefined) // '[object Undefined]'
```
> `Object.prototype.toString.call`可以完美解决以上存在的问题，所以也有人称为类型检测的终极方案
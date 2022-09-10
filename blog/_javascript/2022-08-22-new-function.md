---
title: new 一个函数内部发生了什么
date: 2022-08-22
tags:
  - new function
summary: new
---

## new 一个函数内部发生了什么
```javascript
// 构造函数约定成俗首字母大写
function Person(name) {
  // 1. const p = {}
  // 2. p.__proto__ = Person.prototype
  // 3. this = p
  this.name = name
  // 4. return this
}

const p1 = new Person()
```
1. 创建一个新的对象
2. 这个对象的`__proto__`(隐式原型，并不是规范，但浏览器有实现)指向函数的prototype
3. 这个对象赋值给this
4. 把`this`返回
> 这样设计其实与原型、原型链有着密不可分的关系，封装、继承都要借助它们
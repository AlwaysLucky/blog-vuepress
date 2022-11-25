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
  // 3. const obj = Person.call(p, name) // this绑定到p
  // 4. return obj
}
const p1 = new Person()
```
1. 创建一个新的对象
2. 这个对象的`__proto__`(隐式原型)指向函数的`prototype`(继承)
3. 执行构造函数，同时构造函数中的`this`指向这个新对象
4. `构造函数返回值是一个新对象，则返回该对象，无返回值或返回值不为object，则返回`1`创建的这个对象`
<!-- > 这样设计其实与原型、原型链有着密不可分的关系，封装、继承都要借助它们 -->

## 模拟new实现
```js
function Person(name) {
  this.name = name
}
function newFn(fn, ...args){
  if (typeof fn !== 'function') {
    throw new Error('fn is not a function')
  }
  const constructor = fn
  const obj = Object.create(constructor.prototype)
  const result = constructor.apply(obj, args)
  if(result && typeof result === 'object') {
    return result
  }
  return obj
}
const n = newFn(Person, 'tianzhen')
console.log(n)
```
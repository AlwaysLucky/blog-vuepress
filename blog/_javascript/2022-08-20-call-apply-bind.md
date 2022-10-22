---
title: call、apply、bind的实现
date: 2022-08-20
tags:
  - 手写系列
summary: call、apply、bind
---

## call
```javascript
Function.prototype.tcall = function(thisArg, ...args) {
  let fn = this; // 拿到要执行的函数
  let _thisArg = (thisArg === undefined || thisArg === null) ? window : Object(thisArg) // 得到包装对象
  _thisArg.fn = fn;
  let result = _thisArg.fn(...args) // 使用扩展运算符
  delete _thisArg.fn
  return result
}

function foo(a, b) {
  return a + b
}

const result = foo.call({name: 'tianzhen'}, 2, 4)
console.log('result==========================', result)
```
## apply
apply与call只是传参不同，这里就不再实现了
## bind
```javascript
Function.prototype.tbind = function(thisArg, ...orignArgs) {
  const fn = this
  const _thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)
  return function(...sourceArgs) {
    _thisArg.fn = fn
    const result = _thisArg.fn(...[...orignArgs, ...sourceArgs])
    delete _thisArg.fn
    return result
  }
}

function foo(a, b, c, d) {
  return a + b + c + d
}

const bar = foo.tbind({name: 'tianzhen'}, 1, 2, 3)
const result = bar(4)
console.log('result2==========================', result)
```
### bind存在的问题
> 上面的实现只适用普通函数，不能作为构造函数使用
```js
function Person(name) {
  this.name = name
}
Person.prototype.say = function() {
  console.log(this.name)
}
const obj = {
  age: 20
}
const bindPerson = Person.tbind(obj, 'tianzhen')
const b = new bindPerson()
console.log(b.name) // undefined
console.log(obj.say()) // 报错
```
## 添加构造函数
```js
Function.prototype.tbind = function(thisArg, ...orignArgs) {
  const fn = this
  let _thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)
  function bound(...sourceArgs) {
    this instanceof bound && (_thisArg = this) // 构造函数时改变this
    _thisArg.fn = fn
    const result = _thisArg.fn(...[...orignArgs, ...sourceArgs])
    delete _thisArg.fn
    return result
  }
  bound.prototype = Object.create(fn.prototype) // 继承
  return bound
}
```
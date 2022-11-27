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
1. bind还可以作为构造函数使用，会忽略绑定的this
2. bind柯里化
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
const bindPerson = Person.tbind(obj, 'tianzhen') // 返回的是一个匿名函数
const b = new bindPerson() // Person函数没有返回值，所以b是一个默认空对象
console.log(b.name) // undefined
console.log(obj.say()) // 报错(找不到say方法)
```
## 完善bind
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
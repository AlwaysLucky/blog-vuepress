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
### 存在的问题
```js
const b = new bar(4)
console.log(b instanceof foo) 
```
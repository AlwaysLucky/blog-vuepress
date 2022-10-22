---
title: instanceof的实现
date: 2022-10-19
tags:
  - 手写系列
summary: instanceof
---

![原型图](http://tzhen.vip/assets/prototype.png)
> 这张图对原型、原型链、继承的理解非常重要
## instanceof的判定规则
```js
function Person(name) {
	this.name = name
}
const p = new Person('tianzhen')
p instanceof Person // true
p instanceof Object // true
```
等价于
* `p.__proto__ === Person.prototype`
* `p.__proto__.__proto__ === Object.prototype`
> 如果查不到就到原型的原型查找，一直到原型链的顶端
## 实现1
```js
function _instanceof(Left, Right) {
	if( typeof Left !== 'object' || Left === null) {
		return false
	}

	while(true){
		if(Left === null) {
			return false
		}
		if(Left.__proto__ === Right.prototype) {
			return true
		}
		Left = Left.__proto__
	}
}
```
> `__proto__`并不是标准
## 实现2
```js
function _instanceof(Left, Right) {
	if(typeof Left !== 'object' || Left === null) {
		return false
	}

	let L = Object.getPrototypeOf(Left)
	while(true){
		if(L === null) {
			return false
		}
		if(L === Right.prototype) {
			return true
		}
		L = Object.getPrototypeOf(L)
	}
}
```
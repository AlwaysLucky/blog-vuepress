---
title: 自执行函数有多少种写法
date: 2022-08-24
tags:
  - function
summary: function
---
## 先来看一个例子
```javascript
// 1
(function() {
  console.log('hahaha')
})()
```
> 上面的函数为什么可以自动执行？
## 再来看一下下面的几种方式
```javascript
// 2
(function() {
  console.log('hahaha')
}());
// 3
!function () {
  console.log('ha')
}();
// 4
~function () {
  console.log('he')
}()
```
## 为什么function(){}()不可以？
```javascript
// 5
const foo = function() {
  console.log('foo')
}
foo() // 这样可以执行函数
// foo只是函数的引用，那下面的为什么不可以
// 6
function() {
  console.log('foo')
}()
// 7
function foo() {
  console.log('foo')
}()
// 8
function foo() {
  console.log('foo')
}(1)
// 9
function foo() {
  console.log('foo')
}
(1)
```
## 分析
1. 前面几种都是表达式，而第6种是函数声明
2. 解析阶段会解释函数声明，而忽略表达式
3. 执行6会默认为这是函数声明，因缺少函数名而报错
4. 加上函数名执行7依然会报错，语句后面加()，表示分组操作，而分组操作符需要包含表达式
5. 加上表达式执行8依然会报错，因为8等价于9
## 总结
* `function(){}()` // 是函数声明，后面跟()是分组
* 要执行就需要转为表达式
* ()分组操作符将里面的内容转为表达式，如`1`就是将函数转为表达式，表达式会求解得到返回值，返回值函数加()就可以执行了
* 而函数转为表达式不一定要用分组()，还可以使用~ ! + -都是可以的

## 参考
[Tom大叔的博客](https://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html)
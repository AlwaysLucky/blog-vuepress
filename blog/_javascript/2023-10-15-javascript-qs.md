---
title: JS知识盲区
date: 2023-10-15
summary: JavaScript
---

## 函数与变量重复声明
```javascript
console.log(foo);
function foo(){
  console. log ("foo") ;
}
var foo = 1:

function fnVar(a = 10) {
  console.log(a)
  var a = 'abc'
}
fnVar(30)
```
打印的是函数、30，而非undefined

> 进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性·
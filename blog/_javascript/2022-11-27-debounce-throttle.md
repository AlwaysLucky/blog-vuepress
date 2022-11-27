---
title: 防抖&节流
date: 2022-11-27
tags:
  - 手写系列
summary: 防抖和节流
---

## 防抖
1. 基础版
```js
function debounce(fn, delay = 500) {
  let timeId = null

  const _debounce = function(...args) {
    if (timeId) clearTimeout(timeId)

    timeId = setTimeout(() => {
      fn.apply(this, args)
      timeId = null
    }, delay)
  }

  return _debounce
}
```
2. 添加立即执行
```js
function debounce(fn, delay = 500, immediate = false) {
  let timeId = null
  let execImmediate = immediate

  const _debounce = function(...args) {
    if (timeId) clearTimeout(timeId)
    if(execImmediate) {
      fn.apply(this, args)
      execImmediate = !immediate
      return
    }

    timeId = setTimeout(() => {
      fn.apply(this, args)
      timeId = null
      execImmediate = immediate
    }, delay)
  }

  return _debounce
}
```
3. 添加取消
```js
function debounce(fn, delay = 500, immediate = false) {
  let timeId = null
  let execImmediate = immediate

  const _debounce = function(...args) {
    if (timeId) clearTimeout(timeId)
    if(execImmediate) {
      fn.apply(this, args)
      execImmediate = !immediate
      return
    }

    timeId = setTimeout(() => {
      fn.apply(this, args)
      timeId = null
      execImmediate = immediate
    }, delay)
  }

  _debounce.cancel = function() {
    timeId && clearTimeout(timeId)
    timeId = null
    execImmediate = immediate
  }

  return _debounce
}
```
---
title: 防抖&节流
date: 2022-11-27
tags:
  - 手写系列
summary: 防抖和节流
---

## 防抖
1. **基础版**
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
2. **添加立即执行**
```js
function debounce(fn, delay = 500, immediate = false) {
  let timeId = null
  let execImmediate = immediate

  const _debounce = function(...args) {
    if (timeId) clearTimeout(timeId)
    if(execImmediate) { // 存在的问题：立即执行后过了很长一段时间再次执行时不会立即执行
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
3. **添加取消**
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
4. **添加返回值(callback)**
```js
function debounce(fn, delay = 500, immediate = false, callback) {
  let timeId = null
  let execImmediate = immediate

  const _debounce = function(...args) {
    if (timeId) clearTimeout(timeId)
    if(execImmediate) {
      const result fn.apply(this, args)
      typeof callback === 'function' && callback(result)
      execImmediate = !immediate
      return
    }

    timeId = setTimeout(() => {
      const result =fn.apply(this, args)
      typeof callback === 'function' && callback(result)
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
* 使用示例
```html
<label for="input">输入</label>
<input type="text" id="input" placeholder="type..">
<button id="cancel">取消</button>

<script>
  const input = document.querySelector('#input')
  const cancel = document.querySelector('#cancel')

  const debounceFn = debounce(change, 1000, true, (res) => {
    console.log('res', res)
  })
  input.oninput = debounceFn

  function change(event) {
    console.log(`发送网络请求${++count}次`, this, event)
    return count
  }
  cancel.addEventListener('click', () => {
    debounceFn.cancel()
  })
</script>
```
5. 添加返回值(promise)
```js
function debounce(fn, delay = 500, immediate = false) {
  let timeId = null
  let execImmediate = immediate

  const _debounce = function(...args) {
    return new Promise((resolve, reject) => {
      if (timeId) clearTimeout(timeId)
      if(execImmediate) {
        const result = fn.apply(this, args)
        resolve(result)
        execImmediate = !immediate
        return
      }

      timeId = setTimeout(() => {
        const result =fn.apply(this, args)
        resolve(result)
        timeId = null
        execImmediate = immediate
      }, delay)
    })
  }

  _debounce.cancel = function() {
    timeId && clearTimeout(timeId)
    timeId = null
    execImmediate = immediate
  }

  return _debounce
}
```
* 使用示例
```js
const debounceFn = debounce(change, 1000, true)
input.oninput = () => {
  debounceFn().then(res => {
    console.log('res', res)
  })
}
```

## 节流
1. **基础版**
```js
function throttle(fn, interval) {
  let lastTime = 0
  function _throttle() {
    let nowTime = Date.now()
    let remainTime = interval - (nowTime - lastTime)
    if(remainTime <= 0) { // 第一次是负数，也会执行
      fn()
      lastTime = nowTime
      return
    }
  }

  return _throttle
}
```
2. **添加首次是否执行**
```js
function throttle(fn, interval, options = {
  leading: false
}) {
  let lastTime = 0
  const { leading } = options
  function _throttle() {
    let nowTime = Date.now()
    if(lastTime === 0 && leading !== true) {
      lastTime = nowTime // 避开首次执行
    }
    let remainTime = interval - (nowTime - lastTime)
    if(remainTime <= 0) { // 第一次是负数，也会执行
      fn()
      lastTime = nowTime
      return
    }
  }

  return _throttle
}
```
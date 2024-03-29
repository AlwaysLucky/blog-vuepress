---
title: nextTick异步更新策略
date: 2023-05-31
tags:
  - nexTick
summary: vue异步更新策略
---

### 数据更新的起点
```js
set(newVal) {
  dep.notify()
}
```
**notify**
```js
// src/core/observer/dep.js
notify() {
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update() // 执行watcher的更新函数
  }
}
```

**update**
```js
// src/core/observer/watcher.js
if (this.lazy) {
  this.dirty = true
} else if (this.sync) {
  this.run()
} else {
  queueWatcher(this) // this是当前watcher实例
}
```

**queueWatcher**
```js
// src/core/observer/scheduler.js
const queue = []
function queueWatcher(watcher) {
  if (!flushing) {
    queue.push(watcher)
  }

  if (!waiting) {
    waiting = true
    nextTick(flushSchedulerQueue) // flushSchedulerQueue是一个函数,如下
  }
}
```

**flushSchedulerQueue**
```js
// src/core/observer/scheduler.js
function flushSchedulerQueue() {
  for (index = 0; index < quene.length; index++) {
    watcher = quene[index]
    watcher.run() // 执行更新 
  }
}
```
从这里可以看出，`flushSchedulerQueue`是真正执行更新的地方,`watcher.run`中执行了组件更新函数

**nextTick**
```js
// src/core/util/next-tick.js
const callbacks = []
function nextTick(cb, ctx){
  // 没有直接push cb, 可以捕获异常
  callbacks.push(() => {
    if (cb) {
      try{
        cb.call(ctx)
      }catch(e) {
      }
    }
  })

  if (!pending) {
    pending = true
    timerFunc()
  }
}
```

**timerFunc**
```js
// src/core/util/next-tick.js
let timerFunc
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
* timerFunc 函数的优先级
1. Promise（微任务）
2. MutationObserver（微任务）
3. setImmediate（微任务）
4. setTimeout（宏任务）

**flushCallbacks**
```js
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

### 案例分析
```html
<div id="d1">{{foo}}</div>
<script>
  new Vue({
    el: '#app',
    data: {
      foo: 'hey~'
    },
    mounted() {
      this.foo = 'haha'
      this.$nextTick(() => {
        console.log(d1.innerHTML)
      })
    }
  })
</script>
```
1. `this.foo`会使触发set更新函数
2. 经过notify->watcher的update->queueWatcher->next(flushSchedulerQueue)之后
2. callbacks中自动存入了一个flushSchedulerQueue
```js
callbacks = [flushSchedulerQueue]
```
3. 执行$nextTick后，$nextTick传入的函数会直接添加到callbacks中
4. 此时的callbacks
```js
callbacks = [flushSchedulerQueue, () => {
  console.log(d1.innerHTML)
}]
```
5. `callbacks`依次执行时
6. 先触发`flushSchedulerQueue`，其中执行了dom更新
6. 再触发$nextTick的回调时，就可以拿到更新后的值

### 整体流程
1. set中触发notify
2. 执行watcher的update
3. queneWatcher(watcher)
4. nextTick(flushSchedulerQueue)
5. callbacks.push(flushSchedulerQueue)
6. timerFunc() // 放入异步队列
7. 同步任务执行完后执行异步任务
8. 遍历callbacks执行flushSchedulerQueue
9. 执行watcher.run()
10. run中执行了watcher.get()
11. get()中执行了this.getter.call(vm, vm) // getter就是updateComponent
12. vm._update(vm._render(), hydrating) 更新dom
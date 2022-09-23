---
title: 自定义指令实现计数器
date: 2022-09-22
tags:
  - directive
summary: vue
---

## 要实现的效果如下
![计数器](https://tzhen.vip/assets/countNumber.png)
## 实现
```html
<textarea v-model="inputValue" v-count="100" placeholder="输入.."></textarea>
```
```js
app.directive('count', {
  mounted(el, binding) {
    const element = document.createElement('span')
    const maxValue = binding.value
    el.maxLength = maxValue
    element.style.display = 'inline-block';
    element.style.transform = 'translate(-130%, -20%)';
    element.textContent = `${el.value.length}/${maxValue}`
    el.insertAdjacentElement('afterend', element);
    document.addEventListener('input', function(event) {
      element.textContent = `${el.value.length}/${maxValue}`
      el.insertAdjacentElement('afterend', element);
    })
  }
})
```
* vue3与vue2注册指令的方式有所不同
* 核心逻辑就是使用binding接收v-count=“100”传过来的值，然后给textarea设置maxLen
* 为textraea绑定input事件，获取到输入的值
* 创建动态元素span插入到`textarea`的后面
## 指令钩子(官方)
```js
// 在绑定元素的 attribute 前
// 或事件监听器应用前调用
created(el, binding, vnode, prevVnode) {
  // 下面会介绍各个参数的细节
},
// 在元素被插入到 DOM 前调用
beforeMount(el, binding, vnode, prevVnode) {},
// 在绑定元素的父组件
// 及他自己的所有子节点都挂载完成后调用
mounted(el, binding, vnode, prevVnode) {},
// 绑定元素的父组件更新前调用
beforeUpdate(el, binding, vnode, prevVnode) {},
// 在绑定元素的父组件
// 及他自己的所有子节点都更新后调用
updated(el, binding, vnode, prevVnode) {},
// 绑定元素的父组件卸载前调用
beforeUnmount(el, binding, vnode, prevVnode) {},
// 绑定元素的父组件卸载后调用
unmounted(el, binding, vnode, prevVnode) {}
```
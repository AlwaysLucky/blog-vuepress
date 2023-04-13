---
title: webpack + fiddler
date: 2023-04-13
tags:
  - webpack
summary: fiddler
---

## webpack + fiddler 配置
**问题**

在Fiddler中开启了`Host Remapping`，此时我们在浏览器中以配置的域名访问vue项目；会出现`Invalid Host header`

**解决**

1. vue-cli
```json
devServer: {
  disableHostCheck: true
}
```

2. webpack
```json
allowedHosts: [
  'tzhen.com' // 自己映射的域名
]
```
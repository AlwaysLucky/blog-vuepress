---
title: Cookie-Session-Token
date: 2022-08-09
tags:
  - cookie
  - session
  - token
summary: Cookie Session Token
---
`Cookie` `Session` `Token`都是为了记录用户身份，网络传输都是以数据包的形式传输，浏览器并不知道你是谁
## Cookie
* 一般由服务端通过Set-Cookie的形式设置在客户端
* 浏览器在下次请求时自动携带
* cookie以键值对形式存在，可以设置多个, eg:name=tianzhen;id=123
* 存储上限4kb
### 属性
1. HttpOnly // 无法通过document.cookie访问
2. Secure=true // 只能在https下发送
3. max-age/expires // 设置过期时间
4. domain // 只能在自己域名下访问
## Session
* 识别用户发起的机制称为Session(会话机制)
<!-- * session也是由服务端生成，通常命名为SessionId,常用cookie的形式来发送到浏览器 -->
### session工作机制
1. 用户登录，server为其生成唯一session，为其分配唯一sessionId
2. sessionId通过cookie(Set-Cookie)传给浏览器，当然也有其他方式，但大多都是使用cookie
3. 之后的请求都带上这个sessionId, server就能根据sessionId知道是哪个用户
## Token(JWT)
1. server根据用户名、密码生成Token
2. 客户端将Token缓存在本地
3. 之后在Header中携带它
### server如何校验Token是否合法？
jwt由三部分组成
1. header： // 指定了签名算法
2. payload： // 服务端存数据的地方，如userId:123，设置过期时间
3. Signature： // 签名
### 校验
* server接收到浏览器传过来的Token, 取出token中的header + payload，
* 再根据密钥(生成token时设置的字符串)生成签名 
* 然后与Token中的签名对比，一致则说明是合法的
* 在payload中取出server需要的信息
### 如何保证token不被篡改
> server密钥不泄漏，token就是安全的
### 优点
Token保存在客户端，避免了保存在server的弊端
### 缺点
一旦生成，直到过期，除非手动清除（如：登出）；Token字段一般都比较长，Header中每次携带增加请求负担；一般存在LocalStorage,会被Js读取，如果Token还没有过期，有安全隐患
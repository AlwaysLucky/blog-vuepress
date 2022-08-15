---
title: docker-compose笔记
date: 2022-08-12
tags:
  - docker-compose
summary: docker-compose
---
> 请自行百度安装
## Componse是干什么的？
Compose是Docker官方的开源项目，负责实现对Docker容器集群的快速编排
## 使用Compose运行nginx
1. 在/home下新建文件夹docker-nginx,进入docker-nginx
2. 使用docker cp nginx:/etc/nginx . // 把整个nginx目录拷贝过来
3. 新建log文件夹，待会把nginx默认log指向此文件夹
## 编写docker-compose.yml
```bash
# docker-compose.yml
version: '2.7.0'
services:
  nginx:
    restart: always
    image: nginx
    ports:
      - 4000:4000
    volumes:
      - /home/docker-conf/nginx/conf.d/:/etc/nginx/conf.d
      - /home/docker-conf/log/:/var/log/nginx
```
* version: 2.7.0 // docker-compose版本号
* 定义一个nginx服务（可以定义多个）
* volumns： 将主机目录挂载到容器目录
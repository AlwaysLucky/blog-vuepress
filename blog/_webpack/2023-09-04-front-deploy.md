---
title: 前端工程化之自动化部署
date: 2023-09-04
summary: 前端工程化之自动化部署
---

## 本机环境
* CentOS8 2核 4g
* Docker version 24.0.5
* gitlab-runner 16.2.1
## gitlab

### 安装
```bash
  docker run --name "gitlab"  \
    --hostname "test.vip"  \
    -p 8888:80 -p 8443:443 -p 23:22  \
    --restart always  \
    -v /data/gitlab/config:/etc/gitlab \
    -v /data/gitlab/logs:/var/log/gitlab \
    -v /data/gitlab/data:/var/opt/gitlab \
  -d gitlab/gitlab-ce
```

docker run 会安装并运行gitlab

### 端口
* 80: http
* 443: https
* 22: ssh

 因为我的端口都已被占用，所以需要修改，记得在防火墙中放开自定义端口

 ### 挂载
 `-v /data/gitlab/config:/etc/gitlab`将容器中`/etc/gitlab`映射挂载到本机`/data/gitlab/config`，另外两个也是如此

 ### 修改配置
 ```bash
 cd /data/gitlab/config/
 vim gitlab.rb
 ```
 修改gitlab.rb
 ```
 external_url 'http://test.vip:8888' // 没有域名使用ip
 gitlab_rails['gitlab_shell_ssh_port'] = 23
 ```
 使配置生效
 ```bash
 docker exec -it gitlab gitlab-ctl reconfigure
 ```

 ### 增加虚拟内存
 * [swap参考](https://www.zhihu.com/question/584132843)
 * 内存>4g的话不需要增加虚拟内存
 * 不增加的话跑一会就挂

 ### 访问
 * http://test.vip:8888
 * 用户名root
 * 初始密码查看
 * 登录成功后修改密码
```bash
docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

## 域名代理
上面已经可以通过端口号访问gitlab，可是太别扭了，由于本机之前单独安装过nginx，配置反向代理可以实现用域名访问

```nginx
# /etc/conf.d/gitlab.conf 新增
server {
	listen 80;
	server_name test.vip;
	location / {
		proxy_pass http://127.0.0.1:8888;	
	}
}
```
* test.vip需要去域名后台添加解析
* https不搞了我到现在都没搞定😓


## gitlab-runner

### 安装
```bash
docker run -itd --restart=always  --name gitlab-runner -v /data/gitlab-runner/config:/etc/gitlab-runner -v /var/run/docker.sock:/var/run/docker.sock  gitlab/gitlab-runner:latest
```

### 注册
![https://tzhen.vip/assets/gitlab-runner.jpg](https://tzhen.vip/assets/gitlab-runner.jpg)
![https://tzhen.vip/assets/gitlab-runner.jpg](https://tzhen.vip/assets/gitlab-runner-success.jpg)

* Settings->CICD->Runners->New project runner
* 点击New project runner之后会出现注册的步骤
* 注册成功之后显示绿色圆点
* 网上的命令注册应该是旧版本的，现在行不通了

## gitlab-ci.yml
注册`gitlab-runner`之后就可以编写`gitlab-ci.yml`文件了

```yml
image: node:16.14.2

stages: # 分段
  - install
  - build
  - deploy

cache: # 缓存
  paths:
    - node_modules
    - dist

install:
  tags:
    - test
  stage: install
  script:
    - npm install --registry=https://registry.npmmirror.com/

build:
  tags:
    - test
  stage: build
  script:
    - npm run build

deploy:
    tags:
      - test
    image: docker
    stage: deploy
    script:
      - image_name=frontend-project # 表示镜像名称
      - version=$(date +'%Y%m%d-%H%M%S') # 表示镜像版本（用时间表示）
      - container_name=front-web # 运行的容器名称
      - host_port=3001 # 本机端口
      - container_port=80 # 运行的容器端口
      - docker build -t $image_name:$version .
      - if [ "$(docker ps -aq -f name=$container_name)" ]; then
      -   docker rm -f $container_name
      - fi
      - docker run -d --name $container_name -p $host_port:$container_port $image_name:$version
```

* 定义了三个阶段（install build deploy）
* cache如果不设置缓存的话，build就会失败，找不到node_modules
* deploy使用了docker进行部署

## Dockerfile
添加Dockerfile文件

```
FROM nginx:1.23.1
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
```

## nginx.conf
添加nginx.conf文件

```
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    access_log  /var/log/nginx/access.log  main;
    keepalive_timeout  65;
    include /etc/nginx/conf.d/*.conf;
}
```

## 测试
上面工作都准备完了就提交看看吧，不出意外的话很快就出意外，第一次基本上是不会成功的
![https://tzhen.vip/assets/gitlab-pipeline.jpg](https://tzhen.vip/assets/gitlab-pipeline.jpg)

### 可能出现的问题
1. 如果一直pending，检查runner是否在运行，是否是绿色点点
2. 注册时的tags在任务里都写上，我的tag是test
3. deploy时会失败，修改/data/gitlab-runner/config/config.toml
```
[runners.docker]
  volumes = ["/cache","/usr/bin/docker:/usr/bin/docker", "/var/run/docker.sock:/var/run/docker.sock"]
```

## 最后
这里肯定会遇到其他坑，因为我是调试完了后写的笔记，好多东西没有记，到这里前端工程化三部曲就完了，可能这就是工程化吧

* [前端工程化-构建篇](/webpack/2023/09/02/frontend-build/)
* [前端工程化-规范篇](/webpack/2023/08/26/frontend-rule/)
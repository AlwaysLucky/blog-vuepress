---
title: XX通视频倍速研究
date: 2022-12-11
tags:
  - video
summary: 倍速研究
---

> XX通视频的倍速播放最高只提供了2倍播放，但是video的倍速播放通常都是在本地控制的，如何把它调成任意倍数呢

## 初步分析
![https://tzhen.vip/assets/video/vodeo1-1.jpeg](https://tzhen.vip/assets/video/vodeo1-1.jpeg)

1. 选中video
2. 切换至console面板

![https://tzhen.vip/assets/video/video1-3.jpeg](https://tzhen.vip/assets/video/video1-3.jpeg)

3. $0是之前选中的video元素
4. $0.playbackRage 获取当前的播放倍数
5. $0.playbackRage = 10 修改为10倍试一下
6. $0.playbackRage 再次获取一下发现设置失败

## 查看相关JS
上面试图修改playbackRage以失败告终，那就只好打开network面板再分析一下了

![https://tzhen.vip/assets/video/video1-2.jpeg](https://tzhen.vip/assets/video/video1-2.jpeg)

1. 先找与video相关的js(嫌疑最大)
2. video.min.js通常是第三方库，先不看
3. video-ext.min.js比较可疑，进去看看

![https://tzhen.vip/assets/video/video1-4.jpeg](https://tzhen.vip/assets/video/video1-4.jpeg)

4. 代码很乱
5. 格式化一下，但依旧很乱
6. 格式化后的video-ext.min.js如下图

![https://tzhen.vip/assets/video/video1-5.jpeg](https://tzhen.vip/assets/video/video1-5.jpeg)

## 调试1
这是丑化过的代码，如何下手呢，还是以playbackRage为线索，因为再怎么丑化代码，playbackRage是无法用其他字符代替的，搜索一下

![https://tzhen.vip/assets/video/video1-6.jpg](https://tzhen.vip/assets/video/video1-6.jpg)

1. 来到搜索到playbackRage的地方
2. 310行打上断点
3. 看样子是修改倍数的时候调用的
4. 试图修改倍数

![https://tzhen.vip/assets/video/video1-7.jpeg](https://tzhen.vip/assets/video/video1-7.jpeg)

5. 发现命中断点
4. 但是命中断点的时候倍数发现已经生效了，推测应该是在此断点之前就已经修改过了

## 调试2
倍数是在哪里修改的呢，找了半天才想到看调用栈，终于找到了可疑的地方，如下图

![https://tzhen.vip/assets/video/video1-8.jpeg](https://tzhen.vip/assets/video/video1-8.jpeg)

- 进入_0x23b26d，如下图

![https://tzhen.vip/assets/video/video1-9.jpeg](https://tzhen.vip/assets/video/video1-9.jpeg)

1. 9704行打上断点，再重新修改倍数试一下
2. 发现先直接命中了这个断点

## 调试3
下面的操作纯属碰碰运气
1. _0x4acc9b的值是1.5，貌似是设置的播放倍数
2. 那就修改它，我把它改成了4
    - 控制台里直接_0x4acc9b=4就可以改掉它
3. 放开断点
4. 发现进入到最开始设置的那个断点
5. 逐步执行的是否发现了一个可疑的地方，如下图

![https://tzhen.vip/assets/video/video1-10.png](https://tzhen.vip/assets/video/video1-10.png)

6. _0x485370的值是2，可能是倍数最大值
7. 修改_0x485370 = 4
8. 断点放行

> 最后再祭出大招Fiddler，改写JS，就可以一劳永逸啦

## 完成

![https://tzhen.vip/assets/video/video1-11.png](https://tzhen.vip/assets/video/video1-11.gif)
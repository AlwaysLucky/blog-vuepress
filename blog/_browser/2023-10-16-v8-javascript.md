---
title: V8是如何执行JS的
date: 2023-10-15
summary: V8
---

## 编译器/解释器
我们所编写的代码，是不能被机器直接读取的，需要将其转为机器能够读懂的机器语言，按语言的执行流程，划分为**编译型**语言和**解释型**语言
### 编译型语言
词法分析 -> 语法分析 -> AST -> 机器码 -> 二进制文件 -> 执行
### 解释型语言
语法分析 -> 词法分析 -> AST -> 字节码 -> 解释执行

## V8是如何执行JavaScript的

### AST
1. 词法分析（分词）
    - 源代码分成一个个**token**
2. 语法分析（解析）
    - 将**token**数据根据语法规则生成AST
3. 生成执行上下文

### 字节码
有了AST之后，**解释器Ignition**登场，根据AST生成字节码，并逐行解释执行

### 执行
1. 当第一次执行的字节码，解释器会逐行解释执行
2. 字节码执行的过程中，如果发现有热点代码，**编译器TurboFan**则会把这段热点的字节码编译为机器码
3. 当再次执行这段被优化的代码时，只需执行编译后的机器码，大大提升了代码的执行效率

**热点代码**
> 一段代码被重复执行多次，这种称为热点代码
---
title: react中多个setstate的合并
nav:
  path: /utils
  title: Utils
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /utils/hook
  title: react-hooks
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## useEffect

## 背景介绍

在同步方法内执行`setState`,多个`setState`会被合并成一个执行

在异步方法内执行`setState`,多个`setState`会分开执行

```tsx
/**
 * title: useEffect
 * desc: 打开控制台查看打印结果
 */
import React, { useState, useEffect } from 'react';

const seed = 'tds';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&nat=ch&seed=${seed}`;

export default () => {
  const [tableRefresh, setTableRefresh] = useState(false); // 列表刷新
  const [results1, setResults1] = useState('results1');
  const [results2, setResults2] = useState('results2');
  const [results3, setResults3] = useState('results3');

  const saveData = (text: string) => {
    setResults1(text);
    setResults2(text);
    setResults3(text);
  };

  useEffect(() => {
    fetch(fakeDataUrl).then((res) => {
      console.log('请求结束', res.json());
      saveData(`异步-${new Date().getTime()}`);
    });
  }, [tableRefresh]);

  useEffect(() => {
    console.count('监听项变化');
  }, [results1, results2, results3]);

  return (
    <div>
      <p>
        <span>结果:</span>
        <span>{results1}</span>
      </p>
      <button onClick={() => setTableRefresh(!tableRefresh)}>保存数据-异步</button>
      <p></p>
      <button onClick={() => saveData(`同步-${new Date().getTime()}`)}>保存数据-同步</button>
    </div>
  );
};
```

<!-- ### 问题描述

根据`useState`的特性,简单模仿`useState`

- `state` 只在组件首次渲染的时候被创建。在下一次重新渲染时，`useState`返回给我们当前的 `state`
- 只在最顶层使用 Hook,不要在循环，条件或嵌套函数中调用 Hook
- 只在 React 函数中调用 Hook

#### tdsState1.0

_demo_

此 demo 根据如下特性实现

- `state` 只在组件首次渲染的时候被创建。在下一次重新渲染时，`useState`返回给我们当前的 `state`
- 只在最顶层使用 Hook,不要在循环，条件或嵌套函数中调用 Hook

```tsx
/**
 * title: 简单模仿useState
 * desc: 点击按钮后发现(打开控制台查看打印结果)
 */
import React from 'react';
import { tdsState } from './utils';

export default () => {
  const [count, setCount] = tdsState(0);

  console.log('count', count);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

_调试流程_

1. 初始化时,count 为 0;
1. 第一次点击按钮,count 为 1,dom 无变化;
1. 第二次点击按钮,count 为 1,dom 无变化;
1. 重复点击按钮,count 一直为 1,dom 无变化;

_问题出现原因_

setState 之后,函数组件没有重新执行,导致`count`的值一直是初始值且`Dom`没有重新渲染;

没有遵循第三条特性(只在 React 函数中调用 Hook)

_解决方案_

每次 setState 之后应该让函数组重新执行且`Dom`没有重新渲染

<code src="./index.tsx" title='浮点数的求和' desc='浮点数的求和,sumFloatNum方法不支持进位'></code> -->

## 解决方案

TODO

### 使用 useState

## 参考资料

[Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

[【万字长文】React hooks 源码详解](https://juejin.cn/post/6954352486312312845)

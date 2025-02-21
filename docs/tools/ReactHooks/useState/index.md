# react 中多个 setState 的合并

## 背景介绍

在同步方法内执行`setState`,多个`setState`会被合并成一个执行

在异步方法内执行`setState`,多个`setState`会分开执行

```tsx
/**
 * title: useEffect
 * desc: 打开控制台查看打印结果
 */
import { useEffect, useState } from 'react';

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
      <button onClick={() => setTableRefresh(!tableRefresh)}>
        保存数据-异步
      </button>
      <p></p>
      <button onClick={() => saveData(`同步-${new Date().getTime()}`)}>
        保存数据-同步
      </button>
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

## demo 2

不合并的另一种情况

点击 A，监听触发一次
点击 B，监听触发两次

```jsx
import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  // 定义一个组件内的状态变量
  const [curGroupId, setCurGroupId] = useState(null);
  const [searchData, setSearchData] = useState({});
  const [searchDataSnapshot, setSearchDataSnapshot] = useState({});

  useEffect(() => {
    setSearchDataSnapshot(JSON.stringify(searchData));
  }, [curGroupId]);

  useEffect(() => {
    window.console.log('发起请求', searchData);
  }, [curGroupId, JSON.stringify(searchDataSnapshot)]);

  const onclick = () => {
    setCurGroupId(curGroupId + 1);
    setSearchData(Date.now());
  };

  return (
    <div>
      <button onClick={() => setCurGroupId(curGroupId + 1)}>A</button>
      <br />
      <button onClick={onclick}>B</button>
    </div>
  );
}

export default ExampleComponent;
```

### **按钮 A** (`直接更新 curGroupId`)

**行为逻辑：**

1. 更新 `curGroupId` → 触发第一个 `useEffect`。
2. 第一个 `useEffect` 尝试将 `searchData` 序列化为 `searchDataSnapshot`：
   - **关键点**：此时 `searchData` 未变化 → `JSON.stringify(searchData)` 的结果与之前相同 → `searchDataSnapshot` **不会更新**。
3. 第二个 `useEffect` 的依赖项 `[curGroupId, JSON.stringify(searchDataSnapshot)]` 中：
   - `curGroupId` 变化 → 触发一次 `console.log("发起请求")`。

**结果：每次点击按钮 A → 打印 1 次。**

### **按钮 B** (`同时更新 curGroupId 和 searchData`)

**行为逻辑：**

1. **首次状态更新**：
   - `curGroupId` 和 `searchData` 同时更新 → 触发重新渲染。
2. **第一个 `useEffect` 执行**：
   - 此时 `searchData` 已更新 → `JSON.stringify(searchData)` 的结果变化 → `searchDataSnapshot` **更新为新值**。
3. **第二次状态更新**：
   - `searchDataSnapshot` 更新 → 触发第二次重新渲染。
4. **第二个 `useEffect` 的依赖项变化**：
   - 第一次渲染后：`curGroupId` 变化 → 触发 `console.log`。
   - 第二次渲染后：`searchDataSnapshot` 变化 → 再次触发 `console.log`。

**结果：每次点击按钮 B → 打印 2 次。**

### **关键差异**

- **按钮 B** 的 `searchDataSnapshot` 更新会导致**两次依赖项变化**：

  1. `curGroupId` 变化 → 第一次打印。
  2. `searchDataSnapshot` 变化 → 第二次打印。

- **点击按钮 B** 的输出：
  ```
  searchDataSnapshot 更新: "新值"
  发起请求
  发起请求
  ```

---

### **结论**

- **按钮 A**：每次点击 → **1 次打印**。
- **按钮 B**：每次点击 → **2 次打印**。

（ `searchDataSnapshot` 的更新会触发第二次渲染和 `useEffect` 的二次执行。）

## 解决方案

TODO

### 使用 useState

## 参考资料

[Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

[【万字长文】React hooks 源码详解](https://juejin.cn/post/6954352486312312845)

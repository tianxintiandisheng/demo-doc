---
title: useEffect VS componentDidUpdate
nav:
  path: /utils
  title: Utils
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /utils/useEffect
  title: react-hooks
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## useEffect

## 背景介绍

在列表搜索条件变化时,需要保存搜索条件,但是保存搜索条件这个方法不需要在组件挂载时执行,即如何使 useEffect 在渲染时不执行，只在数据变更时执行

### 问题描述

如果是使用监听搜索条件的话,在组件加载时也会执行

```jsx
/**
 * title: useEffect
 * desc: 打开控制台查看打印结果
 */
import React, { useState, useEffect } from 'react';

export default () => {
  const [pageNum, setPageNum] = useState(1);

  const saveData = () => {
    console.log('useEffect----', `保存数据${pageNum}`);
  };

  useEffect(() => {
    saveData();
  }, [pageNum]);

  return (
    <div>
      <button onClick={() => setPageNum(pageNum + 1)}>翻页{pageNum}</button>
    </div>
  );
};
```

## 解决方案

### 使用 useState

```jsx
/**
 * title: useState
 * desc: 打开控制台查看打印结果
 */
import React, { useState, useEffect } from 'react';

export default () => {
  const [pageNum, setPageNum] = useState(1);
  const [isInit, setInit] = useState(true);

  const saveData = () => {
    console.log('useState----', `保存数据${pageNum}`);
  };

  useEffect(() => {
    if (isInit) {
      console.log('初次渲染');
      setInit(false);
    } else {
      saveData();
    }
  }, [setPageNum]);

  return (
    <div>
      <button onClick={() => setPageNum(pageNum + 1)}>翻页{pageNum}</button>
    </div>
  );
};
```

### 使用 useRef

```jsx
/**
 * title: 使用useRef
 * desc: 打开控制台查看打印结果
 */
import React, { useState, useEffect, useRef } from 'react';

export default () => {
  const [pageNum, setPageNum] = useState(1);
  const mounting = useRef(true);

  const saveData = () => {
    console.log('useRef----', `保存数据${pageNum}`);
  };

  useEffect(() => {
    if (mounting.current) {
      console.log('初次渲染');
      mounting.current = false;
    } else {
      saveData();
    }
  }, [pageNum]);

  return (
    <div>
      <button onClick={() => setPageNum(pageNum + 1)}>翻页{pageNum}</button>
    </div>
  );
};
```

<!-- <code src="./index.tsx" title='浮点数的求和' desc='浮点数的求和,sumFloatNum方法不支持进位'></code> -->

---

## 深度思考

### 使用普通变量,变量在组件内部

```jsx
/**
 * title: insideVar
 * desc: 打开控制台查看打印结果
 */
import React, { useState, useEffect } from 'react';

export default () => {
  const [pageNum, setPageNum] = useState(1);
  let isInit = true;

  const saveData = () => {
    console.log('inside----', `保存数据${pageNum}`);
  };

  useEffect(() => {
    if (isInit) {
      console.log('inside----', '初次渲染');
      isInit = false;
    } else {
      saveData();
    }
  }, [pageNum]);

  return (
    <div>
      <button onClick={() => setPageNum(pageNum + 1)}>Demo3-翻页{pageNum}</button>
    </div>
  );
};
```

### 使用普通变量,变量在组件外部

```jsx
/**
 * title: outsideVar
 * desc: 打开控制台查看打印结果
 */
import React, { useState, useEffect } from 'react';

let isInit = true;

export default () => {
  const [pageNum, setPageNum] = useState(1);

  const saveData = () => {
    console.log('outsideVar----', `保存数据${pageNum}`);
  };

  useEffect(() => {
    if (isInit) {
      console.log('outsideVar----', '初次渲染');
      isInit = false;
    } else {
      saveData();
    }
  }, [pageNum]);

  return (
    <div>
      <button onClick={() => setPageNum(pageNum + 1)}>翻页{pageNum}</button>
    </div>
  );
};
```

Q:这两种写法有什么区别呢,为什么第一种写法(使用普通变量,变量在组件内部)一直是初次渲染呢

A: 每次重新渲染,函数组件都会被执行,内部的变量都会被重新声明

Q: 解决方案中 useState 和 useRef 的优劣

A: todo( 需要在研究 hooks 源码之后确认 2022.1201)

---

## 参考资料

[React hook ---如何使 useEffect 在渲染时不执行，只在数据变更时执行](https://www.jianshu.com/p/a6d745fecde7)

[Hhooks 的实践深入-hooks 模拟 componentDidUpdate](https://react.caoweiju.com/src/hooks/advance.html)

[React-hooks 的 useEffect 模拟 componentDidUpdate 生命周期](https://blog.csdn.net/fesfsefgs/article/details/108024853)

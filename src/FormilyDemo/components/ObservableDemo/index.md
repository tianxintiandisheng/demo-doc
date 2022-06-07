---
title: ObservableDemo
nav:
  path: /FormilyDemo
  title: Formily
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /FormilyReactive
  title: formily/reactive
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## ObservableDemo

observable 是响应式编程模型中最重要的一块，它的核心概念就是：

一个 observable 对象，字面意思是可订阅对象，我们通过创建一个可订阅对象，在每次操作该对象的属性数据的过程中，会自动通知订阅者，@formily/reactive 创建 observable 对象主要是通过 ES Proxy 来创建的，它可以做到完美劫持数据操作

### Demo

<!-- <code src="./CustomOnlyProp.tsx" title='自定义组件-属性映射' desc='schema中有一个自定义的属性withCount，input本身没有该属性，需要通过mapProps做映射处理'></code> -->

```tsx
/**
 * title: 来自官方文档的例子
 * desc: 点击按钮在控制台查看打印结果
 */
import React from 'react';
import { Button } from 'antd';
import { observable, autorun } from '@formily/reactive';
const obs = observable({});
const setValue = () => {
  obs.aa = 123;
  obs.bb = 321;
};
autorun(() => {
  console.log('@formily/reactive', obs.aa, obs.bb);
});

export default () => {
  return (
    <>
      <Button type="primary" onClick={setValue}>
        setValue
      </Button>
    </>
  );
};
```

```tsx
/**
 * title: 使用proxy简单实现observable
 * desc: 点击按钮在控制台查看打印结果
 */
import React from 'react';
import { Button } from 'antd';
import { observable } from './reactiveTds';

const tracker = () => {
  console.log(obs.aa, obs.bb);
};
const obs = observable({}, tracker);
const setValue = () => {
  obs.aa = 123;
  obs.bb = 321;
};

export default () => {
  return (
    <>
      <Button type="primary" onClick={setValue}>
        setValue
      </Button>
    </>
  );
};
```

## 参考资料

[formily/reactive-核心概念](https://reactive.formilyjs.org/zh-CN/guide/concept)

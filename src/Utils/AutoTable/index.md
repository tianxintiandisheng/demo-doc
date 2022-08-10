---
title: FloatNumSum
nav:
  path: /utils
  title: Utils
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /utils
  title: 获取dom宽度
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## getDomHeight

### 方案 A js 原生(Dom)

- 原理:视窗高度依次减去各模块高度
- 优点:简单易懂
- 缺点:变量过多,略微繁琐

```jsx
/**
 * title: 自适应高度的table
 * desc: 使用js原生方法获取高度(建议新建窗口查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="Dom" />;
```

> [javascript 中获取 dom 元素的高度和宽度](https://www.cnblogs.com/lingdublog/p/6438055.html)

---

### 方案 B js 原生(DOMRect)

- 原理:视窗高度-table 距离顶部距离-底部元素高度-底部间距

- 优点:变量较少(方案 A 的优化版)

- 缺点:只能在页面级别生效;
<!-- - 初次获取 table 距离顶部距离错误,加了定时器以成功获取; -->

```jsx
/**
 * title: 自适应高度的table(DOMRect)
 * desc: 使用js原生方法获取高度(只能在新建窗口中查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="DOMRect" />;
```

> [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)

---

### 方案 C React-Ref

```jsx
/**
 * title: 自适应高度的table(Ref)
 * desc: 使用Ref获取高度(只能在新建窗口中查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="Ref" />;
```

> [react-回调 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs) > [react-hook-hooks FAQ-我该如何测量 DOM 节点？](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)

## 拓展阅读

layout 根据 Sider 的个数动态追加了".ant-layout-has-sider"类名,导致子组件挂载时获取不到正确的布局信息

## 参考资料

[javascript 中获取 dom 元素的高度和宽度](https://www.cnblogs.com/lingdublog/p/6438055.html) [ResizeObserver 接口监听元素内容区域变化](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

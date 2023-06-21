# 自动高度 Table

## 背景

使用 antd 写了一个 table,为了交互上友好;要求如下

1. 下图红色区域屏幕剩余高度;
2. table 高度不限,有纵向滚动条;
3. 页面不允许出现纵向滚动条;

![autoTable](https://img.alicdn.com/imgextra/i3/O1CN01ChZRtH1rFlbwVtBYE_!!6000000005602-2-tps-1918-962.png)

## 知识剖析

1. 要求 1 和要求 3 是同时实现的,只要 table 铺满屏幕剩余高度即可
2. 要求 2 的纵向滚动是通过 antd-table 的`scroll`属性实现的,只需要把`y`的值设置为屏幕剩余高度即可
3. 那现在的关键就是如何获取屏幕剩余高度了
4. 屏幕剩余高度=100vh(视窗高度)-header-面包屑-Tab-操作区-间距;如下图 ![在这里插入图片描述](https://img-blog.csdnimg.cn/7dde2551998e409691df255593fbee0a.png)

## 编码实战

### 方案 A 原生 js 获取高度( [Dom](https://www.cnblogs.com/lingdublog/p/6438055.html))

- 原理:视窗高度依次减去各模块高度;
- 优点:简单易懂;
- 缺点:变量过多,略微繁琐;

```jsx
/**
 * title: 自适应高度的table
 * description: 使用js原生方法获取高度(建议新建窗口查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="Dom" />;
```

---

### 方案 B 原生 js 优化 ([DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect))

- 原理:视窗高度-table 距离顶部距离-底部元素高度-底部间距;

- 优点:变量较少(方案 A 的优化版);

- 缺点:只能在页面级别生效;

```jsx
/**
 * title: 自适应高度的table(DOMRect)
 * description: 使用js原生方法获取高度(只能在新建窗口中查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="DOMRect" />;
```

---

### 方案 C React-Ref([ref](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node))

- 原理:视窗高度-table 距离顶部距离-底部元素高度-底部间距;

- 优点:变量较少(方案 A 的优化版);

- 缺点:只能在页面级别生效;

```jsx
/**
 * title: 自适应高度的table(Ref)
 * description: 使用Ref获取高度(只能在新建窗口中查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="Ref" />;
```

---

## 拓展阅读

layout 根据 Sider 的个数动态追加了".ant-layout-has-sider"类名,导致子组件挂载时获取不到正确的布局信息

解决方案: 不依赖组件的状态更新`hasSider`字段,给 `<Layout />`组件 添加属性 `hasSider`

### [antd-layout 源码](https://github.com/ant-design/ant-design/blob/master/components/layout/layout.tsx)

```js
...
const [siders, setSiders] = React.useState<string[]>([]);

  const { prefixCls, className, children, hasSider, tagName: Tag, ...others } = props;
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
  ...
```

---

## 参考资料

- [javascript 中获取 dom 元素的高度和宽度](https://www.cnblogs.com/lingdublog/p/6438055.html)

- [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)

- [react-回调 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)

- [react-hook-hooks FAQ-我该如何测量 DOM 节点？](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)

- [ResizeObserver 接口监听元素内容区域变化](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

- [antd-layout 源码](https://github.com/ant-design/ant-design/blob/master/components/layout/layout.tsx)

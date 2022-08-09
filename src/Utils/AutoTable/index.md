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

### Demo-1

```jsx
/**
 * title: 自适应高度的table
 * desc: 使用js原生方法获取高度(建议新建窗口查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="Dom" />;
```

---

### Demo-2

```jsx
/**
 * title: 自适应高度的table
 * desc: 使用js原生方法获取高度(只能在新建窗口中查看此demo)
 */
import React from 'react';
import TagManagementPage from './index';

export default () => <TagManagementPage type="DOMRect" />;
```

## 参考资料

[javascript 中获取 dom 元素的高度和宽度](https://www.cnblogs.com/lingdublog/p/6438055.html)

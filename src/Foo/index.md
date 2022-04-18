---
title: Foo
nav:
  path: /components
  title: components
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /components/Foo
  title: 自定义分组名称
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## Foo

Demo:

```tsx
import React from 'react';
import { Foo } from 'demo-doc';

export default () => <Foo title="First Demo" />;
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo

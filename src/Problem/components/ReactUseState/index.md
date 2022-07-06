---
title: New Collection
nav:
  path: /Problem
  title: Problem
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /react
  title: react/modal
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## New Collection <Badge>TODO</Badge>

弹出层的新建表单

### 问题代码

复现路径： 点击按钮‘ New Collection’》点击‘cancel’》点击按钮‘ New Collection’ 问题描述： 第二次的弹窗内表单的值没有被回填

<code src="./ReactUseState.tsx" title='useState' desc='弹窗在组件内渲染'></code>

<code src="./components/ReactUseStateOutside/ReactUseStateOutside.tsx" title='useState' desc='弹窗为单独的组件'></code>

## 参考资料

[antd-弹出层的新建表单](https://ant.design/components/form-cn/#components-form-demo-form-in-modal)

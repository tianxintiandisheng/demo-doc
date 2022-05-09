---
title: Basics
nav:
  path: /FormilyDemo
  title: Formily
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /FormilyDemo
  title: Formily
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## Basics

基于 Formily 的基础示例

### Demo

<code src="./BasicDemo.tsx" title='基于 Formily的基础示例'></code>

从以上例子中，我们可以学到很多东西：

- [createForm](https://core.formilyjs.org/zh-CN/api/entry/create-form)用来创建表单核心领域模型，它是作为[MVVM](https://core.formilyjs.org/guide/mvvm)设计模式的标准 ViewModel

- [FormProvider](https://react.formilyjs.org/zh-CN/api/components/form-provider)组件是作为视图层桥接表单模型的入口，它只有一个参数，就是接收 createForm 创建出来的 Form 实例，并将 Form 实例以上下文形式传递到子组件中

- [FormLayout](https://antd.formilyjs.org/zh-CN/components/form-layout)组件是用来批量控制[FormItem](https://antd.formilyjs.org/zh-CN/components/form-item)样式的组件，这里我们指定布局为上下布局，也就是标签在上，组件在下

- Field

  组件是用来承接普通字段的组件

  - name 属性，标识字段在表单最终提交数据中的路径
  - title 属性，标识字段的标题
    - 如果 decorator 指定为 FormItem，那么在 FormItem 组件中会默认以接收 title 属性作为标签
    - 如果指定为某个自定义组件，那么 title 的消费方则由自定义组件来承接
    - 如果不指定 decorator，那么 title 则不会显示在 UI 上
  - required 属性，必填校验的极简写法，标识该字段必填
    - 如果 decorator 指定为 FormItem，那么会自动出现星号提示，同时校验失败也会有对应的状态反馈，这些都是 FormItem 内部做的默认处理
    - 如果 decorator 指定为自定义组件，那么对应的 UI 样式则需要自定义组件实现方自己实现
    - 如果不指定 decorator，那么 required 只是会阻塞提交，校验失败不会有任何 UI 反馈。
  - initialValue 属性，代表字段的默认值
  - decorator 属性，代表字段的 UI 装饰器，通常我们都会指定为 FormItem
    - 注意 decorator 属性传递的是数组形式，第一个参数代表指定组件类型，第二个参数代表指定组件属性
  - component 属性，代表字段的输入控件，可以是 Input，也可以是 Select，等等
    - 注意 component 属性传递的是数组形式，第一个参数代表指定组件类型，第二个参数代表指定组件属性

- [FormConsumer](https://react.formilyjs.org/zh-CN/api/components/form-consumer)组件是作为响应式模型的响应器而存在，它核心是一个 render props 模式，在作为 children 的回调函数中，会自动收集所有依赖，如果依赖发生变化，则会重新渲染，借助 FormConsumer 我们可以很方便的实现各种计算汇总的需求

- [FormButtonGroup](https://antd.formilyjs.org/zh-CN/components/form-button-group)组件作为表单按钮组容器而存在，主要负责按钮的布局

- [Submit](https://antd.formilyjs.org/zh-CN/components/submit)组件作为表单提交的动作触发器而存在，其实我们也可以直接使用 form.submit 方法进行提交，但是使用 Submit 的好处是不需要每次都在 Button 组件上写 onClick 事件处理器，同时它还处理了 Form 的 loading 状态，如果 onSubmit 方法返回一个 Promise，且 Promise 正在 pending 状态，那么按钮会自动进入 loading 状态

## 参考资料

[formily-官方文档](https://v2.formilyjs.org/)

---
title: New Collection
nav:
  path: /Problem
  title: Problem
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /antd
  title: antd/modal
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## New Collection <Badge>TODO</Badge>

弹出层的新建表单

### 问题代码

复现路径： 点击按钮‘ New Collection’》点击‘cancel’》点击按钮‘ New Collection’ 问题描述： 第二次的弹窗内表单的值没有被回填

```jsx
/**
 * title: 第二次打开时表单值未回填
 * desc: Modal设置destroyOnClose，用useEffect监听visible修改表单的值
 */
import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import { useState } from 'react';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  let [form] = Form.useForm();
  console.log('visible', visible);
  console.log('form', form);
  useEffect(() => {
    console.log('useEffect-visible', visible);
    form.setFieldsValue({
      title: 666,
    });
    console.log('useEffect-1111');
  }, [visible]);
  return (
    <Modal
      destroyOnClose
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const App = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default App;
```

## 参考资料

[antd-弹出层的新建表单](https://ant.design/components/form-cn/#components-form-demo-form-in-modal)

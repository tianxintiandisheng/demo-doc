import React from 'react';
import { Form, InputNumber, Button } from 'antd';

var combinationSum3 = function (k, n) {
  let ans = [];
  let backTracing = (start, path) => {
    if (path.length === k && path.reduce((acc, prev) => (acc += prev)) === n) {
      ans.push(path.slice());
      return;
    }
    for (let i = start; i <= 9; i++) {
      path.push(i);
      backTracing(i + 1, path);
      path.pop(i);
    }
  };
  backTracing(1, []);
  return ans;
};

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log('combinationSum3:', combinationSum3(values.k, values.n));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ k: 3, n: 7 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="解中数字的个数" name="k" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="解中数字的和" name="n" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            求解
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

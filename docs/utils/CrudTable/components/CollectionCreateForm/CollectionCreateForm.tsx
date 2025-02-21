import { Form, Input, InputNumber, Modal } from 'antd';
import React, { useEffect } from 'react';
import { ActionType, Item, Values } from '../../type';

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  actionType: ActionType;
  curItem: Item | undefined;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  curItem,
  actionType,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (open) {
      if (actionType === ActionType.EDIT && curItem) {
        form.setFieldsValue(curItem);
      }
      if (actionType === ActionType.ADD) {
        form.resetFields();
      }
    }
  }, [curItem?.id, open]);
  return (
    <Modal
      open={open}
      title={actionType === ActionType.ADD ? '新增' : '删除'}
      okText="确认"
      cancelText="取消"
      destroyOnClose
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
        name="form_in_modal"
        {...formItemLayout}
        // initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <InputNumber min={0} max={180} step={1} />
        </Form.Item>
        <Form.Item name="phone" label="手机号">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input type="textarea" maxLength={200} placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;

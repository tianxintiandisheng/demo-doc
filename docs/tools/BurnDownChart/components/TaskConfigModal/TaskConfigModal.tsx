import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';
import { CardItem, STATUS_LIST, Status } from '../../BurnDownChart';
import './TaskConfigModal.module.less';


interface Values {
  title: string;
  status: Status;
  workload?: number;
  dateDone?: moment.Moment;
}

export interface TaskConfigModalProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {
  open: boolean;
  curCard?: CardItem;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const TaskConfigModal = (props: TaskConfigModalProps) => {
  const {
    className = '',
    open,
    curCard,
    onCreate,
    onCancel,
    ...otherProps
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (curCard) {
      form.setFieldsValue(curCard);
    }
  }, [curCard?.id]);
  return (
    <div className="TaskConfigModal" {...otherProps}>
      <Modal
        visible={open}
        title="数据同步到微伴"
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              window.console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          // layout="vertical"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select
              options={STATUS_LIST}
              fieldNames={{
                label: 'title',
                value: 'type',
              }}
            />
          </Form.Item>
          <Form.Item name="workload" label="工作量">
            <InputNumber min={0.5} max={10} />
          </Form.Item>
          <Form.Item name="dateDone" label="完成时间">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskConfigModal;
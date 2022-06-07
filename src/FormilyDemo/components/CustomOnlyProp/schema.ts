const formData = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
  },
  schema: {
    type: 'object',
    properties: {
      ke4g04rtzfe: {
        type: 'string',
        title: 'custom-Input',
        'x-decorator': 'FormItem',
        'x-component': 'CustomIput',
        'x-validator': [],
        'x-component-props': {
          placeholder: '占位提示',
          withCount: true,
          maxLength: 20,
        },
        'x-decorator-props': {},
        'x-designable-id': 'ke4g04rtzfe',
        'x-index': 0,
        description: '自定义的input组件',
      },
      l2w708hrhv6: {
        type: 'string',
        title: 'formily-Input',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-validator': [],
        'x-component-props': {
          placeholder: '占位提示',
          withCount: true,
          maxLength: 20,
        },
        'x-decorator-props': {},
        'x-designable-id': 'l2w708hrhv6',
        'x-index': 1,
        description: 'formily封装的input组件',
      },
    },
    'x-designable-id': 'sjo6h5jy439',
  },
};

export default formData;

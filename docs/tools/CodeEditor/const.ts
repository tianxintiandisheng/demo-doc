const INIT_SCHEMA = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
  },
  schema: {
    type: 'object',
    properties: {
      x1wdsenjxi7: {
        type: 'string',
        title: 'Input',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': 'x1wdsenjxi7',
        'x-index': 0,
      },
      '2wuwokqyfq6': {
        title: 'Password',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': '2wuwokqyfq6',
        'x-index': 1,
      },
      '0ghjwfl3qz3': {
        title: 'Select',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': '0ghjwfl3qz3',
        'x-index': 2,
      },
      cv35moyno4r: {
        type: 'Array<string | number>',
        title: 'Checkbox Group',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox.Group',
        enum: [
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ],
        'x-validator': [],
        'x-decorator-props': {},
        'x-designable-id': 'cv35moyno4r',
        'x-index': 3,
      },
      q1ga42sv6m2: {
        type: 'string',
        title: 'DatePicker',
        'x-decorator': 'FormItem',
        'x-component': 'DatePicker',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-reactions': {
          dependencies: [
            {
              property: 'value',
              type: 'Array<string | number>',
              source: 'cv35moyno4r',
              name: 'v_vte884boh8k',
            },
          ],
          fulfill: {
            state: {
              visible: '{{false}}',
            },
          },
        },
        'x-designable-id': 'q1ga42sv6m2',
        'x-index': 4,
      },
      jrbk4z06t6u: {
        type: 'Array<object>',
        title: 'Upload',
        'x-decorator': 'FormItem',
        'x-component': 'Upload',
        'x-component-props': {
          textContent: 'Upload',
          listType: 'picture-card',
        },
        'x-validator': [],
        'x-decorator-props': {},
        'x-designable-id': 'jrbk4z06t6u',
        'x-index': 5,
      },
      ifoz5zi0u4x: {
        type: 'boolean',
        title: 'Switch',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': 'ifoz5zi0u4x',
        'x-index': 6,
      },
    },
    'x-designable-id': '8m0mb7h9vk5',
  },
};

export { INIT_SCHEMA };

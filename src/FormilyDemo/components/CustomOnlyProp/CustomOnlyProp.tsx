import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormProvider, connect, mapProps } from '@formily/react';
import { Form, Input, FormItem } from '@formily/antd';
import formData from './schema';

const { form: formprops, schema } = formData;

const CustomIput = connect(
  Input,
  mapProps((props: any, field) => {
    window.console.log('CustomIput-props', props);
    window.console.log('CustomIput-field', field);
    const { withCount } = props;
    return {
      ...props,
      showCount: withCount, // schema中有一个自定义的属性withCount，input本身没有该属性，需要通过mapProps做映射处理
    };
  }),
);

const SchemaField = createSchemaField({
  components: {
    Form,
    FormItem,
    Input,
    CustomIput,
  },
});

const FormRender = () => {
  const form = useMemo(() => createForm({ validateFirst: true }), []);

  return (
    <FormProvider form={form}>
      <Form {...formprops}>
        <SchemaField schema={schema} />
      </Form>
    </FormProvider>
  );
};

export default FormRender;

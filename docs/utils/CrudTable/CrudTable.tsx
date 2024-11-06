import { Button, Input, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import CollectionCreateForm from './components/CollectionCreateForm';
import { addItem, getConfigList } from './service';
import { UserItem, Values } from './type';

const { Search } = Input;
export interface CrudTableProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {}

const columns: ColumnsType<UserItem> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const CrudTable = (props: CrudTableProps) => {
  const { className = '', ...otherProps } = props;
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [keyword, setKeyword] = useState('');

  const [total, setTotal] = useState(0);
  const [list, setList] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    queryList();
  }, [pageSize, pageNum, keyword]);

  const queryList = () => {
    setLoading(true);
    const params = {
      pageNum, // 页码
      pageSize, // 页大小
      keyword, // 搜索关键词
    };
    getConfigList(params).then((res) => {
      const { success, resultInfo } = res;

      if (success && resultInfo) {
        setTotal(resultInfo.total);
        setList(resultInfo.records);
      }
      setLoading(false);
    });
  };

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values);
    addItem(values).then((res) => {
      if (res.success) {
        message.success('操作成功');
        queryList();
      }
    });
    setOpen(false);
  };

  return (
    <div className={`root_CrudTable${className}`} {...otherProps}>
      <div className="buttonBox_CrudTable">
        <Space style={{ marginBottom: 12 }}>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            添加
          </Button>
          <Search
            placeholder="输入名称进行搜索"
            onSearch={(value: string) => setKeyword(value)}
            style={{ width: 200 }}
          />
        </Space>
      </div>
      <div className="content_CrudTable">
        <Table
          rowKey="userId"
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (totalNum) => `共 ${totalNum} 条`,
            onChange: (page, size) => {
              setPageNum(page);
              setPageSize(size);
            },
          }}
        />
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default CrudTable;

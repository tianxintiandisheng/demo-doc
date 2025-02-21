import { Button, Input, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import CollectionCreateForm from './components/CollectionCreateForm';
import { addItem, editItem, getConfigList ,deleteItem} from './service';
import { ActionType, Item, Values } from './type';

const { Search } = Input;
export interface CrudTableProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {}

const CrudTable = (props: CrudTableProps) => {
  const { className = '', ...otherProps } = props;
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [actionType, setActionType] = useState<ActionType>(ActionType.ADD);
  const [curItem, setCurItem] = useState<Item | undefined>();

  const [total, setTotal] = useState(0);
  const [list, setList] = useState<Item[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    queryList();
  }, [pageSize, pageNum, keyword]);

  const columns: ColumnsType<Item> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
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
          <a
            onClick={() => {
              setActionType(ActionType.EDIT);
              setCurItem(record);
              setOpen(true);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确认要删除当前项吗?"
            onConfirm={() => {
              deleteItem({id: record.id}).then((res)=>{
                const { success, resultInfo } = res;
                if (success && resultInfo) {
                  message.success('删除成功');
                  queryList();
                }
              });
            }}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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

  const onEdit = (values: Values) => {
    console.log('Received values of form: ', values);
    editItem({
      id: (curItem as Item).id,
      ...values,
    }).then((res) => {
      if (res.success) {
        message.success('操作成功');
        queryList();
      }
    });
    setOpen(false);
  };

  return (
    <div className={`root_CrudTable ${className}`} {...otherProps}>
      <div className="buttonBox_CrudTable">
        <Space style={{ marginBottom: 12 }}>
          <Button
            type="primary"
            onClick={() => {
              setActionType(ActionType.ADD);
              setCurItem(undefined);
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
          rowKey="id"
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
          actionType={actionType}
          curItem={curItem}
          open={open}
          onCreate={actionType === ActionType.ADD ? onCreate : onEdit}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default CrudTable;

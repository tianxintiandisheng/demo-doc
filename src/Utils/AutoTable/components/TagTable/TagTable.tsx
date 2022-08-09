/* eslint-disable react/jsx-filename-extension */
import { Button, Table, Space, Alert, Typography, Divider, Input, Select, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect, useRef } from 'react';
import styles from './TagTable.less';

type Gender = 'male' | 'female';
interface TagItem {
  tagName: string; // 类型
  gender: Gender;
  customNum: number;
}
const { Title, Text, Link } = Typography;
const { Search } = Input;
const { Option } = Select;
interface DataType extends TagItem {
  key: React.Key;
}
const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    render: (text) => text.first,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '操作',
    key: 'operation',
    render: () => (
      <Space split={<Divider type="vertical" />}>
        <Typography.Link>编辑</Typography.Link>
        <Typography.Link
          onClick={() => {
            Modal.confirm({
              title: 'This is an error message',
              content: 'some messages...some messages...',
              cancelText: '取消',
              okText: '确定',
            });
          }}
        >
          删除
        </Typography.Link>
      </Space>
    ),
  },
];

export interface TagTableProps extends React.HTMLAttributes<HTMLDivElement> {}

const TagTable = (props: TagTableProps) => {
  const { className = '', ...otherProps } = props;
  const [status, setStatus] = useState<Gender | ''>('');
  const [residueHeight, setResidueHeight] = useState<number>(200);
  const [tagList, setTagList] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const count = 28;
  const inputEl = useRef(null);

  const getResidueHeight = () => {
    const bodyHeight = document.body.offsetHeight; // 网页可见区域高 (包括边线的高)
    const headerHeight = 64; // header高度
    const breadcrumbHeight = 36 + 16 * 2; // 面包屑高度(包括间距)
    const tabHeight = 46 + 16; // tab高度(包括间距)
    const actionHeight = (document.getElementById('action') as HTMLElement).offsetHeight; // 操作区域高度
    const actionMarginBottomHeight = 16; // 操作区域-底部外边距
    const tableHeaderHeight = 55; // table-表头高度
    const paginationHeight = 32 + 16 * 2; // 分页器高度(包括间距)
    const contentPadding = 24 * 3; // content区域的padding
    const residueHeight =
      bodyHeight -
      headerHeight -
      breadcrumbHeight -
      tabHeight -
      actionHeight -
      tableHeaderHeight -
      actionMarginBottomHeight -
      paginationHeight -
      contentPadding;
    return residueHeight;
  };

  useEffect(() => {
    //  const headerHeigt= document.getElementById("header").offsetHeight;
    //  console.log(headerHeigt);
    setResidueHeight(getResidueHeight());

    queryTagList();
    return Modal.destroyAll();
  }, []);
  const queryTagList = () => {
    setLoading(true);

    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    fetch(fakeDataUrl)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // const newData = data.concat(res.results);
        setTagList(res.results);
        setLoading(false);
        console.log('res', res);
      });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: DataType[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
      <div className={styles.header} id="action" ref={inputEl}>
        <Title level={3}>
          <Text>content-</Text>
          <Text>用户列表</Text>
        </Title>
        <div className={styles.actionBox}>
          <Space>
            <Button type="primary" onClick={() => {}}>
              新建标签
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  title: 'This is an error message',
                  content: 'some messages...some messages...',
                  cancelText: '取消',
                  okText: '确定',
                });
              }}
              disabled={!hasSelected}
            >
              批量启用
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  title: 'This is an error message',
                  content: 'some messages...some messages...',
                  cancelText: '取消',
                  okText: '确定',
                });
              }}
              disabled={!hasSelected}
            >
              批量禁用
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  title: 'This is an error message',
                  content: 'some messages...some messages...',
                  cancelText: '取消',
                  okText: '确定',
                });
              }}
              disabled={!hasSelected}
            >
              批量删除
            </Button>
          </Space>
          <Space>
            <Search
              placeholder="名称"
              onSearch={(value) => {
                console.log('名称', value);
              }}
              style={{ width: 200 }}
            />
            <Select
              placeholder="性别"
              style={{ width: 200 }}
              onChange={(value) => {
                console.log('性别', value);
              }}
            >
              <Option value="female">女</Option>
              <Option value="male">男</Option>
            </Select>
          </Space>
        </div>
        <Alert
          style={{ marginBottom: 16 }}
          message={
            <div>
              <Text>总共</Text>
              <Text>{count}</Text>
              <Text>个用户,已选中</Text>
              <Link>{selectedRowKeys.length}</Link>
              <Text>个</Text>
            </div>
          }
          type="info"
          showIcon
          action={
            <Button type="link" onClick={() => setSelectedRowKeys([])}>
              清空
            </Button>
          }
        />
      </div>

      <Table
        rowKey="email"
        loading={loading}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: residueHeight,
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tagList}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (totalNum) => `共 ${totalNum} 条`,
        }}
      />
    </div>
  );
};

export default TagTable;

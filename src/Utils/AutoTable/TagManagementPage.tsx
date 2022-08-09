/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs, Breadcrumb, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import TagTable from './components/TagTable';
import styles from './TagManagementPage.less';

const { TabPane } = Tabs;

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const TagManagementPage = (props: any) => {
  const { type = 'Dom' } = props;
  const onChange = (key: string) => {
    window.console.log(key);
  };
  const renderContent = () => {
    return (
      <div className={styles.content}>
        <Tabs defaultActiveKey="1" onChange={onChange} destroyInactiveTabPane>
          <TabPane tab="用户列表" key="1">
            <div className={styles.tableBox}>
              <TagTable type={type} />
            </div>
          </TabPane>
          <TabPane tab="Tab2" key="2">
            <div className={styles.tableBox}>{/* <TagList /> */}</div>
          </TabPane>
          <TabPane tab="Tab3" key="3">
            <div className={styles.tableBox}>
              {/* <ActionRecordsTable downloadType="IMPORT" /> */}
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  };
  return (
    <div className={`${styles.root}`}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: '#fff',
              }}
            >
              {renderContent()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default TagManagementPage;

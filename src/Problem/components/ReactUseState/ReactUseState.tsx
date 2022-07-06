import React, { useEffect, useState } from 'react';
import { BarChartOutlined, RedoOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Modal, Statistic, Badge } from 'antd';
import { getList, refreshItem, DetailItem, ListItem } from './mock';
import styles from './ReactUseState.less';

export interface ReactUseStateProps extends React.HTMLAttributes<HTMLDivElement> {}

const { Meta } = Card;
const ReactUseState = (props: ReactUseStateProps) => {
  const [list, setList] = useState<ListItem[]>([]);
  const [detailList, setDetailList] = useState<DetailItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getList().then((res: any) => {
      setList(res);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRefresh = (inexNum: number, detailData: DetailItem[]) => {
    // setLoading(true);
    refreshItem(detailData).then((res: any) => {
      console.log('handleRefresh', res);
      list[inexNum].detailList = res;
      console.log('handleRefresh-list', list);
      setList(list);
      // setList(JSON.parse(JSON.stringify(list)));
      // setLoading(false);
    });
  };

  const renderList = () => {
    if (list && list.length > 0) {
      return list.map((i, index) => {
        return (
          <Col key={index} span={8}>
            <Card
              // loading={loading}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Badge count={i.detailList[0].value}>
                  <RedoOutlined
                    style={{ fontSize: 24 }}
                    key="refresh"
                    onClick={() => {
                      handleRefresh(index, i.detailList);
                    }}
                  />
                </Badge>,
                //    <RedoOutlined
                //    style={{ fontSize: 24 }}
                //    key="refresh"
                //    onClick={() => {
                //      handleRefresh(index, i.detailList);
                //    }}
                //  />,
                <BarChartOutlined
                  key="look"
                  style={{ fontSize: 24 }}
                  onClick={() => {
                    setDetailList(i.detailList);
                    showModal();
                  }}
                />,
              ]}
            >
              <Meta avatar={<Avatar src={i.logo} />} title={i.title} description="这里是描述" />
            </Card>
          </Col>
        );
      });
    }
    return null;
  };

  const renderDetailList = () => {
    if (detailList && detailList.length > 0) {
      console.log('detailList', detailList);
      return detailList.map((i) => {
        return (
          <Col key={i.type} span={8}>
            <Statistic title={i.title} value={i.value} />
          </Col>
        );
      });
    }
    return null;
  };
  const { className = '', ...otherProps } = props;
  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
      <Row gutter={16}>{renderList()}</Row>
      <Modal
        title="数据统计"
        destroyOnClose
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={16}>{renderDetailList()}</Row>
      </Modal>
    </div>
  );
};

export default ReactUseState;

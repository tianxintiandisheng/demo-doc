import React, { useEffect, useState } from 'react';
import { BarChartOutlined, RedoOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Statistic, Badge } from 'antd';
import { getList, refreshItem, DetailItem, ListItem } from '../../mock';
import ModalData from '../ModalData';
import styles from './ReactUseStateOutside.less';

export interface ReactUseStateOutsideProps extends React.HTMLAttributes<HTMLDivElement> {}
const { Meta } = Card;
const ReactUseStateOutside = (props: ReactUseStateOutsideProps) => {
  const [list, setList] = useState<ListItem[]>([]);
  const [detailList, setDetailList] = useState<DetailItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
                    showModal();
                    setDetailList(i.detailList);
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
  const { className = '', ...otherProps } = props;
  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
      <Row gutter={16}>{renderList()}</Row>
      <ModalData
        detailList={detailList}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default ReactUseStateOutside;

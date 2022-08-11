import React from 'react';
import { Col, Row, Modal, Statistic } from 'antd';
import { DetailItem } from '../../mock';
import styles from './ModalData.less';

export interface ModalDataProps extends React.HTMLAttributes<HTMLDivElement> {
  detailList: DetailItem[];
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const ModalData = (props: ModalDataProps) => {
  const {
    className = '',
    detailList,
    isModalVisible,
    handleOk,
    handleCancel,
    ...otherProps
  } = props;

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
  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
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

export default ModalData;

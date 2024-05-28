import { Col, List, Row, Typography } from 'antd';
import React, { useState } from 'react';
import ss from './MusicList.module.less';
import { MUSIC_LIST } from './const';
import { LinkedList } from './utils';

const fakeDataUrl = 'https://music.163.com/api/search/pc?type=1&s=我&limit=99'; // 参考资料 https://iobaka.com/blog/5.html
const { Title } = Typography;

let initLinkList = new LinkedList();
initLinkList = initLinkList.arrayToLinkList(MUSIC_LIST.slice(-4));
console.log('🚀 ~ initLinkList:', initLinkList);

export interface MusicListProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {}

const MusicList = (props: MusicListProps) => {
  const [linkList, setLinkList] = useState(initLinkList);
  return (
    <div className={ss.root} style={{ padding: '0 24px' }}>
      <Row gutter={24}>
        <Col className="gutter-row" span={12}>
          <Title level={2}>我的收藏</Title>
          <List
            itemLayout="horizontal"
            pagination={{
              defaultPageSize: 6,
              showSizeChanger: true,
            }}
            dataSource={MUSIC_LIST}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a
                    onClick={() => {
                      linkList.append(item);
                      console.log('🚀 ~ MusicList ~ linkList:', linkList);
                      setLinkList(linkList.createCopy());
                    }}
                  >
                    播放
                  </a>,
                  <a
                    onClick={() => {
                      if(linkList.length()>0){
                        linkList.insertAt(item, 1);
                      }else{
                        linkList.append(item);
                      }
                      console.log('🚀 ~ MusicList ~ linkList:', linkList);
                      setLinkList(linkList.createCopy());
                    }}
                  >
                    下一首播放
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={index + 1}
                  title={`${item.name}-${item.artists}`}
                  description={item.album}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <Title level={2}>播放列表</Title>
          <List
            itemLayout="horizontal"
            pagination={{
              defaultPageSize: 6,
              showSizeChanger: true,
            }}
            dataSource={linkList.toArray()}
            renderItem={(item, index) => {
              if (index === 0) {
                return (
                  <List.Item
                    actions={[
                      <a
                        onClick={() => {
                          linkList.remove(item);
                          setLinkList(linkList.createCopy());
                        }}
                      >
                        删除
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${item.name}-${item.artists}`}
                      description={
                        <div className={ss['marquee-container']}>
                          <div className={ss['marquee']}>{item.album}</div>
                        </div>
                      }
                    />
                  </List.Item>
                );
              }
              return (
                <List.Item
                  actions={[
                    <a
                      onClick={() => {
                        linkList.moveToTop(item);
                        setLinkList(linkList.createCopy());
                      }}
                    >
                      置顶
                    </a>,
                    <a
                      onClick={() => {
                        linkList.remove(item);
                        setLinkList(linkList.createCopy());
                      }}
                    >
                      删除
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    title={`${item.name}-${item.artists}`}
                    description={item.album}
                  />
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MusicList;

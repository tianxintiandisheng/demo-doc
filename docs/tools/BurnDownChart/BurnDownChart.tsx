import { Button, Divider, Form, Input } from 'antd';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { zhCN } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import './BurnDownChart.less';

const { TextArea } = Input;

enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

interface CardItem {
  title: string;
  status: Status;
  description?: string;
  workload?: number;
  dateDone?: Date;
}

export interface BurnDownChartProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {}

const STATUS_LIST = [
  {
    title: '待处理',
    type: Status.TODO,
  },
  {
    title: '处理中',
    type: Status.DOING,
  },
  {
    title: '已完成',
    type: Status.DONE,
  },
];

const BurnDownChart = (props: BurnDownChartProps) => {
  const { className = '', ...otherProps } = props;
  const [selected, setSelected] = useState<Date[] | undefined>();
  const [listToDo, setListToDo] = useState<CardItem[]>([]); // 待处理
  const [listDoing, setListDoing] = useState<CardItem[]>([]); // 处理中
  const [listDone, setListDone] = useState<CardItem[]>([]); // 已完成
  const [curListEnum, setCurListEnum] = useState<Status | undefined>();
  const [withAddForm, setWithAddForm] = useState(false);

  const getListByType = (type) => {
    switch (type) {
      case Status.TODO:
        return listToDo;
      case Status.DOING:
        return listDoing;
      case Status.DONE:
        return listDone;
      default:
        return [];
    }
  };

  const renderCardList = (cardList: CardItem[]) => {
    if (Array.isArray(cardList) && cardList.length > 0) {
      return cardList.map((item, index) => (
        <div className="card-item" key={index}>
          <div>{item.title}</div>
          <div>状态：{item.status}</div>
          {/* <div>完成日期：{item.dateDone?.toLocaleDateString()}</div> */}
        </div>
      ));
    }
    return null;
  };

  const renderAddForm = () => {
    if (withAddForm) {
      return (
        <>
          {/* <div className="btn-list">
            <Button type="primary">确认</Button>
            <Button>取消</Button>
          </div> */}
          <Form
            onFinish={(values: any) => {
              console.log(values);
              if (curListEnum) {
                let tempList: CardItem[] = [...getListByType(curListEnum)];
                tempList.push({
                  title: values.tile,
                  status: curListEnum,
                });
                switch (curListEnum) {
                  case Status.TODO:
                    setListToDo(tempList);
                    break;
                  case Status.DOING:
                    setListDoing(tempList);
                    break;
                  case Status.DONE:
                    setListDone(tempList);
                    break;
                  default:
                    break;
                }
              }
            }}
          >
            <Form.Item
              // label="Username"
              name="tile"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="请输入" rows={4} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
              <Button>取消</Button>
            </Form.Item>
          </Form>
        </>
      );
    }
  };
  return (
    <div className="BurnDownChart-root" {...otherProps}>
      <DayPicker
        locale={zhCN}
        mode="multiple"
        selected={selected}
        onSelect={setSelected}
      />
      <Divider />
      <div className="list-content">
        {STATUS_LIST.map((i) => {
          return (
            <div key={i.type} className="card-list">
              <div className="list-title">{i.title}</div>
              <div className="list-body">
                {renderCardList(getListByType(i.type))}
              </div>
              <div className="list-footer">
                {curListEnum === i.type && renderAddForm()}
                <Button
                  type="link"
                  onClick={() => {
                    setCurListEnum(i.type);
                    setWithAddForm(true);
                  }}
                >
                  添加卡片
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BurnDownChart;

import { Button, Divider, Form, Input } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { zhCN } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { v4 as uuidv4 } from 'uuid';
import './BurnDownChart.less';
import TaskConfigModal from './components/TaskConfigModal';

const { TextArea } = Input;

export enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export interface CardItem {
  id: string; // 唯一id
  title: string;
  status: Status;
  description?: string;
  workload?: number;
  dateDone?: moment.Moment;
}

moment().format()
export interface BurnDownChartProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {}

export const STATUS_LIST = [
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

const dateFormat = 'YYYY/MM/DD';


const BurnDownChart = (props: BurnDownChartProps) => {
  const { className = '', ...otherProps } = props;
  const [selected, setSelected] = useState<Date[] | undefined>();
  const [listToDo, setListToDo] = useState<CardItem[]>([]); // 待处理
  const [listDoing, setListDoing] = useState<CardItem[]>([]); // 处理中
  const [listDone, setListDone] = useState<CardItem[]>([]); // 已完成
  const [curCard, setCurCard] = useState<CardItem>();
  const [curListEnum, setCurListEnum] = useState<Status | undefined>();
  const [withAddForm, setWithAddForm] = useState(false);
  const [open, setOpen] = useState(false);

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
  const updateListByType = (type: Status, list: CardItem[]) => {
    switch (type) {
      case Status.TODO:
        setListToDo(list);
        break;
      case Status.DOING:
        setListDoing(list);
        break;
      case Status.DONE:
        setListDone(list);
        break;
      default:
        break;
    }
  };

  const renderCardList = (cardList: CardItem[], type: Status) => {
    if (Array.isArray(cardList) && cardList.length > 0) {
      return cardList.map((item) => (
        <div
          className="card-item"
          key={item.id}
          onClick={() => {
            setCurListEnum(type);
            setCurCard(item);
            setOpen(true);
          }}
        >
          <div>{item.title}</div>
          <div>工作量：{item.workload}</div>
          {item.dateDone && (
            <div>完成日期：{item.dateDone?.format(dateFormat)}</div>
          )}
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
            style={{
              padding: '4px 15px 0 15px',
            }}
            onFinish={(values: any) => {
              console.log(values);
              if (curListEnum) {
                let tempList: CardItem[] = [...getListByType(curListEnum)];
                tempList.push({
                  id: uuidv4(),
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 4 }}
              >
                确认
              </Button>
              <Button
                onClick={() => {
                  setWithAddForm(false);
                  setSelected(undefined);
                }}
              >
                取消
              </Button>
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
              <Divider style={{ margin: '12px 0' }} />
              {curListEnum === i.type && renderAddForm()}
              <div className="list-body">
                {renderCardList(getListByType(i.type), i.type)}
              </div>
              <div className="list-footer">
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
      {open && (
        <TaskConfigModal
          open={open}
          curCard={curCard}
          onCreate={(value) => {
            console.log('🚀 ~ BurnDownChart ~ value:', value);
            let tempList = [...getListByType(curListEnum)];
            tempList = tempList.map((i) => {
              if (i.id === curCard?.id) {
                return {
                  id: i.id,
                  ...value,
                };
              }
              return i;
            });
            if (curListEnum) {
              updateListByType(curListEnum, tempList);
              setOpen(false);
            }
          }}
          onCancel={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default BurnDownChart;

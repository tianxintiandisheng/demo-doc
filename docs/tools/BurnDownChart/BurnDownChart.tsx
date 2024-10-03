import { Badge, Button, Divider, Form, Input } from 'antd';
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
  dateDone?: string;
}
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

interface Plot {
  series: string;
  x: string;
  y: number;
}

const dateFormat = 'YYYY/MM/DD';

function sumWorkloads(cardItems: CardItem[]): number {
  return cardItems.reduce((sum, item) => {
    if (item.workload !== undefined) {
      return sum + item.workload;
    }
    return sum;
  }, 0);
}

const BurnDownChart = (props: BurnDownChartProps) => {
  const { className = '', ...otherProps } = props;
  const [selected, setSelected] = useState<Date[] | undefined>();
  const [listAll, setListAll] = useState<CardItem[]>([]); // 全部
  const [curCard, setCurCard] = useState<CardItem>();
  const [curListEnum, setCurListEnum] = useState<Status | undefined>();
  const [withAddForm, setWithAddForm] = useState(false);
  const [open, setOpen] = useState(false);

  const getCharData = () => {
    if (selected) {
      // console.log('🚀 ~ getCharData ~ selected:', selected);
      console.log('🚀 ~ getCharData ~ dateStrList:', selected);
      window.localStorage.setItem(
        'dateStrList',
        JSON.stringify(selected.map((i) => moment(i).format('YYYY-MM-DD'))),
      );
    }
    if (listAll) {
      window.localStorage.setItem('listAll', JSON.stringify(listAll));
    }
    if (selected && listAll) {
      const totalWorkload = sumWorkloads(listAll); // 计算总工作量
      // const dateList = selected.map((i) => moment(i).format('YYYY-MM-DD'));//  转换日期列表
      const guideDailyWorkload = totalWorkload / selected.length; // 计算每天的理想工作量

      const dataGuide: Plot[] = selected.map((i, index) => ({
        series: '参考线',
        x: moment(i).format('YYYY-MM-DD'),
        // x: i,
        y: totalWorkload - guideDailyWorkload * (index + 1),
      }));
      const dataReal: Plot[] = []; // 实际线数据
      let remainingWorkload = totalWorkload; // 声明中间变量，用于循环
      for (const date of selected) {
        // 找出在当前日期之前完成的所有任务
        const completedTasks = listAll.filter(
          (item) =>
            item.dateDone && moment(item.dateDone).isSameOrBefore(date, 'day'),
        );
        console.log('🚀 ~ getCharData ~ completedTasks:', completedTasks);
        const completedWorkload = completedTasks.reduce(
          (sum, item) => sum + (item.workload || 0),
          0,
        );
        const remaining = totalWorkload - completedWorkload;

        dataReal.push({
          series: 'Actual',
          x: moment(date).format('YYYY-MM-DD'),
          // x: i,
          y: remaining,
        });
        // 更新剩余工作量
        remainingWorkload = remaining;
      }
      console.log('🚀 ~ getCharData ~ dataGuide:', [...dataGuide, ...dataReal]);
      return [...dataGuide, ...dataReal];
    }
  };

  const loadData = () => {
    const dateStrList = window.localStorage.getItem('dateStrList');
    const listAllStr = window.localStorage.getItem('listAll');
    if (dateStrList) {
      const dateStrListArr = JSON.parse(dateStrList);
      setSelected(dateStrListArr.map((i) => moment(i, dateFormat).toDate()));
    }
    if (listAllStr) {
      const listAllArr = JSON.parse(listAllStr);
      setListAll(listAllArr);
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
          <div>
            {item?.workload && <Badge count={item?.workload} color="#40a9ff" />}
          </div>
          {item.dateDone && <div>完成日期：{item.dateDone}</div>}
        </div>
      ));
    }
    return null;
  };

  const renderAddForm = () => {
    if (withAddForm) {
      return (
        <>
          <Form
            style={{
              padding: '4px 15px 0 15px',
            }}
            onFinish={(values: any) => {
              console.log(values);
              if (curListEnum) {
                let tempList: CardItem[] = [...listAll];
                tempList.push({
                  id: uuidv4(),
                  title: values.tile,
                  status: curListEnum,
                });
                setListAll(tempList);
              }
            }}
          >
            <Form.Item name="tile" rules={[{ required: true }]}>
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
                {renderCardList(
                  listAll.filter((j) => j.status === i.type),
                  i.type,
                )}
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
      <Divider />
      <Button
        onClick={() => {
          getCharData();
        }}
      >
        生成数据
      </Button>
      <Button
        onClick={() => {
          loadData();
        }}
      >
        读取数据
      </Button>
      {open && (
        <TaskConfigModal
          open={open}
          curCard={curCard}
          onCreate={(value) => {
            console.log('🚀 ~ BurnDownChart ~ value:', value);
            let tempList = [...listAll];
            tempList = tempList.map((i) => {
              if (i.id === curCard?.id) {
                return {
                  ...value,
                  id: i.id,
                  dateDone: value.dateDone?.format('YYYY-MM-DD') || '',
                };
              }
              return i;
            });
            if (curListEnum) {
              setListAll(tempList);
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

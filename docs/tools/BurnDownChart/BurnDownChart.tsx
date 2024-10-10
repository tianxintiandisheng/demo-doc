import { Badge, Button, Descriptions, Divider, Form, Input, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { zhCN } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { v4 as uuidv4 } from 'uuid';
import './BurnDownChart.less';
import LineChart from './components/LineChart';
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

const handleDownload = (data, filename) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

interface Plot {
  series: string;
  x: string | number;
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
  const [data, setData] = useState<Plot[]>([]);
  const [curCard, setCurCard] = useState<CardItem>();
  const [curListEnum, setCurListEnum] = useState<Status | undefined>();
  const [withAddForm, setWithAddForm] = useState(false);
  const [open, setOpen] = useState(false);

  const getCharData = () => {
    if (selected) {
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
      const guideDailyWorkload = totalWorkload / selected.length; // 计算每天的理想工作量

      const dataGuide: Plot[] = selected.map((i, index) => ({
        series: '参考线',
        x: moment(i).format('MM-DD'),
        // x: i,
        y: totalWorkload - guideDailyWorkload * (index + 1),
      }));
      const dataReal: Plot[] = []; // 实际线数据
      let remainingWorkload = totalWorkload; // 声明中间变量，用于循环
      const beforeTodaySelect: Date[] = selected.filter((i, index) =>
        moment(i).isSameOrBefore(moment(), 'day'),
      ); // 获取今天以及之前的日期
      console.log('🚀 ~ getCharData ~ beforeTodaySelect:', beforeTodaySelect);
      for (const date of beforeTodaySelect) {
        // 找出在当前日期之前完成的所有任务
        const completedTasks = listAll.filter(
          (item) =>
            item.dateDone && moment(item.dateDone).isSameOrBefore(date, 'day'),
        );
        const completedWorkload = completedTasks.reduce(
          (sum, item) => sum + (item.workload || 0),
          0,
        );
        const remaining = totalWorkload - completedWorkload;

        dataReal.push({
          series: '实际线',
          x: moment(date).format('MM-DD'),
          // x: i,
          y: remaining,
        });
        // 更新剩余工作量
        remainingWorkload = remaining;
      }

      const initData = [
        {
          series: '参考线',
          x: 0,
          y: totalWorkload,
        },
        {
          series: '实际线',
          x: 0,
          y: totalWorkload,
        },
      ];
      setData([...initData, ...dataGuide, ...dataReal]);
      return [...initData, ...dataGuide, ...dataReal];
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
      <Space>
        <Button
          onClick={() => {
            loadData();
          }}
        >
          读取数据
        </Button>
        <Button
          onClick={() => {
            getCharData();
          }}
        >
          生成图表
        </Button>
        <Button
          onClick={() => {
            const data = {
              selected: selected?.map((i) => moment(i).format('YYYY-MM-DD')),
              listAll,
            };
            handleDownload(data, 'chartData');
          }}
        >
          下载数据
        </Button>
      </Space>

      <Descriptions title="User Info">
        <Descriptions.Item label="总工作量">
          {sumWorkloads(listAll)}
        </Descriptions.Item>
        <Descriptions.Item label="已完成">
          {sumWorkloads(listAll.filter((i) => i.status === Status.DONE))}
        </Descriptions.Item>
        <Descriptions.Item label="剩余">
          {sumWorkloads(listAll.filter((i) => i.status !== Status.DONE))}
        </Descriptions.Item>
      </Descriptions>
      <LineChart data={data} />
      {open && (
        <TaskConfigModal
          open={open}
          curCard={curCard}
          selectOption={
            selected?.map((i) => {
              return {
                value: moment(i).format('YYYY-MM-DD'),
                label: moment(i).format('YYYY-MM-DD'),
              };
            }) || []
          }
          onCreate={(value) => {
            console.log('🚀 ~ BurnDownChart ~ value:', value);
            let tempList = [...listAll];
            tempList = tempList.map((i) => {
              if (i.id === curCard?.id) {
                let tempDate = '';
                if (value.status === Status.DONE) {
                  // 状态为已完成时，如果没有设置完成日期，默认为当天
                  tempDate = value.dateDone
                    ? value.dateDone
                    : moment().format('YYYY-MM-DD');
                }
                return {
                  ...value,
                  id: i.id,
                  dateDone: tempDate,
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

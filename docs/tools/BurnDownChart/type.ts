/**
 * 枚举类型用来表示任务的状态
*/
export enum Status {
  TODO = 'TODO', // 待处理
  DOING = 'DOING', // 处理中
  DONE = 'DONE', // 已完成
}

/**
 * 单个卡片（任务）的interface
*/
export interface CardItem {
  id: string; // 唯一id
  title: string; // 任务标题
  status: Status; // 任务状态
  description?: string; // 描述
  owner?: string; // 负责人
  workload?: number; // 工作量
  dateDone?: string; // 完成日期；格式为 'YYYY-MM-DD'
}

/**
 * 整个数据对象的接口，包含日期列表和所有任务的列表
*/
export interface DataObj {
  dateList: string[]; // 日期列表
  taskList: CardItem[]; // 任务列表
}

/**
 * 用于绘制图表的点
*/
export interface Plot {
  series: string;
  x: string | number;
  y: number;
}

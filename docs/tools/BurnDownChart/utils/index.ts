import moment from 'moment';
import { customAlphabet } from 'nanoid';
import * as XLSX from 'xlsx';
import { CardItem, DataObj } from '../type.ts';

// 配置短ID生成器（5位，排除易混淆字符）
const generateShortId = customAlphabet('23456789abcdefghjkmnpqrstuvwxyz', 5);

/**
 * 将 DataObj 保存为 JSON 文件
 * @param data - 要保存的 DataObj 数据
 */
const saveAsJsonFile = (data: DataObj) => {
  // 将 DataObj 转换为格式化的 JSON 字符串
  const jsonString = JSON.stringify(data, null, 2);
  // 创建 Blob 对象
  const blob = new Blob([jsonString], { type: 'application/json' });
  // 创建下载链接
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data_obj.json';
  a.click();
  // 释放 URL 对象
  window.URL.revokeObjectURL(url);
};

/**
 * @function 处理上传的JSON文件并解析为DataObj
 * @param {File} file  文件数据
 * @param {function} onSuccess 解析成功的回调
 */
const handleJsonFileUpload = (onSuccess, file?: File) => {
  // const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e?.target?.result;
    if (typeof result === 'string') {
      try {
        // 解析 JSON 字符串为 DataObj
        const data: DataObj = JSON.parse(result);
        onSuccess(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  };

  // 读取文件内容为文本
  reader.readAsText(file);
};

/**
 * 将 DataObj 保存为 Excel 文件
 * @param data - 要保存的 DataObj 数据
 */
const saveAsExcelFile = (data: DataObj) => {
  const workbook = XLSX.utils.book_new();

  // 定义固定的 Headers（确保涵盖所有可能的字段）
  const taskListHeaders = [
    'id',
    'title',
    'status',
    'workload',
    'dateDone',
    'owner',
    'description',
  ];

  // 生成 taskList 数据（确保每行列数一致）
  const listAllData = [
    taskListHeaders, // 第一行为 Headers
    ...data.taskList.map((item) =>
      taskListHeaders.map((header) => item[header as keyof CardItem] ?? ''),
    ),
  ];

  const listAllWorksheet = XLSX.utils.aoa_to_sheet(listAllData);
  XLSX.utils.book_append_sheet(workbook, listAllWorksheet, 'Tasks');

  // 处理 dateList（保持不变）
  const dateListWorksheet = XLSX.utils.aoa_to_sheet([
    ['Date'],
    ...data.dateList.map((date) => [date]),
  ]);
  XLSX.utils.book_append_sheet(workbook, dateListWorksheet, 'Dates');

  // 生成并下载 Excel 文件（保持不变）
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data_obj.xlsx';
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * @function 处理上传的Excel文件并解析为DataObj
 * @description
 * 1. 读取Excel文件的两个sheet：
 *    - Sheet1: 任务列表数据（自动处理日期格式和空值）
 *    - Sheet2: 纯日期列表数据（要求第一列为日期，支持文本/日期格式）
 * 2. 自动生成唯一ID逻辑
 * 3. 数据清洗和格式标准化处理
 *
 * @param {function} onSuccess - 解析成功后的回调函数，接收 DataObj 格式数据
 * @param {File} [file] - 上传的Excel文件对象
 *
 * @typedef DataObj
 * @property {CardItem[]} taskList - 任务列表（来自Sheet1）
 * @property {string[]} dateList - 日期列表（来自Sheet2第一列）
 */
const handleExcelFileUpload = (
  onSuccess: (data: DataObj) => void,
  file?: File,
) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    // ================= 文件读取和解析 =================
    const arrayBuffer = e.target?.result as ArrayBuffer;
    const data = new Uint8Array(arrayBuffer);
    // 使用 xlsx 库解析二进制数据
    const workbook = XLSX.read(data, { type: 'array' });

    // ================= Sheet1处理（任务列表） =================
    const sheet1 = workbook.Sheets[workbook.SheetNames[0]];
    const listAllJson: any[][] = XLSX.utils.sheet_to_json(sheet1, {
      header: 1, // 以数组形式返回数据
      raw: false, // 自动转换日期/公式为字符串
      defval: null, // 空单元格默认赋值为null（便于后续过滤）
    });

    // 过滤有效行（至少有一个非空单元格的行）
    const validRows = listAllJson.filter((row) =>
      row.some((cell) => cell !== null && cell !== undefined),
    );

    // 安全获取表头（空文件保护）
    const headers = (validRows || [])[0].map(String); // 强制转为字符串避免类型问题

    // 任务列表数据处理流程
    const taskList: CardItem[] = validRows
      .slice(1) // 跳过表头行
      .map((row) => {
        const item: any = {};
        // 列遍历（动态适配Excel列顺序）
        for (let i = 0; i < headers.length; i++) {
          const key = headers[i];
          const value = row[i];
          // 有效值处理（过滤null/undefined）
          if (key && value !== null && value !== undefined) {
            if (key === 'dateDone') {
              const date = moment(value);
              item[key] = date.format('YYYY/MM/DD');
            } else if (key === 'workload') {
              item[key] = Number(value);
            } else {
              item[key] = value;
            }
          }
        }

        // ID生成逻辑（兼容空值/空字符串/无效值）
        if (!item.id || String(item.id).trim() === '') {
          item.id = generateShortId(); // 生成5位安全短ID
        }
        return item;
      })
      .filter((item) => Object.keys(item).length > 0); // 过滤完全空的行

    // ================= Sheet2处理（日期列表） =================
    const sheet2 = workbook.Sheets[workbook.SheetNames[1]];
    const dateListJson: any[][] = XLSX.utils.sheet_to_json(sheet2, {
      header: 1,
      raw: false, // 确保日期自动转为字符串（如"2023/03/15"）
      defval: '', // 空单元格赋值为空字符串
    });

    // 日期数据清洗流程
    const dateList: string[] = dateListJson
      .slice(1) // 跳过表头行
      .map((row) => moment(row[0]).format('YYYY/MM/DD')) // 取第一列并标准化为字符串
      .filter((dateStr) => dateStr !== ''); // 过滤空日期

    // ================= 结果输出 =================
    const dataObj: DataObj = {
      taskList, // 处理后的任务数据
      dateList, // 清洗后的日期列表
    };
    console.log('处理结果验证:', {
      taskListSample: taskList.slice(0, 3), // 输出前3项样本
      dateListSample: dateList.slice(0, 5), // 输出前5个日期
    });
    console.log('处理结果验证:', dataObj);
    onSuccess(dataObj); // 触发回调传递数据
  };

  // 启动文件读取（ArrayBuffer格式）
  reader.readAsArrayBuffer(file);
};

/**
 * @function 验证DataObj合法性
 */
const checkData = (dataObj: DataObj) => {
  const { dateList, taskList } = dataObj;
  if (
    Array.isArray(dataObj.dateList) &&
    Array.isArray(dataObj.taskList) &&
    dateList.length > 0 &&
    taskList.length > 0
  ) {
    return true;
  }
  return false;
};

// 导出函数
export {
  checkData,
  handleExcelFileUpload,
  handleJsonFileUpload,
  saveAsExcelFile,
  saveAsJsonFile,
};

// dataObj为测试数据
// const dataObj: DataObj = {
//   taskList: [
//     { id: '1', title: 'Task 1', status: Status.TODO, description: 'Description 1', workload: 3 },
//     { id: '2', title: 'Task 2', status: Status.DOING, description: 'Description 2', workload: 5, dateDone: '2023-10-01' },
//     { id: '3', title: 'Task 3', status: Status.DONE, description: 'Description 3', workload: 2, dateDone: '2023-10-02' },
//     { id: '3', title: 'Task 3', status: Status.DONE, description: 'Description 3', workload: 2, dateDone: '2023-10-02' },
//     { id: '4', title: 'Task 4', status: Status.DONE,  workload: 2, dateDone: '2023-10-02',owner:'tds' },
//   ],
//   dateList: ['2023-10-01', '2023-10-02', '2023-10-03'],
// };

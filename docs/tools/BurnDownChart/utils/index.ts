import { customAlphabet } from 'nanoid';
import * as XLSX from 'xlsx';
import { CardItem, DataObj, Status } from '../type.ts';

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
 * @function 处理上传的 Excel 文件并解析为 DataObj
 * @param {File} file  文件数据
 * @param {function} onSuccess 解析成功的回调
 */
const handleExcelFileUpload = (onSuccess, file?: File) => {
  // const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e?.target?.result as ArrayBuffer;
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });

    // 读取 Sheet1
    const sheet1Name = workbook.SheetNames[0];
    const sheet1 = workbook.Sheets[sheet1Name];
    const listAllJson: string[][] = XLSX.utils.sheet_to_json(sheet1, {
      header: 1,
    });
    const headers = listAllJson[0] as string[];
    const taskList: CardItem[] = listAllJson.slice(1).map((row) => {
      const item: any = {};
      for (let i = 0; i < headers.length; i++) {
        const key = headers[i];
        const value = row[i];
        if (key === 'status') {
          item[key] = value as Status;
        } else if (value !== undefined && value !== null) {
          item[key] = value;
        }
      }
      // 自动生成ID逻辑
      if (
        !item.id || // 如果ID字段不存在
        (typeof item.id === 'string' && item.id.trim() === '') || // 或为空字符串
        item.id.toString().trim() === '' // 或其他类型转字符串后为空
      ) {
        item.id = generateShortId(); // 生成唯一短ID
      }
      return item as CardItem;
    });

    // 读取 Sheet2
    const sheet2Name = workbook.SheetNames[1];
    const sheet2 = workbook.Sheets[sheet2Name];
    const dateListJson: string[][] = XLSX.utils.sheet_to_json(sheet2, {
      header: 1,
    });
    const dateList: string[] = dateListJson.slice(1).map((row) => row[0]);

    // 组合成 DataObj
    const dataObj: DataObj = {
      taskList,
      dateList,
    };
    console.log('🚀 ~ handleExcelFileUpload ~ dataObj:', dataObj);
    onSuccess(dataObj);
  };

  // 读取文件内容为 ArrayBuffer
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

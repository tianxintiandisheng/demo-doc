import { del, get, post, put } from './request';
import { Values ,Item} from './type';

interface ResCommon {
  errCode?: number | string | null;
  success?: boolean;
  errorMsg?: string | null;
}

/**
 * 操作通用的返回，一般只有一个布尔值
 */
type ResAction<T = any> = ResCommon & {
  data: T;
  resultInfo?: boolean;
};


/**
 * 列表常用的返回；，一般有页面尺寸，总数，列表数组
 */
type ResGetList<T = any> = ResCommon & {
  data: T;
  resultInfo?: {
    pageNum: number;
    total: number;
    records: Item[];
  };
};

/**
 * @function 新增
 * @desc
 */
export const addItem = (params: Values): Promise<ResAction> =>
  post('/api/item/add', params);

/**
 * @function 根据id删除
 */
export const deleteItem = (params: { id: string }): Promise<ResAction> =>
  del('/api/item/delete', params);

/**
 * @function 根据id修改
 */
export const editItem = (params:Item): Promise<ResAction> => put('/api/item/edit', params);

/**
 * @function 查询列表
 */
export const getConfigList = (params: {
  pageNum: number;
  pageSize: number;
}): Promise<ResGetList> => get('/api/item/list', params);

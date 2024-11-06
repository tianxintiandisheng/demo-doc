import { del, get, post, put } from './request';
import { Values ,UserItem} from './type';

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
    records: UserItem[];
  };
};

/**
 * @function 新增用户
 * @desc
 */
export const addItem = (params: Values): Promise<ResAction> =>
  post('/api/item/add', params);

/**
 * @function 根据id删除用户
 */
export const deleteItem = (params: { id: string }): Promise<ResAction> =>
  del('/api/item/delete', params);

/**
 * @function 根据id修改用户信息
 */
export const editItem = (params: {
  id: string;
  name: string;
}): Promise<ResAction> => put('/api/item/edit', params);

/**
 * @function 查询用户列表
 */
export const getConfigList = (params: {
  pageNum: number;
  pageSize: number;
}): Promise<ResGetList> => get('/api/item/list', params);

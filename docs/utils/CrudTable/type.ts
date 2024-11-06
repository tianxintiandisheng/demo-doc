export interface UserItem {
  userId: string;
  name: string;
  age?: number;
  phone?: string;
  remark?: string;
}

export type Values = Omit<UserItem, 'userId'>

export enum ActionType {
  ADD = 'ADD',
  EDIT = 'EDIT',
}
export interface Item {
  id: string;
  name: string;
  age?: number;
  phone?: string;
  remark?: string;
}

export type Values = Omit<Item, 'id'>

export enum ActionType {
  ADD = 'ADD',
  EDIT = 'EDIT',
}
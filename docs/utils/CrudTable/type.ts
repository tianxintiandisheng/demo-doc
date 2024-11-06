export interface UserItem {
  userId: number;
  name: string;
  age?: number;
  phone?: string;
  remark?: string;
}

export type Values = Omit<UserItem, 'userId'>
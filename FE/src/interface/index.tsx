export interface IRole {
  key?: React.Key;
  id?: number;
  name: string;
  description: string;
}

export interface IRoleLable {
  staff: string;
  stocker: string;
  admin: string
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IInventory {
  key?: number | string;
  id?: number;
  code: string;
  name: string;
  address: string;
  createAt?: any;
  updateAt?: any;
  isDelete?: boolean;
}


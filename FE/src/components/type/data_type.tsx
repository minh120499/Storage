export interface exportInventory {
  id: number;
  code: string;
  name: string;
  address: string;
  createAt: string;
  updateAt: null;
  isDelete: boolean;
}
export interface receiveInventory {
  id: number;
  code: string;
  name: string;
  address: string;
  createAt: string;
  updateAt: null;
  isDelete: boolean;
}
export interface exportValue {
  exportInventory?: number | undefined;
  receiveInventory?: number | undefined;
}
export interface DataType {
  getProductById?: any;
  id?: number;
  code?: string;
  name?: string;
  product?: {};
  stock?: number;
  quantity?: number;
}

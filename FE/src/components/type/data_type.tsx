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
  exportInventory?: exportInventory | undefined;
  receiveInventory?: receiveInventory | undefined;
}

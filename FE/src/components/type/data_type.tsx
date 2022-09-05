export interface inventory {
  id?: number;
  code?: string;
  name?: string;
  address?: string;
  createAt?: string;
  updateAt?: null;
  isDelete?: boolean;
}
// export interface receiveInventory {
//   id?: number;
//   code?: string;
//   name?: string;
//   address?: string;
//   createAt?: string;
//   updateAt?: null;
//   isDelete?: boolean;
// }
export interface exportValue {
  exportInventory?: inventory;
  receiveInventory?: inventory;
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
export interface exportById {
  id?: number;
  receiveInventory?: inventory;
  status?: number;
  transportCompany?: number;
  account?: number;
  createAt?: string;
  updateAt?: string;
  exportInventory?: inventory;
}
export interface typeDetailExport {
  id?: number;
  export?: number;
  productVariant?: productVariants;
  quantity?: number;
  code?: string;
}
export interface productVariants {
  id?: number;
  code?: string;
  productId?: number;
  name?: string;
  image?: string;
  wholesalePrice?: number;
  salePrice?: number;
  importPric?: number;
}
export interface exportStatus {
  id?: number;
  code?: string;
  export?: number;
  status?: number;
  accountCreate?: number;
  accountSend?: number;
  accountReceive?: number;
  createAt?: string;
  dateSend?: string;
  dateReceive?: string;
}
export interface listExport {
  exportById?: exportById;
  typeDetailExport?: typeDetailExport;
  exportStatus?: exportStatus;
}

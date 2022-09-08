import axios from "axios";
import { IMinQuantityRequest, IResultId } from "../interface";

export const getAllInventory = async () => {
  return (await axios.get(`http://localhost:8080/inventories`)).data;
};

export const getAllActiveInventory = async () => {
  return await axios.get(`http://localhost:8080/inventories/active`);
};

export const getPagination = async (page: number, pageSize: number) => {
  return (
    await axios.get(`http://localhost:8080/inventories/pagination`, {
      params: {
        pageNumber: page,
        pageSize,
      },
    })
  ).data;
};

export const findInventoryById = async (id?: number) => {
  return (await axios.get(`http://localhost:8080/inventories/${id}`)).data;
};

export const createInventory = async (inventory: object) => {
  return (await axios.post(`http://localhost:8080/inventories`, inventory))
    .data;
};

export const updateInvetory = async (inventory: object, id: number) => {
  return (await axios.put(`http://localhost:8080/inventories/${id}`, inventory))
    .data;
};

export const deleteInvetory = async (id: number) => {
  return await axios.put(`http://localhost:8080/inventories/delete/${id}`);
};

export const getProductVariants = async (id?: number, name = "") => {
  return (
    await axios.get(`http://localhost:8080/inventories/productvariant/${id}`, {
      params: {
        name: name,
      },
    })
  ).data;
};

export const deleteListProductVariant = async (resultId: IResultId) => {
  return await axios.post(`http://localhost:8080/inventories/delete`, resultId);
};

export const updateMinQuantityStorage = async (
  request: IMinQuantityRequest
) => {
  console.log(request);

  return await axios.put(
    `http://localhost:8080/inventories/change/minquantity?inventoryId=${
      request.inventoryId * 1
    }&productVariantId=${request.productVariantId * 1}&minQuantity=${
      request.minQuantity * 1
    }`
  );
};

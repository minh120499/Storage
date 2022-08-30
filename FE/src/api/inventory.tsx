import axios from "axios";

export const getAllInventory = async () => {
  return (await axios.get(`http://localhost:8080/inventories`)).data;
};
export const findInventoryById = async (id?: number) => {
  return (await axios.get(`http://localhost:8080/inventories/${id}`)).data;
};

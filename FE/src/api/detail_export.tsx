import axios from "axios";

type value = {
  export: number;
  productVariant: number;
  quantity: number;
};

export const creatDetailExport = async (item: value[]) => {
  return await axios.post(`http://localhost:8080/details/createAll`, item);
};
export const findDetailByExport = async (id?: number) => {
  return await (await axios.get(`http://localhost:8080/details/getByExport/${id}`)).data;
};
  
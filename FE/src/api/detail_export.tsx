import axios from "axios";
import {
  productVariants,
  typeDetailExport,
} from "../components/type/data_type";

type value = {
  export: number;
  productVariant: productVariants;
  quantity: number;
  code: string;
};

export const creatDetailExport = async (item: value[]) => {
  return await axios.post(`http://localhost:8080/details/createAll`, item);
};
export const findDetailByExport = async (
  id?: number
): Promise<typeDetailExport[]> => {
  return (await axios.get(`http://localhost:8080/details/getByExport/${id}`))
    .data;
};
export const getDetailExport = async () => {
  return (await axios.get(`http://localhost:8080/details`)).data;
};
export const deleteDetailExport = async (id?: number) => {
  return (await axios.delete(`http://localhost:8080/details/${id}`)).data;
};
export const deleteDetailByExport = async (id?: number) => {
  return (await axios.delete(`http://localhost:8080/details/getByExport/${id}`))
    .data;
};

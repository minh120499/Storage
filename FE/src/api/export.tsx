import axios from "axios";
import {
  exportById,
  exportValue,
  paramExport,
  typeDetailExport,
} from "../components/type/data_type";

export const getExport = async (params : paramExport) => {
  return (
    await axios.get(`http://localhost:8080/exports/getExportByAll`, {
      params: params
    })
  ).data;
};
export const createExport = async (item?: exportValue) => {
  return await axios.post(`http://localhost:8080/exports`, item);
};
export const updateExport = async (id?: number, item?: exportById) => {
  return await axios.patch(`http://localhost:8080/exports/${id}`, item);
};
export const findExportById = async (id?: number) => {
  return (await axios.get(`http://localhost:8080/exports/${id}`)).data;
};
export const addExportByInventory = async (
  id?: number,
  item?: typeDetailExport[]
) => {
  return (await axios.put(`http://localhost:8080/exports/add/${id}`, item))
    .data;
};
export const importExportByInventory = async (
  id?: number,
  item?: typeDetailExport[]
) => {
  return (await axios.put(`http://localhost:8080/exports/import/${id}`, item))
    .data;
};

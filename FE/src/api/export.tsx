import axios from "axios";
import {exportValue, inventory} from "../components/type/data_type";

export const createExport = async (item: { receiveInventory: inventory; exportInventory: inventory }) => {
  return await axios.post(`http://localhost:8080/exports`, item);
};
export const findExportById = async (id?: number) => {
  return (await axios.get(`http://localhost:8080/exports/${id}`)).data;
};

export class getExport {
}
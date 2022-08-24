import axios from "axios";
import { exportValue } from "../components/type/data_type";

export const createExport = async (item : exportValue) => {
    return await axios.post(`http://localhost:8080/exports`,item);
}

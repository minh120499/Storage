import axios from "axios";

export const employeesApi = async () => {
  return (await axios.get("http:/127.0.0.1:8080/api/account")).data;
};

export const rolesApi = async () => {
  return (await axios.get("http://localhost:8080/api/admin/roles")).data;
};

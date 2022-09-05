import axios from "axios";

export const employeesApi = async () => {
  return (await axios.get("http:/127.0.0.1:8080/api/account")).data;
};

export const rolesApi = async (page: number, pageSize: number) => {
  return (
    await axios.get(`http://localhost:8080/api/admin/roles/${page}`, {
      params: { pageSize },
    })
  ).data;
};

export const accountApi = async (page: number, pageSize: number) => {
  return (
    await axios.get(`http://localhost:8080/api/account/${page}`, {
      params: { pageSize },
    })
  ).data;
};
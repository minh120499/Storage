import axios from "axios";
const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export const employeeDetailsApi = async (id: any) => {
  return (
    await axios.get(`http://localhost:8080/api/account/${id}`, {
      headers,
    })
  ).data;
};

export const updateEmployeeApi = async (data: any) => {
  return axios.post("http://localhost:8080/api/roles/emp", data, {
    headers,
  });
};

export const employeesApi = async () => {
  return (
    await axios.get("http:/127.0.0.1:8080/api/account", {
      headers,
    })
  ).data;
};

export const rolesApi = async (page: number, pageSize: number) => {
  return (
    await axios.get(`http://localhost:8080/api/admin/roles/${page}`, {
      params: { pageSize },
      headers,
    })
  ).data;
};

export const accountApi = async (page: number, pageSize: number) => {
  return (
    await axios.get(`http://localhost:8080/api/account/${page}`, {
      params: { pageSize },
      headers,
    })
  ).data;
};

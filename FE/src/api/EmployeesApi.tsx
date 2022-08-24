import axios from "axios";

export const employeeDetailsApi = async (id: any) => {
  return (await axios.get(`http://localhost:8080/api/account/${id}`)).data;
};

export const updateEmployeeApi = async (data: any) => {
  return axios.post("http://localhost:8080/api/roles/emp", data);
};

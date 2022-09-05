import axios from "axios";

export const getCategoriesByPage = async () => { 
    return await axios.get(`http://localhost:8080/api/categories`)
}

export const getCategories = async () => { 
    return await axios.get(`http://localhost:8080/api/categories/findall`)
}

export const createCategory = async (category:object)=>{
    return axios.post(`http://localhost:8080/api/categories/category`,category)
}

export const deleteListCategory = async (listId: React.Key[])=>{
    return axios.post("http://localhost:8080/api/categories/delete", listId)
}

export const updateCategory = async (category:object, idUpdate:number)=>{
    return axios.put(`http://localhost:8080/api/categories/category/${idUpdate}`,category)
}

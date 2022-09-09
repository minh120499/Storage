import axios from "axios";

export const getCategoriesByPage = async (page:number,limit:number) => { 
    return (
        await axios.get(`http://localhost:8080/inventories/pagination`, {
          params: {
            page,
            limit,
            sortBy: "id",
            sortDir:"desc"
          },
        })
      ).data;
}

export const getCategories = async (valueInput = "") => { 
    return await axios.get(`http://localhost:8080/api/categories/findall`,{
        params:{
            valueInput,
        },
    });
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

export const deleteCategory = async (id: number)=>{
    return axios.delete(`http://localhost:8080/api/categories/delete/${id}`)
}
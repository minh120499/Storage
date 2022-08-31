import axios from "axios";

export const getAllInventory = async () => {
    return (await axios.get(`http://localhost:8080/inventories`))
}

export const getPagination = async () => {
    return (await axios.get(`http://localhost:8080/inventories/pagination`)).data
}
export const findInventoryById = async (id:number) => {
    return (await axios.get(`http://localhost:8080/inventories/${id}`)).data
}

export const createInventory = async (inventory:object) => {
    return (await axios.post(`http://localhost:8080/inventories`,inventory)).data
}

export const updateInvetory = async (inventory:object, id:number) => {
    return (await axios.put(`http://localhost:8080/inventories/${id}`, inventory)).data
}

export const deleteInvetory = async (id:number) => {
    return (await axios.delete(`http://localhost:8080/inventories/${id}`))
}
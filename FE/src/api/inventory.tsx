import axios from "axios";

export const getAllInventory = async () => {
    return await axios.get(`http://localhost:8080/inventories`)
}
export const findInventoryById = async (id:number) => {
    return await axios.get(`http://localhost:8080/inventories/${id}`)
}

export const createInventory = async (inventory:object) => {
    return await axios.post(`http://localhost:8080/inventories`,inventory)    
}

export const updateInvetory = async (inventory:object, id:number) => {
    return await axios.put(`http://localhost:8080/inventories/${id}`, inventory)
}
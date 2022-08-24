import axios from "axios";

export const getAllInventory = async () => {
    return await axios.get(`http://localhost:8080/inventories`)
}
export const findInventoryById = async (id:number) => {
    return await axios.get(`http://localhost:8080/inventories/${id}`).then((result)=>{return result.data})
}

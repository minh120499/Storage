import axios from "axios";

export const getProducts = async () => {
    return await axios.get(`http://localhost:8080/products`).then((result)=>{return result.data})
}
export const findProductById = async (id:number) => {
    return await axios.get(`http://localhost:8080/products/${id}`).then((result)=>{return result.data})
}

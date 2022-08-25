import axios from "axios";

export const getProducts = async () => {
    return await axios.get(`http://localhost:8080/products`)
}
export const findProductById = async (id:number) => {
    return await axios.get(`http://localhost:8080/products/${id}`)
}

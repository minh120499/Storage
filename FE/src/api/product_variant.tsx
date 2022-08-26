import axios from "axios";

export const getProducts = async () => {
<<<<<<< HEAD
    return await axios.get(`http://localhost:8080/products`)
}
export const findProductById = async (id:number) => {
    return await axios.get(`http://localhost:8080/products/${id}`)
}
=======
  return await axios.get(`http://localhost:8080/products/search`);
};
export const findProductById = async (id: number) => {
  return await axios.get(`http://localhost:8080/products/${id}`);
};
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7

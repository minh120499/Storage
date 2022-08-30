import { stringify } from "querystring";

const baseUrl = 'http://localhost:8080/api/'


const getRequest = (body: object, method: string, token: string | null | undefined) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw
  };
  if (method.toUpperCase() === 'GET') {
    const { body, ...request } = { ...requestOptions }
    return request;
  }

  return requestOptions

}

const addProduct = (data: any) => {
  return fetch(baseUrl + "products", getRequest(data, 'post', ''))
}

const getProducts = (data: any) => {
  return fetch(baseUrl+"products/filter", getRequest(data, 'post', ''))
}

const countProductByFilter=(data:any)=>{

  return fetch(baseUrl+"products/count",getRequest(data, 'POST', ''))
}
  const getProductById=(id:number)=>{

    return fetch(baseUrl+"products/"+id,getRequest({}, 'GET', ''))
  
  
}

export { addProduct, getProducts,countProductByFilter ,getProductById} 
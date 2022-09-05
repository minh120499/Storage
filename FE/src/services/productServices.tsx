import { stringify } from "querystring";
import React from "react";

const baseUrl = 'http://localhost:8080/api/'


const getRequest = (body: object|Array<any>, method: string, token: string | null | undefined) => {
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
const deleteProductById=(id:number)=>{

  return fetch(baseUrl+"products/"+id,getRequest({}, 'Delete', ''))


}
const deleteProductsById=(listId:Array<React.Key>)=>{
  return fetch(baseUrl+"products",getRequest(listId, 'Delete', ''))


}
const deleteVariantById=(id:number)=>{

  return fetch(baseUrl+"products/variants/"+id,getRequest({}, 'Delete', ''))


}
const deleteVariantsById=(listId:Array<React.Key>)=>{
  return fetch(baseUrl+"products/variants",getRequest(listId, 'Delete', ''))


}



export { addProduct, getProducts,countProductByFilter ,getProductById ,deleteProductById,deleteVariantsById,deleteProductsById}  
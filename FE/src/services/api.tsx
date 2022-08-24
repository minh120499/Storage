
import axios from "axios";
import React from "react";
let configValue : string | undefined  = process.env.REACT_APP_API

export const getSuppliers = async () => {
    return await axios.get(`${configValue}suppliers/findAll`)
}
export const createSupplier = async (supplier:object)=>{
    return axios.post(`${process.env.REACT_APP_API}suppliers`,supplier)
}
export const deleteSupplier = async (listId:React.Key[])=>{
    return axios.put(`${process.env.REACT_APP_API}suppliers/delete`,listId)
}
export const updateStatusSupplier = async (listId:React.Key[],status:string)=>{
    return axios.put(`${process.env.REACT_APP_API}suppliers/updateStatus/${status}`,listId)
}
export const updateSupplier = async (supplier:object)=>{
    return axios.put(`${process.env.REACT_APP_API}suppliers`,supplier)
}
export const getSupplierById = async (id:number) => {
    return await axios.get(`${configValue}suppliers/${id}`)
}



